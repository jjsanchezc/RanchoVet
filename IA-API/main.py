from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})


# Ruta para obtener valores de Firebase sin parámetros
@app.route('/get_dataa', methods=['POST'])
def get_data():
    data=request.json

    
    
    with open("vets.json", 'w') as archivo:
        # Convierte los datos a formato JSON y escribe en el archivo
        json.dump(data, archivo)
        
        
        
    # Extraer usuarios de los datos
    users = []
    print(str(type(request.json)))

    # Devolver los usuarios como JSON
    return request.json

if __name__ == '__main__':
    app.run(debug=True,host="0.0.0.0")
