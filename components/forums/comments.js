import React from "react";
import { Stack, useRouter } from "expo-router";
import { Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

const Comments = ({ numberOfComments, threadId }) => {
	const router = useRouter();
	
	return (
		<div className='likes__container'>
			<TouchableOpacity style={{ alignItems: 'center', marginRight: 20 }} onPress={() => router.push("/Replies")}>
          	<MaterialIcons name="format-list-numbered" size={24} color="#CF5C36" />
          	<Text>Respuestas</Text>
        </TouchableOpacity>
			<Text style={{ color: "#434242" }}>
				{numberOfComments === 0 ? "" : numberOfComments}
			</Text>
		</div>
	);
};

export default Comments;