import React, { useState, useLayoutEffect, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import * as Localization from "expo-localization";
import ChatComponent from "../components/chat/ChatComponent";
import { styles } from "../utils/styles";
import Menu from "../components/Menu/Menu";
import { getData, fetchDataAndStoreLocally } from "../database/localdatabase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as constantes from "../constants";

const translations = {
  "en-US": {
    search: "Search",
    searchPlaceholder: "Search",
    noChats: "No chats created!",
  },
  "es-ES": {
    search: "Buscar",
    searchPlaceholder: "Buscar",
    noChats: "No hay chats creados!",
  },
};

const Chat = () => {
  const router = useRouter();
  const [rooms, setRooms] = useState([]);
  const [user_type, setuser_type] = useState("");
  const [searchText, setSearchText] = useState("");
  const [user, setUser] = useState("");
  const locale = Localization.locale;
  const language = locale.split("-")[0];
  const t =
    translations[locale] || translations[language] || translations["es-ES"];

  useLayoutEffect(() => {
    const values = async () => {
      setUser(await AsyncStorage.getItem("username"));
      console.log("user", user);
      setuser_type(await AsyncStorage.getItem("user_type"));
      getChats();
    };
    values();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (searchText == "") {
        getChats();
      }
    }, 200);
    return () => clearInterval(intervalId);
  }, [getChats]);

  const handleCreateGroup = () => router.push("/directory");

  async function getChats() {
    if (user) {
      fetchDataAndStoreLocally(user);
      const userData = await getData(user);
      //console.log("user data chats", userData.chats);
      const r = [];
      for (const chatid in userData.chats) {
        const chatData = await getData(userData.chats[chatid]);
        //console.log('Chat data:', userData.chats[chatid], chatData);
        r.push(chatData);
      }
      setRooms(r);
      //console.log("rooms", r);
    }
  }

  const handleSearch = async () => {
    // Realiza acciones de búsqueda aquí con el valor de searchText
    const r = [];
    if (user) {
      fetchDataAndStoreLocally(user);
      const userData = await getData(user);
      for (const chatid in userData.chats) {
        const chatData = await getData(userData.chats[chatid]);
        r.push(chatData);
      }
    }

    const filteredRooms = r.filter(element => {
      // Convert both the element and the search string to lowercase for case-insensitive comparison
      const lowercasedElement = String(element.name).toLowerCase();
      const lowercasedSearchString = searchText.toLowerCase();

      // Check if the element contains the search string
      return lowercasedElement.includes(lowercasedSearchString);
    });

    setRooms(filteredRooms);
  };

  useEffect(() => {
    handleSearch();
  }, [searchText]);

  return (
    <SafeAreaView style={styles.chatscreen}>
      <View style={styles.chattopContainer}>
        <View style={styles.chatheader}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder={t.search}
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
          {user_type !== "vet" && (
            <Pressable onPress={handleCreateGroup}>
              <Feather
                name="edit"
                size={constantes.SIZES.xLarge}
                color={constantes.COLORS.tertiary}
              />
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
            <ActivityIndicator size="large" color="#CF5C36" />
          </View>
        )}
      </View>
      <Menu />
    </SafeAreaView>
  );
};

export default Chat;
