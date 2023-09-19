import { View, Text, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { styles } from "../../utils/styles";
import { createNewChat } from "../../database/firebase";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Modal = ({ setVisible }) => {
  const closeModal = () => setVisible(false);
  const [destinatary, setDestinatary] = useState("");

  const handleCreateRoom = async () => {
    const user = await AsyncStorage.getItem("username");
    createNewChat(user, destinatary);
    closeModal();
  };

  return (
    <View style={styles.modalContainer}>
      <Text style={styles.modalsubheading}>Enter your Group name</Text>
      <TextInput
        style={styles.modalinput}
        placeholder='Group name'
        onChangeText={(value) => setDestinatary(value)}
      />
      <View style={styles.modalbuttonContainer}>
        <Pressable style={styles.modalbutton} onPress={handleCreateRoom}>
          <Text style={styles.modaltext}>CREATE</Text>
        </Pressable>
        <Pressable
          style={[styles.modalbutton, { backgroundColor: "#E14D2A" }]}
          onPress={closeModal}
        >
          <Text style={styles.modaltext}>CANCEL</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Modal;
