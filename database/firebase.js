import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set, get, push, onValue } from "firebase/database";
import { saveData } from "./localdatabase";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

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
const storage = getStorage(app);

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

async function updateChat(chatid) {
  const chatsRef = ref(database, `chats/${chatid}`);
  try {
    const snapshot = await get(chatsRef);
    if (snapshot.exists()) {
      const chatData = snapshot.val();
      //console.log("Chat Data:", chatData);
      if (chatData.mensajes.hasOwnProperty("null"))
        delete chatData.mensajes["null"];
      await saveData(chatid, chatData);
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
    return newChatKey;
  } catch (error) {
    console.error("Error creating new chat:", error);
    throw error;
  }
}

async function editProfile(user, userData) {
  try {
    console.log("user", user);
    const userRef = ref(database, `users/${user}/`);
    await set(userRef, userData);

    // Log the success message
    console.log("Profile edited in Firebase:", userData);
  } catch (error) {
    console.error("Error creating new chat:", error);
  }
}

async function createNewForum(title) {
  try {
    const forumData = {
      id: null,
      title: title
    };
    // New forum with auto-generated key
    const newForumRef = push(ref(database, "forums"));
    const newForumKey = newForumRef.key;
    // ID with auto-generated key
    forumData.id = newForumKey;
    await set(ref(database, `forums/${newForumKey}`), forumData);
    console.log("New forum added to Firebase with ID:", newForumKey);
    return newForumKey;
  } catch (error) {
    console.error("Error creating new forum:", error);
    throw error;
  }
}

async function createNewReply(threadId, reply) {
  const repliesRef = ref(database, `forums/${threadId}/replies`);
  try {
    const newReplyRef = await push(repliesRef, reply);
    const newReplyId = newReplyRef.key; // Get the auto-generated ID
    console.log("New reply added to Firebase with ID:", newReplyId);
    return newReplyId;
  } catch (error) {
    console.error("Error sending reply:", error);
    throw error; // Re-throw the error to handle it in the calling code
  }
}

async function getReplies(threadId) {
  const repliesRef = ref(database, `forums/${threadId}/replies`);
  try {
    const snapshot = await get(repliesRef);
    if (snapshot.exists()) {
      const repliesData = snapshot.val();
      return repliesData;
    } else {
      console.log("Item not found.");
      return {}; // Return an empty object if no replies are found
    }
  } catch (error) {
    console.error("Error retrieving replies:", error);
    throw error;
  }
}

async function getForums() {
  const forumsRef = ref(database, `forums`);
  try {
    const snapshot = await get(forumsRef);
    if (snapshot.exists()) {
      const forumData = snapshot.val();
      return forumData;
    } else {
      console.log("Item not found.");
    }
  } catch (error) {
    console.error("Error retrieving forums:", error);
    throw error; // Re-throw the error to handle it in the calling code
  }
}

// Like forum, if user already liked, delete like
async function likeForum(forumId, userId) {
  const likesRef = ref(database, `likes/${forumId}/${userId}`);
  try {
    const snapshot = await get(likesRef);
    if (snapshot.exists()) {
      const likeData = snapshot.val();
      await set(ref(database, `likes/${forumId}/${userId}`), null);
      console.log("Like deleted from Firebase:", likeData);
    } else {
      await set(ref(database, `likes/${forumId}/${userId}`), true);
      console.log("Like added to Firebase:", userId);
    }
  } catch (error) {
    console.error("Error liking forum:", error);
    throw error; // Re-throw the error to handle it in the calling code
  }
}

// New journal entry
async function newJournalEntry(user, folder, name, species, veterinary) {
  const journalRef = ref(database, `users/${user}/journal`);
  try {
    const newJournalRef = await push(journalRef, { folder, name, species, veterinary });
    const newJournalId = newJournalRef.key; // Get the auto-generated ID
    console.log("New journal entry added to Firebase with ID:", newJournalId);
    return newJournalId;
  } catch (error) {
    console.error("Error sending journal entry:", error);
    throw error; // Re-throw the error to handle it in the calling code
  }
}

// Edit journal entry
async function editJournalEntry(user, folder, name, species, veterinary, journalId) {
  const journalRef = ref(database, `users/${user}/journal/${journalId}`);
  try {
    await set(journalRef, { folder, name, species, veterinary });
    console.log("Journal entry edited in Firebase with ID:", journalId);
  } catch (error) {
    console.error("Error editing journal entry:", error);
    throw error; // Re-throw the error to handle it in the calling code
  }
}

// Count of likes for a forum
async function getLikeCount(forumId) {
  const likesRef = ref(database, `likes/${forumId}`);
  try {
    const snapshot = await get(likesRef);
    if (snapshot.exists()) {
      const likesData = snapshot.val();
      const count = Object.values(likesData).filter(value => value === true).length;
      return count;
    } else {
      return 0;
    }
  } catch (error) {
    console.error("Error retrieving likes:", error);
    throw error; // Re-throw the error to handle it in the calling code
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

const isFirebaseConnected = async () => {
  const connectionRef = ref(database, '.info/connected');

  return new Promise((resolve) => {
    onValue(connectionRef, (snapshot) => {
      const isConnected = snapshot.val() === true;
      resolve(isConnected);
    });
  });
};

const uploadImage = async (uri, imageName) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  const storageReference = storageRef(storage, "images/" + imageName);

  try {
    const snapshot = await uploadBytes(storageReference, blob);
    // Obtain the URL of the uploaded image
    const downloadURL = await getDownloadURL(storageReference);

    return downloadURL;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}

export { getMessages, getUser, newMessage, createNewChat, newJournalEntry, editJournalEntry, createNewForum, createNewReply, getReplies, getForums, likeForum, getLikeCount, getUsersPasswords, isFirebaseConnected, updateChat, editProfile, uploadImage };
