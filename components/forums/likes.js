import React, {useEffect, useState} from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { useRoute } from "@react-navigation/native";
import { likeForum, getLikeCount } from "../../database/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Likes = ({ threadId }) => {
	const [likeCount, setLikeCount] = useState(0);
	const navigate = useRoute();

	//Get like count
	useEffect(() => {
		const loadLikeCount = async () => {
			try {
				const likes = await getLikeCount(threadId);
				setLikeCount(likes);
			} catch (error) {
				console.error("Error getting like count:", error);
			}
		};
		loadLikeCount();
	}, []);

	// Get username and create like
	const createLike = async () => {
		try{
			const userId = await AsyncStorage.getItem("username");
			if (!userId){
				navigate("/");
				return;
			}
			await likeForum(threadId, userId);
		} catch (error) {
			console.error("Error creating like:", error);
		}}

	return (
		<View>
			<TouchableOpacity onPress={createLike} style={{ alignSelf: 'flex-end', marginRight: 20 }}>
				<MaterialIcons name="thumb-up" size={24} color="#CF5C36" />				
			</TouchableOpacity>
			<Text style={{ alignSelf: 'flex-end', marginRight: 20 }}>{likeCount}</Text>
		</View>
	);
};

export default Likes;