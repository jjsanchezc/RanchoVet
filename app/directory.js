import { View, Text, Pressable, FlatList,Picker, Button } from "react-native";
import React, { useState, useEffect } from "react";
import { styles } from "../utils/styles";
import { createNewChat } from "../database/firebase";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUsersPasswords } from "../database/firebase";
import { useRouter } from "expo-router";
import { messagingTitle, messagingID } from "../components/chat/MessagingTitle";
import { Ionicons } from "@expo/vector-icons";
import Menu from "../components/Menu/Menu";
import RatingStars from "../components/forums/stars";

const Directory = () => {
    const router = useRouter();
    const [destinatary, setDestinatary] = useState({});
    const [validUsers, setValidUsers] = useState([]);
    const [filterBy, setFilterBy] = useState(''); // Estado para almacenar la opción de filtrado

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

    const clear = () => {
        setDestinatary({});
    }

    const handleFilterChange = (value) => {
        setFilterBy(value); // Almacena la opción seleccionada
    };

    const handleCreateRoom = async () => {
        if (destinatary) {
            const user = await AsyncStorage.getItem("username");
            const userData = await AsyncStorage.getItem(user);
            console.log("user", user);
            console.log("userData", userData);
            const userChats = Object.values(JSON.parse(userData).chats);
            //console.log("userChats", userChats);
            var chatKey = "";
            var newChat = true;
            var chat;
            for (let index = 0; index < userChats.length; index++) {
                chat = JSON.parse(await AsyncStorage.getItem(userChats[index]));
                //console.log("chat", chat);
                //console.log("chat.user", chat.usuarios);
                //console.log("destinatary.id", destinatary.id);
                if (chat.usuarios[0] == destinatary.id || chat.usuarios[1] == destinatary.id) {
                    newChat = false;
                    chatKey = chat.id;
                    break;
                }
            }
            if (newChat)
                chatKey = await createNewChat(user, destinatary.id);
            //console.log("destinyID", destinatary.id);
            //console.log("validUsers", validUsers);
            try {
                messagingID.value = chatKey;
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
                    <RatingStars rating={item.vet_data.rating} maxRating={5} />
                    <Text style={styles.directoryText}>Especialidad: {item.vet_data.specialty}</Text>
                    <Text style={styles.directoryText}>Ubicacion: {item.location}</Text>
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
                <Text>{destinatary.name}</Text>
                <RatingStars rating={destinatary.vet_data.rating} maxRating={5} />
                <Text>Especialidad: {destinatary.vet_data.specialty}</Text>
                <Text>Ubicacion: {destinatary.location}</Text>
                <Text>Mail: {destinatary.vet_data.mail}</Text>
                <Text>Telefono: {destinatary.vet_data.phone}</Text>
                <Text>Precios: {destinatary.vet_data.prices}</Text>
            </View>

            <View style={styles.modalbuttonContainer}>
                <Pressable
                    style={[styles.modalbutton, { backgroundColor: '#E14D2A' }]}
                    onPress={handleCreateRoom}
                >
                    <Text style={styles.modaltext}>Contactar</Text>
                </Pressable>
                <Pressable
                    style={[styles.modalbutton, { backgroundColor: '#E14D2A' }]}
                    onPress={clear}
                >
                    <Text style={styles.modaltext}>Cancelar</Text>
                </Pressable>
            </View>
        </View>
    );
    
    const handleSearch = () => {
        // Aquí puedes implementar la lógica de búsqueda según la opción seleccionada (filterBy)
        // Por ejemplo, filtrar la lista de veterinarios
        // ...lógica de filtrado
        console.log("Realizar búsqueda con filtro:", filterBy);
    };
    const renderFilterPicker = () => (
            <View style={styles.filterContainer}>
                <Text>Filtrar por: </Text>
                <Picker
                    selectedValue={filterBy}
                    style={styles.pickerStyle}
                    onValueChange={(itemValue) => handleFilterChange(itemValue)}
                >
                    <Picker.Item label="Seleccionar filtro" value="" />
                    <Picker.Item label="Ubicación" value="ubicacion" />
                    <Picker.Item label="Precio" value="precio" />
                    <Picker.Item label="Calificación" value="calificacion" />
                    <Picker.Item label="Especialización" value="especializacion" />
                </Picker>
                <Button style={styles.loginbutton}
                title="Buscar"
                onPress={handleSearch}
            />
            </View>
    );

    return (
        <View style={styles.directoryscreen}>
            {Object.keys(destinatary).length > 0 ? (
                // Render details when a destinatary is selected
                renderItemDetails()
            ) : (
                <View style={styles.directoryscreen}>
                    <Text style={styles.modalsubheading}>Selecciona un veterinario</Text>
                    {renderFilterPicker()}
                    <FlatList
                        data={validUsers}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                    />
                </View>
            )}
            <Menu />
        </View>
    );
};

export default Directory;
