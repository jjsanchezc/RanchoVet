import React, { useState, useLayoutEffect, useEffect } from "react";
import { SafeAreaView, View, TextInput, Pressable, Text } from "react-native";
import { Stack, useRouter } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from "../utils/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUsersPasswords } from "../database/firebase";

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [validUsers, setValidUsers] = useState([]);
  const [validPass, setValidPass] = useState([]);

  useEffect(() => {
    const fetchUsersPasswords = async () => {
      try {
        const users = await getUsersPasswords();
        setValidUsers(Object.values(users));
        setValidPass(Object.keys(users));
      } catch (error) {
        console.error("Error al obtener contraseña de usuario", error);
      }
    };
    fetchUsersPasswords();
  }, []);

  const storeUsername = async (validUser) => {
    try {
      const userIdIndex = validUsers.indexOf(validUser); // Find the index of the valid user
      await AsyncStorage.setItem("username", validPass[userIdIndex]);
      router.push("/main");
    } catch (e) {
      console.error("Error! mientras se guardaba el usuario");
    }
  };

  const handleSignIn = () => {
    if (username.trim() && password.trim()) {
      const validUser = validUsers.find(
        (user) => user.name === username.trim() && user.pass === password
      );

      if (validUser) {
        storeUsername(validUser);
      } else {
        setError("Usuario o contraseña incorrectos."); // Set error message
      }
    } else {
      setError("Usuario y contraseña son requeridos."); // Set error message
    }
  };

  useLayoutEffect(() => {
    const getUsername = async () => {
      try {
        const value = await AsyncStorage.getItem("username");
        if (value !== null) {
          router.push("/main");
        }
      } catch (e) {
        console.error("Error mientras cargaba el usuario");
      }
    };
    getUsername();
  }, []);

  return (
    <SafeAreaView style={styles.loginscreen}>
      <View style={styles.loginscreen}>
        <Text style={styles.loginheading}>Iniciar sesión</Text>
        <View style={styles.logininputContainer}>
          <View style={styles.inputWrapper}>
            <Icon name="user" size={24} color="#ccc" style={styles.icon} />
            <TextInput
              autoCorrect={false}
              placeholder="Nombre de usuario"
              style={styles.logininput}
              onChangeText={(value) => setUsername(value)}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Icon name="lock" size={24} color="#ccc" style={styles.icon} />
            <TextInput
              autoCorrect={false}
              secureTextEntry={true} // Password input
              placeholder="Contraseña"
              style={styles.logininput}
              onChangeText={(value) => setPassword(value)}
            />
          </View>

          <Pressable onPress={handleSignIn} style={styles.loginbutton}>
            <View>
              <Text style={styles.loginbuttonText}>Iniciar</Text>
            </View>
          </Pressable>

          {/* Display error message */}
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
