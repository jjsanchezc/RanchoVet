import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, get } from "firebase/database";

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

const database = getDatabase(app);

async function getUser(user) {
  const usersRef = ref(database, `users/${user}`);
  try {
    const snapshot = await get(usersRef);
    if (snapshot.exists()) {
      const userData = snapshot.val();
      //console.log("User Data:", userData);
      return userData;
    } else {
      console.log("Item not found.");
    }
  } catch (error) {
    console.error("Error retrieving users:", error);
    throw error; // Re-throw the error to handle it in the calling code
  }
}

async function getMessages(chatid) {
  const chatsRef = ref(database, `chats/${chatid}`);
  try {
    const snapshot = await get(chatsRef);
    if (snapshot.exists()) {
      const chatData = snapshot.val();
      //console.log("Chat Data:", chatData);
      return chatData;
    } else {
      console.log("Item not found.");
    }
  } catch (error) {
    console.error("Error retrieving chats:", error);
    throw error; // Re-throw the error to handle it in the calling code
  }
}

export { getMessages, getUser };