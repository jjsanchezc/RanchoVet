import React, { useEffect, useState } from "react";
import Likes from "../components/forums/likes";
import Comments from "../components/forums/comments";
import { Stack, useRouter } from "expo-router";
import { View, TextInput, Text, Alert } from "react-native"; // Import Alert
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../utils/styles";
import { useForm, Controller } from 'react-hook-form';
import { Button } from "react-native";

const Forums = () => {
  const [threadList, setThreadList] = useState([]);
  const [inputError, setInputError] = useState(false); // State for input error
  const { control, handleSubmit} = useForm();
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

  const createThread = async (data) => {
    try {
      const userId = await AsyncStorage.getItem("username");
      if (!userId) {
        navigate("/");
        return;
      }

      if (!data.Pregunta) {
        // Empty input validation
        setInputError(true); // Set input error state to true
        Alert.alert("Error", "Please enter a question."); // Show alert
        return;
      }

      const newThread = { title: data.Pregunta, likes: [], replies: [] };
      const updatedThreads = [...threadList, newThread];

      await AsyncStorage.setItem("storedThreads", JSON.stringify(updatedThreads));

      setThreadList(updatedThreads);
      setInputError(false); // Reset input error state

    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <View>
        <Text style={styles.loginheading}>Haz una pregunta!</Text>
        <View>
          <Controller
            control={control}
            name="Pregunta"
            render={({ field }) => (
              <TextInput
                autoCorrect={false}
                placeholder='Ingresa tu pregunta'
                style={[
                  styles.logininput,
                  { borderColor: inputError ? 'red' : 'black' } // Change border color based on input error state
                ]}
                value={field.value}
                onChangeText={field.onChange}
              />
          )}
          />
          <Button title="CREAR PREGUNTA" onPress={handleSubmit(createThread)} />
        </View>
      </View>

      <View className='thread__container'>
        {threadList.map((thread, index) => (
          <View className='thread__item' key={index}>
            <Text>{thread.title}</Text>
            <View className='react__container'>
              <Likes
                numberOfLikes={thread.likes.length}
                threadId={index}
              />
              <Comments
                numberOfComments={thread.replies.length}
                threadId={index}
                title={thread.title}
              />
            </View>
          </View>
        ))}
      </View>
    </>
  );
};

export default Forums;