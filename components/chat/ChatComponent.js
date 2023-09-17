import { useRouter } from "expo-router";
import { View, Text, Pressable } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../../utils/styles";
import { messagingTitle, messagingID } from "./MessagingTitle";

const ChatComponent = ({ item }) => {
  const router = useRouter();
  const [messages, setMessages] = useState({});

  useLayoutEffect(() => {
    setMessages(item.mensajes["mensaje1"]);
  }, []);

  const handleNavigation = async (id, name) => {
    try {
      messagingID.value = id;
      messagingTitle.value = name;
      router.push("/messaging", { id, name });
    } catch (e) {
      console.error("Error! While saving room");
    }
  };

  return (
    <Pressable style={styles.cchat} onPress={() => handleNavigation(item.key, item.name)}>
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
            {messages?.contenido ? messages.contenido : "Tap to start chatting"}
          </Text>
        </View>
        <View>
          <Text style={styles.ctime}>
            {messages?.hora ? messages.hora : "now"}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ChatComponent;

