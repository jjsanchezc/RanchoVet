import React from "react";
import { Stack, useRouter } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

const Likes = ({ numberOfLikes, threadId }) => {

	return (
		<View className='likes__container'>
			<TouchableOpacity style={{ alignSelf: 'flex-end', marginRight: 20 }}>
				<MaterialIcons name="thumb-up" size={24} color="#CF5C36" />
			</TouchableOpacity>
		</View>
	);
};

export default Likes;