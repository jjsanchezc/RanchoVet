import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, TextInput, Text, FlatList, Pressable } from "react-native";
import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import socket from "../utils/socket";
import MessageComponent from "../components/chat/MessageComponent";
import { styles } from "../utils/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Messaging = () => {
	const router = useRouter();
	//const { state } = this.props.location;
	//const { id, name } = useLocalSearchParams();
	const [room_id, setId] = useState("");
	const [name, setName] = useState("");
	const [user, setUser] = useState("");

	const [chatMessages, setChatMessages] = useState([]);
	const [message, setMessage] = useState("");

	const getRoom = async () => {
		try {
			const room_id = await AsyncStorage.getItem("room_id");
			const name = await AsyncStorage.getItem("name");
			if (room_id !== null) {
				setId(room_id);
			}
			if (name !== null) {
				setName(name);
			}
			socket.emit("findRoom", room_id);
			socket.on("foundRoom", (roomChats) => setChatMessages(roomChats));
		} catch (e) {
			console.error("Error while loading room!");
		}
	};

	const getUsername = async () => {
		try {
			const value = await AsyncStorage.getItem("username");
			if (value !== null) {
				setUser(value);
			}
		} catch (e) {
			console.error("Error while loading username!");
		}
	};

	const handleNewMessage = () => {
		const hour =
			new Date().getHours() < 10
				? `0${new Date().getHours()}`
				: `${new Date().getHours()}`;

		const mins =
			new Date().getMinutes() < 10
				? `0${new Date().getMinutes()}`
				: `${new Date().getMinutes()}`;

		if (user) {
			socket.emit("newMessage", {
				message,
				room_id: room_id,
				user,
				timestamp: { hour, mins },
			});
		}
	};

	useLayoutEffect(() => {
		//router.setOptions({ title: name });
		getUsername();
		getRoom();
	}, []);

	useEffect(() => {
		socket.on("foundRoom", (roomChats) => setChatMessages(roomChats));
	}, [socket]);

	return (
		<View style={styles.messagingscreen}>
			<View
				style={[
					styles.messagingscreen,
					{ paddingVertical: 15, paddingHorizontal: 10 },
				]}
			>
				{chatMessages && chatMessages.length > 0 ? (
					<FlatList
						data={chatMessages}
						renderItem={({ item }) => (
							<MessageComponent item={item} user={user} />
						)}
						keyExtractor={(item) => item.id}
					/>
				) : (
					""
				)}
			</View>

			<View style={styles.messaginginputContainer}>
				<TextInput
					style={styles.messaginginput}
					onChangeText={(value) => setMessage(value)}
				/>
				<Pressable
					style={styles.messagingbuttonContainer}
					onPress={handleNewMessage}
				>
					<View>
						<Text style={{ color: "#f2f0f1", fontSize: 20 }}>SEND</Text>
					</View>
				</Pressable>
			</View>
		</View>
	);
};

export default Messaging;
