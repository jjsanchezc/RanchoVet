import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set, get, push, onValue } from "firebase/database";

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

async function newMessage(chatid, message) {
  const messagesRef = ref(database, `chats/${chatid}/mensajes`);
  try {
    const newMessageRef = await push(messagesRef, message);
    const newMessageId = newMessageRef.key; // Get the auto-generated ID
    console.log("New message added to Firebase with ID:", newMessageId);
    return newMessageId;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error; // Re-throw the error to handle it in the calling code
  }
}

// Function to create a new chat
async function createNewChat(user, destinatary) {
  try {
    const chatData = {
      id: null, // Leave this null to auto-generate the ID
      mensajes: { "null": "null" },
      usuarios: [user, destinatary],
    };
    // Push a new chat with an auto-generated key
    const newChatRef = push(ref(database, "chats"));
    const newChatKey = newChatRef.key;

    // Update the chat ID with the auto-generated key
    chatData.id = newChatKey;

    // Set the chat data under the generated key
    await set(ref(database, `chats/${newChatKey}`), chatData);
    const userRef = ref(database, `users/${user}/chats`);
    await push(userRef, newChatKey);
    const destinataryRef = ref(database, `users/${destinatary}/chats`);
    await push(destinataryRef, newChatKey);

    // Log the success message
    console.log("New chat added to Firebase with ID:", newChatKey);
  } catch (error) {
    console.error("Error creating new chat:", error);
    throw error;
  }
}

async function getUsersPasswords() {
  const usersRef = ref(database, `users`);
  try {
    const snapshot = await get(usersRef);
    if (snapshot.exists()) {
      const usersData = snapshot.val();
      //console.log("User Data:", userData);
      return usersData;
    } else {
      console.log("Item not found.");
    }
  } catch (error) {
    console.error("Error retrieving users:", error);
    throw error; // Re-throw the error to handle it in the calling code
  }
}

export { getMessages, getUser, newMessage, createNewChat, getUsersPasswords };