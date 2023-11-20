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
    data=request.json
    

    # Extraer usuarios de los datos
    users = []
    a=str(type(request.json))
    print=a
    # Devolver los usuarios como JSON
    #return request.json
    return jsonify({"a":a})

def content_based():
    # Lee los nuevos datos
    vet_data = pd.read_json('vets.json')  # Reemplaza 'nuevos_datos.csv' con el nombre de tu archivo

    # Selecciona las columnas relevantes
    keep_cols = ['vet_data']
    vet_data_filtered = vet_data[keep_cols]

    # Normaliza la columna 'vet_data' para expandirla en columnas separadas
    vet_data_normalized = json_normalize(vet_data_filtered['vet_data'])

    #DEJE PRICES AFUERA PORQUE EN LOS DATOS 
    vet_data_filtered = pd.concat([ vet_data_normalized[['rating']]], axis=1)

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
    n_neighbors = 5

    # Fit the Nearest Neighbors model
    nneighbors = NearestNeighbors(n_neighbors=n_neighbors, metric='cosine').fit(vet_data_transf)

    # Find nearest neighbors for the first row (you can change it as needed)
    dif, ind = nneighbors.kneighbors(vet_data_transf[0:1])


    #print(sorted_vet_data)
    # Display the results
    print("Liked Vet")
    print("=" * 80)
    liked_vet_json = vet_data.loc[ind[0][0], :].to_json(orient='index')
    print(liked_vet_json)

    print("Recommended Vets")
    print("=" * 80)
    recommended_vets_json = vet_data.loc[ind[0][1:], :].to_json(orient='index')
    print(recommended_vets_json)


if __name__ == '__main__':
    app.run(debug=True,host="0.0.0.0")
