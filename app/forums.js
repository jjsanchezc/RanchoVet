import React, { useEffect, useState } from "react";
import Likes from "../components/forums/likes";
import Comments from "../components/forums/comments";
import { Stack, useRouter } from "expo-router";
import { View, TextInput, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../utils/styles";
import { useForm, Controller } from 'react-hook-form';
import { Button } from "react-native";
import { useHistory } from "expo-router";

const Forums = () => {
  const [threadList, setThreadList] = useState([]);
  const { control, handleSubmit, setValue } = useForm();
  const navigate = useRouter();

  useEffect(() => {
	const checkUser = async () => {
	  try {
		const userId = await AsyncStorage.getItem("username");
		if (!userId) {
		  navigate("/");
		} else {
		  fetch("http://34.125.202.209:4000/api/thread")
			.then((res) => res.json())
			.then((data) => setThreadList(data.threads))
			.catch((err) => console.error(err));
		}
	  } catch (error) {
		console.error("Error reading _id from AsyncStorage:", error);
	  }
	};
	checkUser();
  }, [navigate]);

  const createThread = async (data) => {
  try {
    const userId = await AsyncStorage.getItem("username");
    if (!userId) {
      navigate("/");
      return;
    }

    const response = await fetch("http://34.125.202.209:4000/api/thread", {
      method: "POST",
      body: JSON.stringify({
        thread: data.Pregunta,
        id: userId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const responseData = await response.json();
      alert(responseData.message);
      setThreadList(responseData.threads);
      setValue("Pregunta", ""); // Clear the input field
    } else {
      console.error("Failed to create thread:", response.status);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

  return (
    <>
      <View>
        <Text style={styles.loginheading}>Haz una pregunta!</Text>
        <Controller
          control={control}
          name="Pregunta"
          render={({ field }) => (
            <TextInput
              autoCorrect={false}
              placeholder='Ingresa tu pregunta'
              style={styles.logininput}
              value={field.value}
              onChangeText={field.onChange}
            />
          )}
        />
        <Button title="CREAR PREGUNTA" onPress={handleSubmit(createThread)} />
      </View>

      <View className='thread__container'>
        {threadList.map((thread) => (
          <View className='thread__item' key={thread.id}>
            <p>{thread.title}</p>
            <View className='react__container'>
              <Likes
                numberOfLikes={thread.likes.length}
                threadId={thread.id}
              />
              <Comments
                numberOfComments={thread.replies.length}
                threadId={thread.id}
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