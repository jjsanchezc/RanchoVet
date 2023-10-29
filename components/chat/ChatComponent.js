import { useRouter } from "expo-router";
import { View, Text, Pressable } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import * as Localization from "expo-localization";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../../utils/styles";
import { messagingTitle, messagingID } from "./MessagingTitle";

const translations = {
  "en-US": {
    startChatting: "Tap to start chatting",
    now: "now",
  },
  "es-ES": {
    startChatting: "Toca para empezar a chatear",
    now: "ahora",
  },
};

const ChatComponent = ({ item }) => {
  const router = useRouter();
  const [messages, setMessages] = useState({});
  const locale = Localization.locale;
  const language = locale.split("-")[0];
  const t =
    translations[locale] || translations[language] || translations["es-ES"];

  useLayoutEffect(() => {
    const keys = Object.keys(item.mensajes);
    const lastKey = keys[keys.length - 1];
    const lastItem = item.mensajes[lastKey];
    setMessages(lastItem);
  }, []);

  const handleNavigation = async (id, name) => {
    try {
      messagingID.value = id;
      messagingTitle.value = name;
      router.push("/messaging", { id, name });
    } catch (e) {
      console.error("Error! While saving room", e);
    }
  };

  return (
    item && (
      <Pressable
        style={styles.cchat}
        onPress={() => handleNavigation(item.id, item.name)}
      >
        <Ionicons
          name="person-circle-outline"
          size={45}
          color="black"
          style={styles.cavatar}
        />

        <View style={styles.crightContainer}>
          <View>
            <Text style={styles.cusername}>{item.name}</Text>

            <Text style={styles.cmessage}>
              {messages?.contenido ? messages.contenido : t.startChatting}
            </Text>
          </View>
          <View>
            <Text style={styles.ctime}>
              {messages?.hora ? messages.hora : t.now}
            </Text>
          </View>
        </View>
      </Pressable>
    )
  );
};

export default ChatComponent;
