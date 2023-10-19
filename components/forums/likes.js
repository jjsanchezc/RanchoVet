import React from "react";
import { Stack, useRouter } from "expo-router";
import { Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

const Likes = ({ numberOfLikes, threadId }) => {
	const handleLikeFunction = () => {
		fetch("http://localhost:4000/api/thread", {
			method: "POST",
			body: JSON.stringify({
				threadId,
				userId: localStorage.getItem("_id"),
			}),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.error_message) {
					alert(data.error_message);
				} else {
					alert(data.message);
				}
			})
			.catch((err) => console.error(err));
	};

	return (
		<div className='likes__container'>
			<TouchableOpacity style={{ alignSelf: 'flex-end', marginRight: 20 }}>
				<MaterialIcons name="thumb-up" size={24} color="#CF5C36" />
			</TouchableOpacity>
		</div>
	);
};

export default Likes;