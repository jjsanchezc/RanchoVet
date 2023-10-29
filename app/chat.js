import React, { useState, useLayoutEffect, useEffect } from "react";
import { View, Text, Pressable, SafeAreaView, FlatList, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import ChatComponent from "../components/chat/ChatComponent";
import { styles } from "../utils/styles";
import Menu from "../components/Menu/Menu";
import { getData, fetchDataAndStoreLocally } from "../database/localdatabase";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as constantes from "../constants";

const Chat = () => {
  const router = useRouter();
  const [rooms, setRooms] = useState([]);
  const [user_type, setuser_type] = useState("");
  var user = "";
  const chatIdentifiers = [];

  useLayoutEffect(() => {
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      getChats();
    }, 200);
    return () => clearInterval(intervalId);
  }, [getChats]);

  const handleCreateGroup = () => router.push("/directory");

  async function getChats() {
    user = await AsyncStorage.getItem("username");
    setuser_type(await AsyncStorage.getItem("user_type"));
    await fetchDataAndStoreLocally(user);
    const userData = await getData(user);
    //console.log("user data chats", userData.chats);
    const r = [];
    for (const chatid in userData.chats) {
      const chatData = await getData(userData.chats[chatid]);
      //console.log('Chat data:', userData.chats[chatid], chatData);
      r.push(chatData)
      chatIdentifiers.push(chatid);
    }
    setRooms(r);
    //console.log("rooms", r);
  }
  const [searchText, setSearchText] = useState('');
  const handleSearch = () => {
    // Realiza acciones de búsqueda aquí con el valor de searchText
    console.log("Realizar búsqueda con texto:", searchText);
  };
  return (
    <SafeAreaView style={styles.chatscreen}>
      <View style={styles.chattopContainer}>
        <View style={styles.chatheader}>
        <View style={styles.searchContainer}>
            <TextInput
            style={styles.searchInput}
            placeholder="Buscar"
            value={searchText}
            onChangeText={setSearchText}
          />
          <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
            <Text style={styles.searchButtonText}>Buscar</Text>
          </TouchableOpacity>
        </View>
          {user_type !== 'vet' && (
            <Pressable onPress={handleCreateGroup}>
              <Feather name="edit" size={constantes.SIZES.xLarge} color={constantes.COLORS.tertiary} />
            </Pressable>
          )}
        </View>
      </View>
      <View style={styles.chatlistContainer}>
        {rooms.length > 0 ? (
          <FlatList
            data={rooms}
            renderItem={({ item }) => <ChatComponent item={item} />}
            keyExtractor={() => Math.random().toString(36).substring(2)}
          />
        ) : (
          <View style={styles.chatemptyContainer}>
            <Text style={styles.chatemptyText}>No hay chats creados!</Text>
            <Text>Dale click en el ícono de arriba para iniciar un nuevo chat</Text>
          </View>
        )}
      </View>
      <Menu />
    </SafeAreaView>
  );
};

export default Chat;
