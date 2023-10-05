import { View, Text, Pressable, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { styles } from "../utils/styles";
import { createNewChat } from "../database/firebase";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUsersPasswords } from "../database/firebase";
import { useRouter } from "expo-router";
import { messagingTitle, messagingID } from "../components/chat/MessagingTitle";
import { Ionicons } from "@expo/vector-icons";

const Directory = () => {
    const router = useRouter();
    const [destinatary, setDestinatary] = useState("");
    const [validUsers, setValidUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const users = await getUsersPasswords();
                const Vusers = Object.values(users);
                const ids = Object.keys(users);
                const vetUsers = [];
                for (let index = 0; index < Vusers.length; index++) {
                    if (Vusers[index].type == 'vet') {
                        Vusers[index].id = ids[index];
                        vetUsers.push(Vusers[index]);
                    }
                }
                setValidUsers(vetUsers);
            } catch (error) {
                console.error("Error al obtener contraseña del usuario:", error);
            }
        };
        fetchData();
    }, []);

    const back = () => {
        router.back();
    }

    const handleCreateRoom = async () => {
        if (destinatary) {
            const user = await AsyncStorage.getItem("username");
            const newChatKey = await createNewChat(user, destinatary.id);
            //console.log("destinyID", destinatary.id);
            //console.log("validUsers", validUsers);
            try {
                messagingID.value = newChatKey;
                messagingTitle.value = destinatary.id;
                router.back();
                router.push("/messaging");
            } catch (e) {
                console.error("Error! While saving room", e);
            }
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.directoryBox}>
            <Pressable
                onPress={() => setDestinatary(item)} // Set the selected user on press
                style={[
                    styles.directoryBox,
                    {
                        backgroundColor: destinatary && destinatary.id === item.id ? 'green' : '#E14D2A', // Highlight the selected user
                    },
                ]}
            >
                <View>
                    <Ionicons
                        name="person-circle-outline"
                        size={45}
                        color="black"
                        style={styles.cavatar}
                    />
                </View>
                <View>
                    <Text style={styles.directoryText}>{item.name}</Text>
                    <Text style={styles.directoryText}>Especialidad: {item.vet_data.specialty}</Text>
                    <Text style={styles.directoryText}>Telefono: {item.vet_data.phone}</Text>
                    <Text style={styles.directoryText}>Correo: {item.vet_data.mail}</Text>
                    <Text style={styles.directoryText}>Ubicacion: {item.location}</Text>
                </View>
            </Pressable>
        </View>
    );


    return (
        <View style={styles.directoryscreen}>
            <Text style={styles.modalsubheading}>Selecciona un veterinario</Text>
            <FlatList
                data={validUsers}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
            <View style={styles.modalbuttonContainer}>
                <Pressable
                    style={[styles.modalbutton, { backgroundColor: '#E14D2A' }]}
                    onPress={handleCreateRoom}
                    disabled={!destinatary} // Disable button if no user is selected
                >
                    <Text style={styles.modaltext}>Crear</Text>
                </Pressable>
                <Pressable
                    style={[styles.modalbutton, { backgroundColor: '#E14D2A' }]}
                    onPress={back}
                >
                    <Text style={styles.modaltext}>Cancelar</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default Directory;