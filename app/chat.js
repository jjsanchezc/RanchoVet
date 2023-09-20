import React, { useState, useLayoutEffect, useEffect } from "react";
import { View, Text, Pressable, SafeAreaView, FlatList } from "react-native";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import Modal from "../components/chat/Modal";
import ChatComponent from "../components/chat/ChatComponent";
import { styles } from "../utils/styles";
import Menu from "../components/Menu/Menu";
import { getData, fetchDataAndStoreLocally } from "../database/localdatabase";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as constantes from "../constants";

const Chat = () => {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [rooms, setRooms] = useState([]);
  var user = "";
  const chatIdentifiers = [];

  useLayoutEffect(() => {
  }, []);

  useEffect(() => {
    getChats();
  }, []);

  const handleCreateGroup = () => setVisible(true);

  async function getChats() {
    user = await AsyncStorage.getItem("username");
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

  return (
    <SafeAreaView style={styles.chatscreen}>
      <View style={styles.chattopContainer}>
        <View style={styles.chatheader}>
          <Text style={styles.chatheading}>Chats</Text>
          <Pressable onPress={handleCreateGroup}>
            <Feather name="edit" size={constantes.SIZES.xLarge} color={constantes.COLORS.tertiary} />
          </Pressable>
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
            <Text style={styles.chatemptyText}>No rooms created!</Text>
            <Text>Click the icon above to create a Chat room</Text>
          </View>
        )}
      </View>
      <Menu />
      {visible ? <Modal setVisible={setVisible} getChats={getChats} /> : null}
    </SafeAreaView>
  );
};

export default Chat;
