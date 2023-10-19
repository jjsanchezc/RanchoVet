import AsyncStorage from '@react-native-async-storage/async-storage';
import { getMessages, getUser, newMessage, isFirebaseConnected } from "./firebase";

// Save data to AsyncStorage
const saveData = async (key, data) => {
    try {
        const jsonValue = JSON.stringify(data);
        await AsyncStorage.setItem(key, jsonValue);
        //console.log(`Data saved with key: ${key}`);
    } catch (error) {
        console.error('Error saving data: ', error);
    }
};

// Retrieve data from AsyncStorage
const getData = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
        console.error('Error retrieving data: ', error);
    }
};

// Remove data from AsyncStorage
const removeData = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
        //console.log(`Data removed with key: ${key}`);
    } catch (error) {
        console.error('Error removing data: ', error);
    }
};

const fetchDataAndStoreLocally = async (user) => {
    //console.log('User:', user);
    // Testing, print everything in Async Storage
    //getAllAsyncStorageContents();
    try {
        if (await isFirebaseConnected()) {
            // Fetch data from Firebase using getUser
            const userData = await getUser(user);
            await saveData(user, userData);
            for (const chatid of Object.values(userData.chats)) {
                const chatData = await getMessages(chatid);
                var otherUser;
                if (chatData.usuarios[0] == user)
                    otherUser = chatData.usuarios[1];
                else otherUser = chatData.usuarios[0];
                const otherUserData = await getUser(otherUser);
                chatData["name"] = otherUserData.name;
                //console.log('Chat data:', chatid, chatData);
                if (chatData.mensajes.hasOwnProperty("null"))
                    delete chatData.mensajes["null"];
                await saveData(chatid, chatData);
            }
        }

        //console.log('Data fetched from Firebase:', userData);
    } catch (error) {
        console.error('No conection:');
    }
}

// Function to get all AsyncStorage keys and their values
async function getAllAsyncStorageContents() {
    try {
        const keys = await AsyncStorage.getAllKeys();
        const contents = await AsyncStorage.multiGet(keys);

        // contents is an array of [key, value] pairs
        console.log('AsyncStorage Contents:', contents);
    } catch (error) {
        console.error('Error fetching AsyncStorage contents:', error);
        throw error;
    }
}

const sendMessage = async (chatid, contenido, user) => {
    const message = {
        contenido,
        estado: "enviado",
        hora: new Date().toLocaleTimeString(),
        user
    };
    const newID = await newMessage(chatid, message);
    const chatData = await getData(chatid);
    chatData.mensajes[newID] = message;
    await saveData(chatid, chatData);
}


export { saveData, getData, removeData, fetchDataAndStoreLocally, sendMessage };
