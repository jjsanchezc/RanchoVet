import React, { useEffect, useLayoutEffect, useState, useRef } from "react";
import { View, TextInput, Text, FlatList, Pressable } from "react-native";
import { useRouter } from "expo-router";
import * as Localization from "expo-localization";
import MessageComponent from "../components/chat/MessageComponent";
import { styles } from "../utils/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { messagingTitle, messagingID } from "../components/chat/MessagingTitle";
import { getData, sendMessage } from "../database/localdatabase";
import { updateChat } from "../database/firebase";

const translations = {
	'en-US': {
	  sendMessage: "SEND",
	  errorLoadingChat: "Error loading chat!",
	},
	'es-ES': {
	  sendMessage: "ENVIAR",
	  errorLoadingChat: "Error al cargar el chat!",
	},
	// otros idiomas
  };
  
const Messaging = () => {
  const router = useRouter();
  //const { state } = this.props.location;
  //const { id, name } = useLocalSearchParams();
  const [room_id, setId] = useState("");
  const [name, setName] = useState("");
  const [user, setUser] = useState("");
  const flatListRef = useRef(null);
  const locale = Localization.locale;
  const language = locale.split("-")[0];
  const t =
    translations[locale] || translations[language] || translations["es-ES"];

  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState("");

  const getRoom = async () => {
    try {
      const value = await AsyncStorage.getItem("username");
      const room_id = messagingID.value;
      const name = messagingTitle.value;
      if (value !== null) setUser(value);
      if (room_id !== null) setId(room_id);
      if (name !== null) setName(name);
      //console.log(room_id);
      const cm = await updateChat(room_id);
      setChatMessages(Object.values(cm["mensajes"]));
      //console.log(Object.values(cm["mensajes"]));
    } catch (e) {
      console.error(t.errorLoadingChat);
    }
  };

  const handleNewMessage = async () => {
    if (user && message.trim() !== "") {
      const send = message;
      setMessage("");
      await sendMessage(room_id, send, user);
      getRoom();
      if (flatListRef.current) {
        flatListRef.current.scrollToEnd({ animated: true });
      }
    }
  };

  const scrollToBottom = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: false });
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      getRoom();
    }, 50);
    return () => clearInterval(intervalId);
  }, [getRoom]);

  return (
    <View style={styles.messagingscreen}>
      <View
        style={[
          styles.messagingscreen,
          { paddingVertical: 15, paddingHorizontal: 10, flex: 1 },
        ]}
      >
        {chatMessages.length > 0 ? (
          <FlatList
            ref={flatListRef}
            data={chatMessages}
            renderItem={({ item }) => (
              <MessageComponent item={item} user={user} />
            )}
            keyExtractor={() => Math.random().toString(36).substring(2)}
            onContentSizeChange={scrollToBottom}
          />
        ) : null}
      </View>

      <View style={styles.messaginginputContainer}>
        <TextInput
          style={styles.messaginginput}
          onChangeText={(value) => setMessage(value)}
          value={message}
          onSubmitEditing={handleNewMessage}
        />
        <Pressable
          style={styles.messagingbuttonContainer}
          onPress={handleNewMessage}
        >
          <View>
            <Text style={{ color: "#FBF4E1", fontSize: 20 }}>{t.sendMessage}</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default Messaging;
