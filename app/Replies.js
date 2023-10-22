import React, { useState, useEffect } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { View, TextInput, Text, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../utils/styles";
import { useForm } from 'react-hook-form';
import { Button } from "react-native";
import * as constantes from "../constants";
import { createNewReply, getReplies } from "../database/firebase";

const Replies = () => {
  const [reply, setReply] = useState([]);
  const [inputError, setInputError] = useState(false);
  const { control, handleSubmit } = useForm();
  const [inputValue, setInputValue] = useState("");
  const params = useLocalSearchParams();
  const router = useRouter();

// Load data from AsyncStorage
useEffect(() => {
  const loadAsyncStorageData = async () => {
    try {
      const storageKey = `storedReplies_${params.threadId}`;
      const storedReplies = await AsyncStorage.getItem(storageKey);
      if (storedReplies) {
        setReply(JSON.parse(storedReplies));
      }
    } catch (error) {
      console.error("Error reading replies from AsyncStorage:", error);
    }
  }
  loadAsyncStorageData();
}, [params.threadId]);

// Load data from Firebase
useEffect(() => {
  const loadFirebaseData = async () => {
    try {
      const replies = await getReplies(params.threadId);
      setReply(replies);
    } catch (error) {
      console.error("Error reading replies from Firebase:", error);
    }
  }
  loadFirebaseData();
}, [params.threadId]);

  const createReply = async (data) => {
    try {
      const userId = await AsyncStorage.getItem("username");
      if (!userId) {
        router("/");
        return;
      }
  
      if (!inputValue) {
        setInputError(true);
        Alert.alert("Error", "Por favor ingresa una respuesta.");
        return;
      }
  
      // Create a new reply and save it to Firebase
      const newReply = { Respuesta: inputValue };
      await createNewReply(params.threadId, newReply);
  
      // Use the threadId in the storage key to store into this thread's replies
      const storageKey = `storedReplies_${params.threadId}`;
      const storedReplies = await AsyncStorage.getItem(storageKey);
  
      let updatedReplies = [];
      if (storedReplies) {
        updatedReplies = JSON.parse(storedReplies);
      }
  
      updatedReplies.push(newReply);
  
      await AsyncStorage.setItem(storageKey, JSON.stringify(updatedReplies));
  
      setReply(updatedReplies);
      setInputError(false);
  
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <View style={styles.forumScreen}>
        <Text style={styles.loginheading}>{params.title}{params.threadId}</Text>
        <TextInput
          autoCorrect={true}
          placeholder='Ingresa tu respuesta'
          style={styles.forumInput}
          value={inputValue}
          onChangeText={setInputValue}
        />
        <Button
          title="CREAR RESPUESTA"
          onPress={handleSubmit(createReply)}
          color={constantes.COLORS.tertiary}
          style={styles.forumButton}
        />
        <View style={styles.forumThreadContainer}>
          {reply.map((reply, index) => (
            <View style={styles.forumThreadItem} key={index}>
              <Text style={styles.forumThreadTitle}>{reply.Respuesta}</Text>
            </View>
          ))}
        </View>
      </View>
    </>
  );
};

export default Replies;