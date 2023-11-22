  import React, { useState, useLayoutEffect, useEffect } from "react";
  import {
    SafeAreaView,
    View,
    TextInput,
    Pressable,
    Text,
    Image,
    TouchableOpacity,
  } from "react-native";
  import { Stack, useRouter } from "expo-router";
  import * as Localization from "expo-localization";
  import Icon from "react-native-vector-icons/FontAwesome";
  import { styles } from "../utils/styles";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import { getUsersPasswords,authUser,createUser } from "../database/firebase";
  import { fetchDataAndStoreLocally } from "../database/localdatabase";

  const translations = {
    "en-US": {
      login: "Login",
      usernamePlaceholder: "Username",
      mailPlaceholder: "Email",
      passwordPlaceholder: "Password",
      errorFetchingUserPassword: "Error fetching user's password",
      errorSavingUser: "Error while saving user",
      errorLoadingUser: "Error while loading user",
      incorrectUsernameOrPassword: "Incorrect username or password",
      usernameAndPasswordRequired: "Username, Email and password are required",
      getStarted: "Get Started",
      signup: "Sign Up",
    },
    "es-ES": {
      login: "Iniciar sesión",
      usernamePlaceholder: "Nombre de usuario",
      mailPlaceholder: "Correo",
      passwordPlaceholder: "Contraseña",
      errorFetchingUserPassword: "Error al obtener contraseña de usuario",
      errorSavingUser: "Error al guardar el usuario",
      errorLoadingUser: "Error al cargar el usuario",
      incorrectUsernameOrPassword: "Usuario o contraseña incorrectos",
      usernameAndPasswordRequired: "Usuario, Email y contraseña son requeridos",
      getStarted: "Iniciar",
      signup: "Crear Cuenta",
    },
    // otros idiomas
  };
  const Login = () => {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [validUsers, setValidUsers] = useState([]);
    const [validPass, setValidPass] = useState([]);
    const locale = Localization.locale;
    const language = locale.split("-")[0];
    const t =
      translations[locale] || translations[language] || translations["es-ES"];

    useEffect(() => {
      const fetchUsersPasswords = async () => {
        try {
          const users = await getUsersPasswords();
          setValidUsers(Object.values(users));
          setValidPass(Object.keys(users));
        } catch (error) {
          console.error(t.errorFetchingUserPassword, error);
        }
      };
      fetchUsersPasswords();
    }, []);

    const storeUsername = async (validUser) => {
      try {
        const userIdIndex = validUsers.indexOf(validUser); // Find the index of the valid user
        await AsyncStorage.setItem("username", validPass[userIdIndex]);
        await AsyncStorage.setItem("user_type", validUser.type);
        fetchDataAndStoreLocally(validPass[userIdIndex]);
        router.push("/main");
      } catch (e) {
        console.error(t.errorSavingUser);
      }
    };

    const signup = () => {
      router.push("/signup");
    };

    const handleSignIn = async () => {
      if (username.trim() && password.trim() && email.trim()) {
        try {
          await authUser(email, password);
          const validUser = validUsers.find(
            (user) => user.name === username.trim() && user.pass === password
          );

          if (validUser) {
            storeUsername(validUser);
          } else {
            setError(t.incorrectUsernameOrPassword);
          }
        } catch (error) {
          // Si authUser arroja un error, manejas la situación según tus necesidades
          console.error("Error en authUser:", error);
        }
      } else {
        setError(t.usernameAndPasswordRequired);
      }
    };

    useLayoutEffect(() => {
      const getUsername = async () => {
        try {
          const user = await AsyncStorage.getItem("username");
          if (user !== null) {
            fetchDataAndStoreLocally(user);
            router.push("/main");
          }
        } catch (e) {
          console.error(t.errorLoadingUser);
        }
      };
      getUsername();
    }, []);

    return (
      <SafeAreaView style={styles.loginscreen}>
        <View style={styles.loginBox}>
          <Image source={require("../logo.png")} style={styles.logo} />
          <Text style={styles.loginheading}>{t.login}</Text>
          <View style={styles.logininputContainer}>
            <View style={styles.inputWrapper}>
              <Icon name="user" size={24} color="#ccc" style={styles.icon} />
              <TextInput
                autoCorrect={false}
                placeholder={t.usernamePlaceholder}
                style={styles.logininput}
                onChangeText={(value) => setUsername(value)}
              />
            </View>
            <TextInput
                autoCorrect={false}
                placeholder={t.mailPlaceholder}
                style={styles.logininput}
                onChangeText={(value) => setEmail(value)}
              />
            <View style={styles.inputWrapper}>
              <Icon name="lock" size={24} color="#ccc" style={styles.icon} />
              <TextInput
                autoCorrect={false}
                secureTextEntry={true} // Password input
                placeholder={t.passwordPlaceholder}
                style={styles.logininput}
                onChangeText={(value) => setPassword(value)}
              />
            </View>
            <Pressable onPress={() => {handleSignIn();}} style={styles.loginbutton}>
              <View>
                <Text style={styles.loginbuttonText}>{t.getStarted}</Text>
              </View>
            </Pressable>
            <TouchableOpacity style={styles.mainMenuButton} onPress={signup}>
              <Text style={styles.mainMenuButtonText}>{t.signup}</Text>
            </TouchableOpacity>

            {/* Display error message */}
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </View>
        </View>
      </SafeAreaView>
    );
  };

  export default Login;
