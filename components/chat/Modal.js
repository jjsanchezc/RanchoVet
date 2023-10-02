import { View, Text, TextInput, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import { styles } from "../../utils/styles";
import { createNewChat } from "../../database/firebase";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUsersPasswords } from "../../database/firebase";

const Modal = ({ setVisible, getChats }) => {
  const closeModal = () => setVisible(false);
  const [destinatary, setDestinatary] = useState("");
  const [validUsers, setValidUsers] = useState([]);
  const [validIDs, setValidIDs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await getUsersPasswords();
        setValidUsers(Object.values(users));
        setValidIDs(Object.keys(users));
      } catch (error) {
        console.error("Error al obtener contraseña del usuario:", error);
      }
    };
    fetchData();
  }, []);

  const handleCreateRoom = async () => {
    if (destinatary.trim()) {
      const validUser = validUsers.find(
        (user) => user.name === destinatary.trim()
      );

      if (validUser) {
        const user = await AsyncStorage.getItem("username");
        const userIdIndex = validUsers.indexOf(validUser); // Find the index of the valid user
        const destinyID = validIDs[userIdIndex];
        await createNewChat(user, destinyID);
        closeModal();
        getChats();
      } else {
        setError("Usuario o contraseña erróneo."); // Set error message
      }
    }
  };

  return (
    <View style={styles.modalContainer}>
      <Text style={styles.modalsubheading}>Nombre del destinatario</Text>
      <TextInput
        style={styles.modalinput}
        placeholder='Nombre'
        onChangeText={(value) => setDestinatary(value)}
      />
      <View style={styles.modalbuttonContainer}>
        <Pressable style={[styles.modalbutton, { backgroundColor: "#E14D2A" }]} onPress={handleCreateRoom}>
          <Text style={styles.modaltext}>Crear</Text>
        </Pressable>
        <Pressable
          style={[styles.modalbutton, { backgroundColor: "#E14D2A" }]}
          onPress={closeModal}
        >
          <Text style={styles.modaltext}>Cancelar</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Modal;
