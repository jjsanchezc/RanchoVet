import { useRouter } from "expo-router";
import { View, Text, Pressable } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../../utils/styles";
import { messagingTitle } from "./MessagingTitle";

const ChatComponent = ({ item }) => {
  const router = useRouter();
  const [messages, setMessages] = useState({});

  useLayoutEffect(() => {
    setMessages(item.messages[item.messages.length - 1]);
  }, []);

  const handleNavigation = async (id, name) => {
    try {
      messagingTitle.value = name;
      router.push("/messaging", { id, name });
    } catch (e) {
      console.error("Error! While saving room");
    }
  };

  return (
    <Pressable style={styles.cchat} onPress={() => handleNavigation(item.id, item.name)}>
      <Ionicons
        name='person-circle-outline'
        size={45}
        color='black'
        style={styles.cavatar}
      />

      <View style={styles.crightContainer}>
        <View>
          <Text style={styles.cusername}>{item.name}</Text>

          <Text style={styles.cmessage}>
            {messages?.text ? messages.text : "Tap to start chatting"}
          </Text>
        </View>
        <View>
          <Text style={styles.ctime}>
            {messages?.time ? messages.time : "now"}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ChatComponent;

