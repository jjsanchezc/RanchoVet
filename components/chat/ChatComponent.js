import { useRouter } from "expo-router";
import { View, Text, Pressable } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../../utils/styles";

const ChatComponent = ({ item }) => {
  const router = useRouter();
  const [messages, setMessages] = useState({});

  useLayoutEffect(() => {
    setMessages(item.messages[item.messages.length - 1]);
  }, []);

  const handleNavigation = (id, name) => {
    router.push("/messaging", { id, name });
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

