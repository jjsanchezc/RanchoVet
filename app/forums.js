import React, { useEffect, useState } from "react";
import Comments from "../components/forums/comments";
import { createNewForum } from "../database/firebase";
import { useRouter } from "expo-router";
import { View, TextInput, Text, Alert, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getForums } from "../database/firebase";
import { styles } from "../utils/styles";
import * as constantes from "../constants";
import { ScrollView } from "react-native";

const Forums = () => {
  const [threadList, setThreadList] = useState({});
  const [inputError, setInputError] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const navigate = useRouter();

  // Load data from AsyncStorage
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

  // Load data from Firebase
  useEffect(() => {
    const loadFirebaseData = async () => {
      try {
        const threads = await getForums();

        // If there are threads from Firebase, update AsyncStorage
        if (Object.keys(threads).length > 0) {
          const updatedThreadList = { ...threadList, ...threads };
          await AsyncStorage.setItem("storedThreads", JSON.stringify(updatedThreadList));
          setThreadList(updatedThreadList);
        }
      } catch (error) {
        console.error("Error loading data from Firebase:", error);
      }
    };
    loadFirebaseData();
  }, [threadList]); // Include threadList as a dependency to trigger the effect when it changes


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

      // Create a new thread object
    const newThread = { title: inputValue };
    
    // Save it to Firebase and get the generated ID
    const newThreadId = await createNewForum(newThread);

    // Update the new thread with the generated ID
    const updatedThread = { id: newThreadId, ...newThread };

    // Save it to AsyncStorage
    const updatedThreads = { ...threadList, [newThreadId]: updatedThread };
    await AsyncStorage.setItem("storedThreads", JSON.stringify(updatedThreads));

    setThreadList(updatedThreads);
    setInputError(false);

    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <View style={styles.forumScreen}>
      <ScrollView style={styles.scrollView}>
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
          {Object.keys(threadList).map(threadId => (
            <View style={styles.forumThreadItem} key={threadId}>
              <Text style={styles.forumThreadTitle}>{threadList[threadId].title.title}</Text>
              <Comments
                navigateToReplies={() => navigate.push({ pathname: "/Replies", params: { threadId, title: threadList[threadId].title.title }})}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Forums;