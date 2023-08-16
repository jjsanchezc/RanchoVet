import React, { useState, useLayoutEffect } from "react";
import { SafeAreaView, View, TextInput, Pressable, Text } from "react-native";
import { Stack, useRouter } from "expo-router";
import { COLORS, icons, images, SIZES } from "../constants";
import { ScreenHeaderBtn } from "../components";
import { styles } from "../utils/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");

  const storeUsername = async () => {
    try {
      await AsyncStorage.setItem("username", username);
      router.push("/chat");
    } catch (e) {
      console.error("Error! While saving username");
    }
  };

  const handleSignIn = () => {
    if (username.trim()) {
      storeUsername();
    } else {
      console.error("Username is required.");
    }
  };

  useLayoutEffect(() => {
    const getUsername = async () => {
      try {
        const value = await AsyncStorage.getItem("username");
        if (value !== null) {
          router.push("/chat");
        }
      } catch (e) {
        console.error("Error while loading username!");
      }
    };
    getUsername();
  }, []);

  return (
    <SafeAreaView style={styles.loginscreen}>
      <View style={styles.loginscreen}>
        <Text style={styles.loginheading}>Sign in</Text>
        <View style={styles.logininputContainer}>
          <TextInput
            autoCorrect={false}
            placeholder='Enter your username'
            style={styles.logininput}
            onChangeText={(value) => setUsername(value)}
          />
        </View>

        <Pressable onPress={handleSignIn} style={styles.loginbutton}>
          <View>
            <Text style={styles.loginbuttonText}>Get Started</Text>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Login;
