from flask import Flask, request, jsonify
#import firebase_admin
#from firebase_admin import credentials, db, firestore
#from firebase import firebase
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})




#cred = credentials.Certificate("fire_credentials.json")
#ap=firebase_admin.initialize_app(cred,{'dabaseURL':'https://ranchovet-2f7ed-default-rtdb.firebaseio.com'})

# Ruta para obtener valores de Firebase sin parámetros
@app.route('/get_dataa', methods=['POST'])
def get_data():
    
    #response = requests.get('https://ranchovet-2f7ed-default-rtdb.firebaseio.com/users.json')
    #data = response.json
    print('HOSDOAHFDASODFHASDFOAHSDF')
    #print(request.json())
    #print(data)
    # Extraer usuarios de los datos
    users = []
    print(str(type(request.json)))

    # Devolver los usuarios como JSON
    return request.json

'''# Ruta para obtener valores de Firebase con un parámetro entero
@app.route('/get_data_by_id/<int:item_id>', methods=['GET'])
def get_data_by_id(item_id):
    ref = db.reference('/data')  # Reemplaza con la ruta de tu base de datos en Firebase
    item = ref.child(str(item_id)).get()
    return jsonify(item)'''

if __name__ == '__main__':
    app.run(debug=True,host="0.0.0.0")
