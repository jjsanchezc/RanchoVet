from flask import Flask, request, jsonify
import firebase_admin
from firebase_admin import credentials, db

app = Flask(__name__)

'''# Inicializar la app de Firebase
cred = credentials.Certificate('path/to/serviceAccountKey.json')  # Reemplaza con la ruta de tu archivo JSON de credenciales
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://tu_app.firebaseio.com'  # Reemplaza con la URL de tu base de datos Firebase
})'''

# Ruta para obtener valores de Firebase sin parámetros
@app.route('/get_dataa', methods=['GET'])
def get_data():
    #ref = db.reference('/data')  # Reemplaza con la ruta de tu base de datos en Firebase
    #data = ref.get()
    
    return jsonify({"hola":"holaaaa"})

# Ruta para obtener valores de Firebase con un parámetro entero
@app.route('/get_data_by_id/<int:item_id>', methods=['GET'])
def get_data_by_id(item_id):
    ref = db.reference('/data')  # Reemplaza con la ruta de tu base de datos en Firebase
    item = ref.child(str(item_id)).get()
    return jsonify(item)

if __name__ == '__main__':
    app.run(debug=True)
