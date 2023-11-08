import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { editProfile, uploadImage } from "../database/firebase";
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';


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
            uploadImage(result.uri,userProfile.name+" profile")
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
        <View>
            {editing ? (
                <View>
                    <Text>Edit Profile</Text>
                    <TextInput
                        value={userProfile.name}
                        onChangeText={(text) => setUserProfile({ ...userProfile, name: text })}
                    />
                    <TextInput
                        value={userProfile.location}
                        onChangeText={(text) => setUserProfile({ ...userProfile, location: text })}
                    />
                    <Button title="Choose image..." onPress={onChooseImagePress} />
                    {userProfile.type === 'vet' && (
                        <View>
                            <TextInput
                                value={userProfile.vet_data.mail}
                                onChangeText={(text) => setUserProfile({ ...userProfile, vet_data: { ...userProfile.vet_data, mail: text } })}
                            />
                            <TextInput
                                value={userProfile.vet_data.phone}
                                onChangeText={(text) => setUserProfile({ ...userProfile, vet_data: { ...userProfile.vet_data, phone: text } })}
                            />
                            <TextInput
                                value={userProfile.vet_data.prices}
                                onChangeText={(text) => setUserProfile({ ...userProfile, vet_data: { ...userProfile.vet_data, prices: text } })}
                            />
                            <TextInput
                                value={userProfile.vet_data.specialty}
                                onChangeText={(text) => setUserProfile({ ...userProfile, vet_data: { ...userProfile.vet_data, specialty: text } })}
                            />
                        </View>
                    )}
                    <Button title="Save" onPress={handleSave} />
                </View>
            ) : (
                <View>
                    <Text>View Profile</Text>
                    <Text>Name: {userProfile.name}</Text>
                    <Text>Location: {userProfile.location}</Text>
                    <Image
                        source={{ uri: userProfile.image }}
                        style={{ width: 100, height: 100 }} // Puedes ajustar el tamaño de la imagen según tus necesidades
                    />
                    {userProfile.type === 'vet' && (
                        <View>
                            <Text>Mail: {userProfile.vet_data.mail}</Text>
                            <Text>Phone: {userProfile.vet_data.phone}</Text>
                            <Text>Prices: {userProfile.vet_data.prices}</Text>
                            <Text>Specialty: {userProfile.vet_data.specialty}</Text>
                        </View>
                    )}
                    <Button title="Edit" onPress={() => setEditing(true)} />
                </View>
            )}
        </View>
    );
};

export default ProfileScreen;
