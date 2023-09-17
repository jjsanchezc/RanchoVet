import React, { useState, useLayoutEffect, useEffect } from "react";
import { View, Text, Pressable, SafeAreaView, FlatList } from "react-native";
import { Stack, useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import Modal from "../components/chat/Modal";
import ChatComponent from "../components/chat/ChatComponent";
import socket from "../utils/socket";
import { styles } from "../utils/styles";
import Menu from "../components/menu/Menu";

const Chat = () => {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [rooms, setRooms] = useState([]);

  useLayoutEffect(() => {
    function fetchGroups() {
      fetch("http://34.125.202.209:4000/api")
        .then((res) => res.json())
        .then((data) => setRooms(data))
        .catch((err) => console.error(err));
    }
    fetchGroups();
  }, []);

  useEffect(() => {
    socket.on("roomsList", (rooms) => {
      setRooms(rooms);
    });
  }, [socket]);

  const handleCreateGroup = () => setVisible(true);

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
            keyExtractor={(item) => item.id}
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
