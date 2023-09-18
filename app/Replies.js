import React, { useEffect, useState } from "react";
import Comments from "../components/forums/comments";
import { Stack, useRouter } from "expo-router";
import { View, TextInput, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../utils/styles";
import { useForm, Controller } from 'react-hook-form';
import { Button } from "react-native";

const Replies = () => {
    const [reply, setReply] = useState("");

    const handleSubmitReply = (e) => {
        e.preventDefault();
        console.log({ reply });
        setReply("");
    };

    return (
        <View>
        <Text style={styles.loginheading}>Haz una pregunta!</Text>
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
        <Button title="ENVIAR RESPUESTA" onPress={handleSubmitReply} />
      </View>

    );
};

export default Replies;