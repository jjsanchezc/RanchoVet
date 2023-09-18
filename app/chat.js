import React, { useState, useLayoutEffect, useEffect } from "react";
import { View, Text, Pressable, SafeAreaView, FlatList } from "react-native";
import { Stack, useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import Modal from "../components/chat/Modal";
import ChatComponent from "../components/chat/ChatComponent";
import socket from "../utils/socket";
import { styles } from "../utils/styles";
import Menu from "../components/Menu/Menu";
import { saveData, getData, removeData, fetchDataAndStoreLocally } from "../database/localdatabase";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Chat = () => {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [rooms, setRooms] = useState([]);
  var user = "";

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
    }
    setRooms(r);
  }

  return (
    <SafeAreaView style={styles.chatscreen}>
      <View style={styles.chattopContainer}>
        <View style={styles.chatheader}>
          <Text style={styles.chatheading}>Chats</Text>
          <Pressable onPress={handleCreateGroup}>
            <Feather name="edit" size={24} color="#CF5C36" />
          </Pressable>
        </View>
      </View>

      <View style={styles.chatlistContainer}>
        {rooms.length > 0 ? (
          <FlatList
            data={rooms}
            renderItem={({ item }) => <ChatComponent item={item} />}
            keyExtractor={(item) => item.key}
          />
        ) : (
          <View style={styles.chatemptyContainer}>
            <Text style={styles.chatemptyText}>No rooms created!</Text>
            <Text>Click the icon above to create a Chat room</Text>
          </View>
        )}
      </View>
      <Menu />
      {visible ? <Modal setVisible={setVisible} /> : ""}
    </SafeAreaView>
  );
};

export default Chat;
