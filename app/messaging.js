import React, { useEffect, useLayoutEffect, useState, useRef } from "react";
import { View, TextInput, Text, FlatList, Pressable } from "react-native";
import { useRouter } from "expo-router";
import MessageComponent from "../components/chat/MessageComponent";
import { styles } from "../utils/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { messagingTitle, messagingID } from "../components/chat/MessagingTitle";
import { getData, sendMessage } from "../database/localdatabase";
import { updateChat } from "../database/firebase";

const Messaging = () => {
	const router = useRouter();
	//const { state } = this.props.location;
	//const { id, name } = useLocalSearchParams();
	const [room_id, setId] = useState("");
	const [name, setName] = useState("");
	const [user, setUser] = useState("");
	const flatListRef = useRef(null);

	const [chatMessages, setChatMessages] = useState([]);
	const [message, setMessage] = useState("");

	const getRoom = async () => {
		try {
			const value = await AsyncStorage.getItem("username");
			const room_id = messagingID.value;
			const name = messagingTitle.value;
			if (value !== null)
				setUser(value);
			if (room_id !== null)
				setId(room_id);
			if (name !== null)
				setName(name);
			//console.log(room_id);
			const cm = await updateChat(room_id);
			setChatMessages(Object.values(cm["mensajes"]));
			//console.log(Object.values(cm["mensajes"]));
		} catch (e) {
			console.error("Error al cargar chat!");
		}
	};

	const handleNewMessage = async () => {
		if (user) {
			await sendMessage(room_id, message, user);
			getRoom();
			setMessage("");
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

	useLayoutEffect(() => {
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
				) : (
					""
				)}
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
						<Text style={{ color: "#FBF4E1", fontSize: 20 }}>ENVIAR</Text>
					</View>
				</Pressable>
			</View>
		</View>
	);
};

export default Messaging;
