import React from "react";
import { View, TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { useRoute } from "@react-navigation/native";
import { likeForum } from "../../database/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Likes = ({ threadId }) => {
	const navigate = useRoute();

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
		<View className='likes__container'>
			<TouchableOpacity onPress={createLike} style={{ alignSelf: 'flex-end', marginRight: 20 }}>
				<MaterialIcons name="thumb-up" size={24} color="#CF5C36" />				
			</TouchableOpacity>
		</View>
	);
};

export default Likes;