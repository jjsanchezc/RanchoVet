import React, { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { editProfile, uploadImage } from "../database/firebase";
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';
import * as constantes from "../constants";
import Menu from "../components/Menu/Menu";
import { Feather } from "@expo/vector-icons";
import { View, Text, Pressable, Image, TextInput, Button } from 'react-native';
import { styles } from "../utils/styles";
import { Ionicons } from "@expo/vector-icons";

const ProfileScreen = () => {
    const [userProfile, setUserProfile] = useState({});
    const [editing, setEditing] = useState(false);
    const [user, setUser] = useState("");
    const [imageUri, setImageUri] = useState("");

    useEffect(() => {
        const getUsername = async () => {
            try {
                const u = await AsyncStorage.getItem("username");
                setUser(u);
                const profile = JSON.parse(await AsyncStorage.getItem(u));
                setUserProfile(profile);
            } catch (e) {
                console.error("Error while loading the user");
            }
        };
        getUsername();
    }, []);

    const handleSave = () => {
        // Save the updated profile information
        // For example, you can send this data to an API or update it locally
        editProfile(user, userProfile)
        console.log("userProfile", userProfile);
        setEditing(false);
        // Add logic to handle the updated profile data
    };

    const onChooseImagePress = async () => {
        let result = await ImagePicker.launchImageLibraryAsync();
        if (!result.cancelled) {
            uploadImage(result.uri, userProfile.name + " profile")
                .then((imageUrl) => {
                    Alert.alert("Success");
                    setUserProfile({ ...userProfile, image: imageUrl }); // Update the userProfile.image with the imageUrl
                })
                .catch((error) => {
                    Alert.alert(error);
                    console.log(error)
                });
        }
    }

    return (
        <View style={styles.directoryscreen}>
            {editing ? (
                <View>
                    <Image
                        source={{ uri: userProfile.image }}
                        style={{ width: 100, height: 100 }} // Puedes ajustar el tamaño de la imagen según tus necesidades
                    />
                    <Pressable onPress={() => { onChooseImagePress(); }} style={styles.searchButton}>
                        <View>
                            <Text style={styles.loginbuttonText}>{"Elegir imagen"}</Text>
                        </View>
                    </Pressable>

                    <Text style={styles.profileDetailsText}>Contraseña </Text>
                    <TextInput
                        value={userProfile.pass}
                    />

                    <Text style={styles.profileDetailsText} >Nombre</Text>
                    <TextInput
                        value={userProfile.name}
                        onChangeText={(text) => setUserProfile({ ...userProfile, name: text })}
                    />
                    <Text style={styles.profileDetailsText} >Dirección</Text>
                    <TextInput
                        value={userProfile.location}
                        onChangeText={(text) => setUserProfile({ ...userProfile, location: text })}
                    />
                    {userProfile.type === 'vet' && (
                        <View>
                            <Text style={styles.profileDetailsText}>Correo </Text>
                            <TextInput
                                value={userProfile.vet_data.mail}
                                onChangeText={(text) => setUserProfile({ ...userProfile, vet_data: { ...userProfile.vet_data, mail: text } })}
                            />
                            <Text style={styles.profileDetailsText}>Celular </Text>
                            <TextInput
                                value={userProfile.vet_data.phone}
                                onChangeText={(text) => setUserProfile({ ...userProfile, vet_data: { ...userProfile.vet_data, phone: text } })}
                            />
                            <Text style={styles.profileDetailsText}>Precios </Text>
                            <TextInput
                                value={userProfile.vet_data.prices}
                                onChangeText={(text) => setUserProfile({ ...userProfile, vet_data: { ...userProfile.vet_data, prices: text } })}
                            />
                        </View>
                    )}
                    <Pressable onPress={handleSave} style={styles.loginbutton}>
                        <Text style={styles.loginbuttonText}>Guardar </Text>
                    </Pressable>
                </View>
            ) : (
                <View  >
                    <Image
                        source={{ uri: userProfile.image }}
                        style={{ width: 100, height: 100 }} // Puedes ajustar el tamaño de la imagen según tus necesidades
                    />
                    <Text style={styles.profileDetailsText}>Nombre </Text>
                    <Text>{userProfile.name} </Text>
                    <Text style={styles.profileDetailsText} >Dirección </Text>
                    <Text> {userProfile.location}</Text>

                    {userProfile.type === 'vet' && (
                        <View>
                            <Text style={styles.profileDetailsText}>Correo </Text>
                            <Text>{userProfile.vet_data.mail}</Text>
                            <Text style={styles.profileDetailsText}>Celular </Text>
                            <Text>{userProfile.vet_data.phone}</Text>
                            <Text style={styles.profileDetailsText}>Precios</Text>
                            <Text>{userProfile.vet_data.prices}</Text>
                            <Text style={styles.profileDetailsText}>Especialidad </Text>
                            <Text>{userProfile.vet_data.specialty}</Text>
                        </View>
                    )}
                    <Pressable onPress={() => setEditing(true)} style={styles.loginbutton}>
                        <Text style={styles.loginbuttonText}>Editar</Text>
                    </Pressable>
                </View>
            )}
            <Menu />
        </View>
    );
};

export default ProfileScreen;
