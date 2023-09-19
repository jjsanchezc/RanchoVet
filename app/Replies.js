import React, { useEffect, useState } from "react";
import { Stack, useRouter } from "expo-router";
import { View, TextInput, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../utils/styles";
import { useForm, Controller } from 'react-hook-form';
import { Button } from "react-native";

const Replies = () => {
    const [reply, setReply] = useState([]);
    const { control, handleSubmit, setValue } = useForm();

    const createReply = async (data) => {
      try {
        const userId = await AsyncStorage.getItem("username");
        if (!userId) {
          navigate("/");
          return;
        }
  
        const newReply = { Respuesta: data.Respuesta };
        const updatedReplies = [...reply, newReply];
  
        await AsyncStorage.setItem("storedReplies", JSON.stringify(updatedReplies));
  
        setReply(updatedReplies);
  
      } catch (error) {
        console.error("Error:", error);
      }
    };
  

    return (
      <>
        <View>
        <Text style={styles.loginheading}>Responde a la pregunta!</Text>
        <Controller
          control={control}
          name="Respuesta"
          render={({ field }) => (
            <TextInput
              autoCorrect={false}
              placeholder='Ingresa tu respuesta'
              style={styles.logininput}
              value={field.value}
              onChangeText={field.onChange}
            />
          )}
        />
        <Button title="ENVIAR RESPUESTA" onPress={handleSubmit(createReply)} />
      </View>

      <View className='reply__container'>
        {reply.map((reply, index) => (
          <View className='reply__item' key={index}>
            <Text>{reply.Respuesta}</Text>
          </View>
        ))}
        </View>
        </>

    );
};

export default Replies;