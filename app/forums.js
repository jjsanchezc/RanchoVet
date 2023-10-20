import React, { useEffect, useState } from "react";
import Comments from "../components/forums/comments";
import { createNewForum } from "../database/firebase";
import { Stack, useRouter } from "expo-router";
import { View, TextInput, Text, Alert, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../utils/styles";
import * as constantes from "../constants";

const Forums = () => {
  const [threadList, setThreadList] = useState([]);
  const [inputError, setInputError] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const navigate = useRouter();

  useEffect(() => {
    const loadLocalData = async () => {
      try {
        const storedThreads = await AsyncStorage.getItem("storedThreads");
        if (storedThreads) {
          setThreadList(JSON.parse(storedThreads));
        }
      } catch (error) {
        console.error("Error reading storedThreads from AsyncStorage:", error);
      }
    };
    loadLocalData();
  }, []);

  // Create a new thread and save it to Firebase and AsyncStorage
  const createThread = async () => {
    try {
      const userId = await AsyncStorage.getItem("username");
      if (!userId) {
        navigate("/");
        return;
      }

      if (!inputValue) {
        setInputError(true);
        Alert.alert("Error", "Por favor ingresa una pregunta.");
        return;
      }

      const newThread = { title: inputValue };
      const updatedThreads = [...threadList, newThread];

      await createNewForum(newThread);
      await AsyncStorage.setItem("storedThreads", JSON.stringify(updatedThreads));

      setThreadList(updatedThreads);
      setInputError(false);
      setInputValue(""); // Clear the input field

    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <View style={styles.forumScreen}>
      <Text style={styles.loginheading}>Haz una pregunta!</Text>
      <TextInput
        autoCorrect={true}
        placeholder='Ingresa tu pregunta'
        style={styles.forumInput}
        value={inputValue}
        onChangeText={setInputValue}
      />
      <Button
        title="CREAR PREGUNTA"
        onPress={createThread}
        color={constantes.COLORS.tertiary}
        style={styles.forumButton}
      />
      <View style={styles.forumThreadContainer}>
        {threadList.map((thread, index) => (
          <View style={styles.forumThreadItem} key={index}>
            <Text style={styles.forumThreadTitle}>{thread.title}</Text>
            <Comments
              threadId={index}
              title={thread.title}
              navigateToReplies={() => navigate.push("/Replies", { threadId: index, title: thread.title })}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default Forums;
