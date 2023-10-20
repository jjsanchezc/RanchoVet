import React, { useEffect, useState } from "react";
import { Stack, useRouter } from "expo-router";
import { View, TextInput, Text, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../utils/styles";
import { useForm, Controller } from 'react-hook-form';
import { Button } from "react-native";
import * as constantes from "../constants";

const Replies = () => {
  const [reply, setReply] = useState([]);
  const [inputError, setInputError] = useState(false);
  const { control, handleSubmit } = useForm();
  const [inputValue, setInputValue] = useState("");
  const navigate = useRouter();

  const createReply = async (data) => {
    try {
      const userId = await AsyncStorage.getItem("username");
      if (!userId) {
        navigate("/");
        return;
      }

      if (!inputValue) {
        setInputError(true);
        Alert.alert("Error", "Por favor ingresa una respuesta.");
        return;
      }

      const newReply = { Respuesta: inputValue };
      const updatedReplies = [...reply, newReply];

      await AsyncStorage.setItem("storedReplies", JSON.stringify(updatedReplies));

      setReply(updatedReplies);
      setInputError(false);

    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <View style={styles.forumScreen}>
        <Text style={styles.loginheading}>Ingresa tu respuesta!</Text>
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