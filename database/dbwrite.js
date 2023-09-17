import PouchDB from './pouchdb'

// Create PouchDB instances for userdata and chats
const userdata = new PouchDB('userdata', { adapter: 'react-native-sqlite' })
const chats = new PouchDB('chats', { adapter: 'react-native-sqlite' })

// URL of the remote CouchDB databases
const remoteDBURLallusers = 'http://admin:Rafa2001@104.197.121.182:5984/allusers';
const remoteDBURLchats = 'http://admin:Rafa2001@104.197.121.182:5984/chats';

// Function to perform replication
async function replicateDatabase(user) {
    try {
        // Get the document from userdata
        const userDoc = await userdata.get(user);

        // Get the chat IDs from the user document
        const chatids = userDoc.chats || [];

        // Replicate userdata
        await replicate(userdata, remoteDBURLallusers, {
            live: true,
            filter: (doc) => doc._id === user,
        });

        // Replicate chats based on chat IDs
        await replicate(chats, remoteDBURLchats, {
            live: true,
            filter: (doc) => chatids.includes(doc._id),
        });

        console.log('Replication completed');
    } catch (error) {
        console.error('Error during replication:', error);
    }
}

module.exports = replicateDatabase;
