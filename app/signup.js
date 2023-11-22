import React, { useState, useEffect } from "react";
import { View, TextInput, Switch, Text, SafeAreaView, Alert, Image, Pressable } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { uploadImage, createUser } from "../database/firebase";
import { styles } from "../utils/styles";
import { Stack, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchDataAndStoreLocally } from "../database/localdatabase";
import { COLORS } from "../constants";
const SignupScreen = () => {
  const [username, setUsername] = useState('');
  const [EMAIL, setEMAIL] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');
  const [isVet, setIsVet] = useState(false);
  const [number, setNumber] = useState('');
  const [prices, setPrices] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [vetData, setVetData] = useState({
    phone: '',
    prices: '',
    rating: 0,
    specialty: '',
  });
  const [validUsers, setValidUsers] = useState([]);
  const [validPass, setValidPass] = useState([]);
  const router = useRouter();
  const [signUpInProgress, setSignUpInProgress] = useState(false);
  

  const storeUsername = async (validUser) => {
    try {
      const userIdIndex = validUsers.indexOf(validUser); // Find the index of the valid user
      await AsyncStorage.setItem("username", validUser.userID);
      await AsyncStorage.setItem("user_type", validUser.type);
      setTimeout(() => {
        fetchDataAndStoreLocally(validUser.userID);
      }, 1000);
      setTimeout(() => {
        router.push("/main");
        setSignUpInProgress(false);
      }, 8000);
    } catch (e) {
      console.error("errorSavingUser");
    }
  };

  const onChooseImagePress = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync();
      if (!result.cancelled) {
        const imageUrl = await uploadImage(result.uri, `${username} profile`);
        Alert.alert("Success", "Image uploaded successfully!");
        // Update the state variable with the imageUrl
        setImage(imageUrl);
      }
    } catch (error) {
      Alert.alert("Error", error.message);
      console.error(error);
    }
  }

  const updateVetData = () => {
    setVetData({
      phone: number,
      prices: prices,
      rating: 0,
      specialty: speciality,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await getUsersPasswords();
        setValidUsers(Object.values(users));
        setValidPass(Object.keys(users));
        updateVetData();
      } catch (error) {
        console.error("Hubo un error al obtener datos:", error);
      }
    };
    fetchData();
  }, [number, prices, speciality]);

  const handleSignUp = async () => {
    if (!signUpInProgress){
      setSignUpInProgress(true);
    if (username.trim() && password.trim() && EMAIL.trim()) {
      try {
        const userId = await createUser(EMAIL, password, username, isVet, vetData, image, location); // Wait for createUser to return the user ID
        setError("User created successfully!");
        const newUser = {
          userID: userId, // Use the returned user ID
          username: username.trim(),
          pass: password,
          user_type: isVet ? "vet" : "user",
        };
        setTimeout(() => {
          storeUsername(newUser);
        }, 5000);
      } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          setError("The email address is already in use. Please use a different email.");
        } else {
          setError(error.message);
          console.error("Error in createUser:", error);
        }
      }
    } else {
      setError("Username, email, and password are required.");
    }
   }
  };
  return (
    <SafeAreaView style={styles.loginscreen}>
      <View style={styles.signupBox}>
      <View style={styles.inputWrapper}>
        <View style={styles.signupinputContainer}>
          {/* Username */}
          <TextInput
            placeholder="Nombre"
            value={username}
            onChangeText={(text) => setUsername(text)}
            style={styles.signupinput}
          />

          {/* EMAIL */}
          <TextInput
            placeholder="Mail"
            value={EMAIL}
            onChangeText={(text) => setEMAIL(text)}
            style={styles.signupinput}
          />

          {/* Password */}
          <TextInput
            placeholder="Contraseña"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.signupinput}
          />

          {/* Location */}
          <TextInput
            placeholder="Ubicacion"
            value={location}
            onChangeText={(text) => setLocation(text)}
            style={styles.signupinput}
          />
        </View>
          </View>

        {/* Toggle Bar */}
        <View style={styles.inputWrapper}>
          <Text>User</Text>
          <Switch
            value={isVet}
            onValueChange={(value) => setIsVet(value)}
            trackColor={{ false: "#767577", true: COLORS.secondary }} // Change the colors to your preference
            thumbColor={isVet ? COLORS.tertiary : "#f4f3f4"}
          />
          <Text>Vet</Text>
        </View>

        {/* Vet-specific inputs */}
        {isVet && (
          <View style={styles.signupinputContainer}>
            <TextInput
              placeholder="Numero telefonico"
              value={number}
              onChangeText={(text) => setNumber(text)}
              style={styles.signupinput}
            />

            <TextInput
              placeholder="Precios"
              value={prices}
              onChangeText={(text) => setPrices(text)}
              style={styles.signupinput}
            />

            <TextInput
              placeholder="Especilidad"
              value={speciality}
              onChangeText={(text) => setSpeciality(text)}
              style={styles.signupinput}
            />
          </View>
        )}

        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}

        <Pressable onPress={() => { onChooseImagePress(); }} style={styles.searchButton}>
          <View>
            <Text style={styles.loginbuttonText}>{"Elegir imagen"}</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => { handleSignUp(); }} style={styles.loginbutton}>
          <View>
            <Text style={styles.loginbuttonText}>{"Crear usuario"}</Text>
          </View>
        </Pressable>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>
    </SafeAreaView>
  );
};

export default SignupScreen;
