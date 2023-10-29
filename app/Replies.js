import React, { useState, useEffect } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { View, TextInput, Text, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../utils/styles";
import * as Localization from "expo-localization";
import { useForm } from "react-hook-form";
import { Button } from "react-native";
import * as constantes from "../constants";
import { createNewReply, getReplies } from "../database/firebase";
import { ScrollView } from "react-native";

const translations = {
  "en-US": {
    placeholder: "Leave your reply",
    createReply: "CREATE REPLY",
    errorTitle: "Error",
    errorMessage: "Please enter a reply.",
  },
  "es-ES": {
    placeholder: "Deja tu respuesta",
    createReply: "CREAR RESPUESTA",
    errorTitle: "Error",
    errorMessage: "Por favor ingresa una respuesta.",
  },
  // otros idiomas
};

const Replies = () => {
  const [reply, setReply] = useState([]);
  const [inputError, setInputError] = useState(false);
  const { control, handleSubmit } = useForm();
  const [inputValue, setInputValue] = useState("");
  const params = useLocalSearchParams();
  const router = useRouter();
  const locale = Localization.locale;
  const language = locale.split("-")[0];
  const t =
    translations[locale] || translations[language] || translations["es-ES"];

  // Load data from AsyncStorage
  useEffect(() => {
    const loadAsyncStorageData = async () => {
      try {
        const storageKey = `storedReplies_${params.threadId}`;
        //console.log("storageKey:", storageKey);
        const storedReplies = await AsyncStorage.getItem(storageKey);
        //console.log("storedReplies:", storedReplies);
        if (storedReplies) {
          setReply(JSON.parse(storedReplies));
        }
      } catch (error) {
        console.error("Error reading replies from AsyncStorage:", error);
      }
    };
    loadAsyncStorageData();
  }, [params.threadId]);

  // Load data from Firebase
  useEffect(() => {
    const loadFirebaseData = async () => {
      try {
        console.log("params.threadId:", params.threadId);
        const replies = await getReplies(params.threadId);
        console.log("replies:", Object.values(replies));
        setReply(Object.values(replies));
      } catch (error) {
        console.error("Error reading replies from Firebase:", error);
      }
    };
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
        Alert.alert(t.errorTitle, t.errorMessage);
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
      setInputValue("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <View style={styles.forumScreen}>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.loginheading}>{params.title}</Text>
          <TextInput
            autoCorrect={true}
            placeholder={t.placeholder}
            style={styles.forumInput}
            value={inputValue}
            onChangeText={setInputValue}
          />
          <Button
            title={t.createReply}
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
        </ScrollView>
      </View>
    </>
  );
};

export default Replies;
