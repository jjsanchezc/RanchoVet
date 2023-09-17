const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");
const firebaseConfig = {
    apiKey: "AIzaSyAXD32UYLrtra2OMgyxDC-Y9_M0HOctWA8",
    authDomain: "ranchovet-2f7ed.firebaseapp.com",
    databaseURL: "https://ranchovet-2f7ed-default-rtdb.firebaseio.com",
    projectId: "ranchovet-2f7ed",
    storageBucket: "ranchovet-2f7ed.appspot.com",
    messagingSenderId: "551627558637",
    appId: "1:551627558637:web:658fe88588a9347acb06e4",
    measurementId: "G-92ZGD8RQX7"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const { getDatabase, ref, get } = require("firebase/database");

const database = getDatabase(app);
const chatsRef = ref(database, "chats");

const userchats = [];

get(chatsRef)
  .then((snapshot) => {
    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
        const chatKey = childSnapshot.key;
        const chatData = childSnapshot.val();

        // Check if "usuarios" array contains the value 1
        if (chatData.usuarios.includes(1)) {
          userchats.push({ chatKey, chatData });
        }
      });

      // Print the chatsWithUsuario1 variable
      console.log("Chats with usuario 1:", userchats);
    } else {
      console.log("No chats found with usuario 1");
    }
  })
  .catch((error) => {
    console.error("Error retrieving chats:", error);
  });