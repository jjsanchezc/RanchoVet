import { View, Text, Pressable, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { styles } from "../../utils/styles";
import { createNewChat } from "../../database/firebase";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUsersPasswords } from "../../database/firebase";

const Modal = ({ setVisible, getChats }) => {
  const closeModal = () => setVisible(false);
  const [destinatary, setDestinatary] = useState("");
  const [validUsers, setValidUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await getUsersPasswords();
        const Vusers = Object.values(users);
        const ids = Object.keys(users);
        const vetUsers = [];
        for (let index = 0; index < Vusers.length; index++) {
          if (Vusers[index].type == 'vet') {
            Vusers[index].id = ids[index];
            vetUsers.push(Vusers[index]);
          }
        }
        setValidUsers(vetUsers);
      } catch (error) {
        console.error("Error al obtener contraseña del usuario:", error);
      }
    };
    fetchData();
  }, []);

  const handleCreateRoom = async () => {
    if (destinatary) {
      const user = await AsyncStorage.getItem("username");
      await createNewChat(user, destinatary.id);
      //console.log("destinyID", destinatary.id);
      //console.log("validUsers", validUsers);
      closeModal();
      getChats();
    }
  };

  const renderItem = ({ item }) => (
    <Pressable
      onPress={() => setDestinatary(item)} // Set the selected user on press
      style={[
        styles.modalbutton,
        {
          backgroundColor: destinatary && destinatary.id === item.id ? 'green' : '#E14D2A', // Highlight the selected user
        },
      ]}
    >
      <Text style={styles.modaltext}>{item.name}</Text>
    </Pressable>
  );

  return (
    <View style={styles.modalContainer}>
      <Text style={styles.modalsubheading}>Selecciona un veterinario</Text>
      <FlatList
        data={validUsers}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.modalbuttonContainer}>
        <Pressable
          style={[styles.modalbutton, { backgroundColor: '#E14D2A' }]}
          onPress={handleCreateRoom}
          disabled={!destinatary} // Disable button if no user is selected
        >
          <Text style={styles.modaltext}>Crear</Text>
        </Pressable>
        <Pressable
          style={[styles.modalbutton, { backgroundColor: '#E14D2A' }]}
          onPress={closeModal}
        >
          <Text style={styles.modaltext}>Cancelar</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Modal;
