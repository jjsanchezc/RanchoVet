import { View, Text, Pressable, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { styles } from "../utils/styles";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Menu from "../components/Menu/Menu";

const Journal = () => {
    const router = useRouter();
    const [animal, setanimal] = useState({});
    const [validAnimals, setvalidAnimals] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = await AsyncStorage.getItem("username");
                const userJournal = JSON.parse(await AsyncStorage.getItem(user)).journal;
                const Vanimals = Object.values(userJournal);
                const ids = Object.keys(userJournal);
                const animals = [];
                for (let index = 0; index < Vanimals.length; index++) {
                    Vanimals[index].id = ids[index];
                    animals.push(Vanimals[index]);
                }
                setvalidAnimals(animals);
            } catch (error) {
                console.error("Error al obtener contraseña del usuario:", error);
            }
        };
        fetchData();
    }, []);

    const back = () => {
        router.back();
    }

    const clear = () => {
        setanimal({});
    }

    const handleCreateRoom = async () => {

    };

    const renderItem = ({ item }) => (
        <View style={styles.directoryBox}>
            <Pressable
                onPress={() => setanimal(item)} // Set the selected user on press
                style={[
                    styles.directoryBox,
                    {
                        backgroundColor: '#E14D2A', // Highlight the selected user
                    },
                ]}
            >
                <View>
                    <Ionicons
                        name="person-circle-outline"
                        size={80}
                        color="black"
                        style={styles.cavatar}
                    />
                </View>
                <View>
                    <Text style={styles.directoryText}>{item.name}</Text>
                    <Text style={styles.directoryText}>Especie: {item.species}</Text>
                    <Text style={styles.directoryText}>Veterinario: {item.veterinary}</Text>
                </View>
            </Pressable>
        </View>
    );

    const renderItemDetails = () => (
        <View style={styles.directoryDetailsText}>
            <View>
                <Ionicons
                    name="person-circle-outline"
                    size={80}
                    color="black"
                    style={styles.cavatar}
                />
                <Text>{animal.name}</Text>
                <Text>{animal.folder}</Text>
            </View>

            <View style={styles.modalbuttonContainer}>
                <Pressable
                    style={[styles.modalbutton, { backgroundColor: '#E14D2A' }]}
                    onPress={handleCreateRoom}
                >
                    <Text style={styles.modaltext}>Editar</Text>
                </Pressable>
                <Pressable
                    style={[styles.modalbutton, { backgroundColor: '#E14D2A' }]}
                    onPress={clear}
                >
                    <Text style={styles.modaltext}>Regresar</Text>
                </Pressable>
            </View>
        </View>
    );

    return (
        <View style={styles.directoryscreen}>
            {Object.keys(animal).length > 0 ? (
                // Render details when a animal is selected
                renderItemDetails()
            ) : (
                <View style={styles.directoryscreen}>
                    <Text style={styles.modalsubheading}>Selecciona un animal</Text>
                    <FlatList
                        data={validAnimals}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                    />
                </View>
            )}
            <Menu />
        </View>
    );
};

export default Journal;
