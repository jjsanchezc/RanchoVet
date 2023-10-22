import React from "react";
import { View, TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';


const Comments = ({ navigateToReplies }) => {
  
  return (
    <View className='likes__container'>
      <TouchableOpacity
        style={{ alignSelf: 'flex-end', marginRight: 20 }}
        onPress={navigateToReplies}
      >
        <MaterialIcons name="expand-more" size={24} color="#CF5C36" />
      </TouchableOpacity>
    </View>
  );
};

export default Comments;