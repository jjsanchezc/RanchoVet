// Importa PouchDB
const PouchDB = require('pouchdb');

// Crea una instancia local de PouchDB
const userdata = new PouchDB('userdata');
const chats = new PouchDB('chats');
// URL de la base de datos CouchDB remota, Incluye nombre de usuario y contraseña en la URL
const remoteDBURLallusers = 'http://admin:Rafa2001@104.197.121.182:5984/allusers';
const remoteDBURLchats = 'http://admin:Rafa2001@104.197.121.182:5984/chats';
// Conexion via internet
const allusersdata = new PouchDB(remoteDBURLallusers)
var chatids = [];

function replicate(db, url, filter) {
    // Realiza la replicación desde CouchDB a PouchDB
    const replication = db.replicate.from(url, filter);

    // Escucha el evento 'change' para imprimir los documentos replicados
    replication.on('change', (info) => {
        info.docs.forEach((doc) => {
            if (doc.chats) {
                chatids = document.chats;
                replicate(chats, remoteDBURLchats, filterchats);
            }
            console.log('Documento replicado:');
            console.log(doc);
        });
    });
    replication.on('complete', () => {
        console.log('Replicación completada');
    });
    replication.on('error', (err) => {
        console.error('Error en la replicación:', err);
    });
}


const user = "047edda341b397ad24919b6c95022a68"


// Opciones de replicación con autenticación
const filterUsers = {
    live: true,
    filter: (doc) => {
        if (doc._id === user) {
            return true;
        }
        return false;
    }
};

// Opciones de replicación con autenticación
const filterchats = {
    live: true,
    filter: (doc) => {
        if (chatids.includes(doc._id))
            return true;
        return false;
    }
};


replicate(userdata, remoteDBURLallusers, filterUsers)

userdata.get(user).then((document) => {
    console.log('Retrieved document:', document);
    chatids = document.chats;
    replicate(chats, remoteDBURLchats, filterchats);
    // chatids.forEach(c => {
    //     chats.get(c).then((document) => {
    //         console.log('Retrieved document:', document);
    //     }).catch((error) => {
    //         //console.error('Error retrieving document:', error);
    //     });
    // });

    chats.allDocs({ include_docs: true })
        .then((result) => {
            const documents = result.rows.map((row) => row.doc);
            console.log('All documents:', documents);
        }).catch((error) => {
            //console.error('Error retrieving document:', error);
        });
}).catch((error) => {
    //console.error('Error retrieving document:', error);
});




