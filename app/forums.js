import React, { useEffect, useLayoutEffect, useState } from "react";
import Comments from "../components/forums/comments";
import Likes from "../components/forums/likes";
import { createNewForum, getLikeCount } from "../database/firebase";
import { useRouter } from "expo-router";
import { View, TextInput, Text, Alert, Button } from "react-native";
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getForums } from "../database/firebase";
import { styles } from "../utils/styles";
import * as constantes from "../constants";
import { ScrollView } from "react-native";

const translations = {
  'en-US': {
    askYourQuestion: "Ask your question here",
    createQuestion: "CREATE QUESTION",
    error: "Error",
    pleaseEnterQuestion: "Please enter a question.",
  },
  'es-ES': {
    askYourQuestion: "Realiza tu pregunta aquí",
    createQuestion: "CREAR PREGUNTA",
    error: "Error",
    pleaseEnterQuestion: "Por favor ingresa una pregunta.",
  },
  // otros idiomas
};

const Forums = () => {
  const [threadList, setThreadList] = useState({});
  const [inputError, setInputError] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const navigate = useRouter();
  const locale = Localization.locale;
  const language = locale.split("-")[0];
  const t =
    translations[locale] || translations[language] || translations["es-ES"];

  // Load data from AsyncStorage
  useLayoutEffect(() => {
    loadLocalData();
    loadFirebaseData();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      loadFirebaseData();
    }, 200);
    return () => clearInterval(intervalId);
  }, [loadFirebaseData]);

  async function loadLocalData() {
    try {
      const storedThreads = await AsyncStorage.getItem("storedThreads");
      if (storedThreads) {
        setThreadList(JSON.parse(storedThreads));
      }
    } catch (error) {
      console.error("Error reading storedThreads from AsyncStorage:", error);
    }
  };

  async function loadFirebaseData() {
    try {
      const threads = reverseOrderOfKeys(await getForums());

      // If there are threads from Firebase, update AsyncStorage
      if (Object.keys(threads).length > 0) {
        const updatedThreadList = { ...threads, ...threadList };
        await AsyncStorage.setItem("storedThreads", JSON.stringify(updatedThreadList));
        setThreadList(updatedThreadList);
      }
    } catch (error) {
      console.error("Error loading data from Firebase:", error);
    }
  };

  function reverseOrderOfKeys(jsonObject) {
    const reversedKeys = Object.keys(jsonObject).reverse();
    const reversedObject = {};

    reversedKeys.forEach(key => {
      reversedObject[key] = jsonObject[key];
    });

    return reversedObject;
  }


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
        Alert.alert(t.error, t.pleaseEnterQuestion);
        return;
      }

      // Create a new thread object
      const newThread = { title: inputValue };

      // Save it to Firebase and get the generated ID
      const newThreadId = await createNewForum(newThread);

      // Update the new thread with the generated ID
      const updatedThread = { id: newThreadId, ...newThread };

      // Save it to AsyncStorage
      const updatedThreads = { [newThreadId]: updatedThread, ...threadList };
      await AsyncStorage.setItem("storedThreads", JSON.stringify(updatedThreads));

      setThreadList(updatedThreads);
      setInputError(false);
      setInputValue("");

    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <View style={styles.forumScreen}>
      <ScrollView style={styles.scrollView}>
        <TextInput
          autoCorrect={true}
          placeholder={t.askYourQuestion}
          style={styles.forumInput}
          value={inputValue}
          onChangeText={setInputValue}
        />
        <Button
          title={t.createQuestion}
          onPress={createThread}
          color={constantes.COLORS.tertiary}
          style={styles.forumButton}
        />
        <View style={styles.forumThreadContainer}>
          {Object.keys(threadList).map(threadId => (
            <View style={styles.forumThreadItem} key={threadId}>
              <Text style={styles.forumThreadTitle}>{threadList[threadId].title.title}</Text>
              <Comments
                navigateToReplies={() => navigate.push({ pathname: "/Replies", params: { threadId, title: threadList[threadId].title.title } })}
              />
              <Likes threadId={threadId} />

            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Forums;