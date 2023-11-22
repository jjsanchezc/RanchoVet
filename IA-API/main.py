from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from pandas import json_normalize
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline
from sklearn.neighbors import NearestNeighbors
import requests
import json

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})


# Ruta para obtener valores de Firebase sin parámetros
@app.route('/get_dataa', methods=['POST'])
def get_data():
    #data=request.json
    data = request.get_json()

    # Acceder a las variables filterBy y validUsers
    filter_by = data.get('filterBy')
    valid_users = data.get('validUsers')

    with open("vets.json", "w") as outfile: 
        json.dump(valid_users, outfile)
    #return jsonify(valid_users)
    
    vet_data=pd.read_json('vets.json')

    # Selecciona las columnas relevantes
    keep_cols = ['vet_data']
    vet_data_filtered = vet_data[keep_cols]

    # Normaliza la columna 'vet_data' para expandirla en columnas separadas
    vet_data_normalized = json_normalize(vet_data_filtered['vet_data'])

    #DEJE PRICES AFUERA PORQUE EN LOS DATOS 
    vet_data_filtered = pd.concat([ vet_data_normalized[['rating','prices']]], axis=1)

    #print(data)

    # Create pipeline for numerical variables
    numeric_pipe = Pipeline([
        ('imputer', SimpleImputer(strategy='mean')),  # Replace 'mean' with your preferred imputation strategy
        ('scaler', StandardScaler())
    ])

    # Create pipeline for categorical variable
    categorical_pipe = Pipeline([
        ('imputer', SimpleImputer(strategy='most_frequent')),  # Replace 'most_frequent' with your preferred imputation strategy
        ('encoder', OneHotEncoder(drop='first'))
    ])

    # Create ColumnTransformer
    col_transf = ColumnTransformer([
        ('numeric', numeric_pipe, vet_data_filtered.select_dtypes('number').columns.tolist()),
        ('categoric', categorical_pipe, vet_data_filtered.select_dtypes('object').columns.tolist())
    ])

    # Fit and transform the data
    vet_data_transf = col_transf.fit_transform(vet_data_filtered)
    # Set the number of neighbors
    n_neighbors = vet_data_transf.shape[0]

    # Fit the Nearest Neighbors model
    nneighbors = NearestNeighbors(n_neighbors=n_neighbors, metric='cosine').fit(vet_data_transf)

    # Find nearest neighbors for the first row (you can change it as needed)
    dif, ind = nneighbors.kneighbors(vet_data_transf[0:1])


    filtered_data = vet_data_filtered.copy()
    
    a=filter_by
    if 'rating'==a or 'Calificación'==a: 
        #filtered_data = filtered_data[filtered_data['rating'] == float('5')]
        target_value = 5.0  # El valor objetivo, puedes ajustarlo según sea necesario
        # Calcula la diferencia absoluta entre el rating y el valor objetivo
        filtered_data['rating_difference'] = abs(filtered_data['rating'] - target_value)
        # Ordena el DataFrame por la diferencia y selecciona los más cercanos
        filtered_data = filtered_data.sort_values(by='rating_difference')  # Puedes ajustar el número de resultados
        filtered_data = filtered_data.drop(columns='rating_difference')
    elif 'prices'==a or 'Precio'==a:
        filtered_data = filtered_data.sort_values(by='prices')
    elif 'specialization'==a or 'Especialización'==a:
        # Aplicar lógica de filtrado por especialidad según sea necesario
        pass
    else:
        pass


    # Aplicar transformaciones y encontrar vecinos más cercanos en el conjunto filtrado
    vet_data_filtered_subset = col_transf.transform(filtered_data)
    print(vet_data_filtered)
    #return jsonify({"a":vet_data_filtered})

    dif, ind = nneighbors.kneighbors(vet_data_filtered_subset)

    #print(ind)
    # Preparar resultados
    recommended_vets_json = vet_data.loc[ind[0][1:], :].to_json(orient='records')

    # Devolver resultados en formato JSON
    #print(recommended_vets_json)
    return recommended_vets_json

    #return jsonify({"filterBy":filter_by,"validUsers":validUsers})


if __name__ == '__main__':
    app.run(debug=True,host="0.0.0.0")
