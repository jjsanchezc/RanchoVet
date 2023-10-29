import { View, Text, Pressable, FlatList, Button } from "react-native";
import React, { useState, useEffect } from "react";
import { styles } from "../utils/styles";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Menu from "../components/Menu/Menu";
import * as constantes from "../constants";

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
            <View style={styles.rowContainer}>
                <View
                    style={[
                        styles.directoryBox,
                        {
                            borderColor: '#D3D5D7', 
                            borderBottomWidth: 2,
                            backgroundColor: '#F7EDCF', // Highlight the selected user
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
                            <Text style={styles.directoryText}><Text style={{ fontWeight: 'bold' }}>{item.name}</Text></Text>
                            <Text style={styles.directoryText}>Animal: {item.species}</Text>
                            <Text style={styles.directoryText}>Veterinario: {item.veterinary}</Text>
                        </View>
                <View style={styles.columnContainer}>
                    <Button
                        title="Ver detalles"
                            onPress={() => setanimal(item)}
                            color={constantes.COLORS.tertiary}
                            style={styles.journalButton}
                        />
                </View>
            </View>

            </View>

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
