import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Asegúrate de instalar esta biblioteca
import { Stack, useRouter } from "expo-router";

const Menu = () => {
  const router = useRouter();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity style={{ alignItems: 'center', marginRight: 20 }} onPress={() => router.push("/main")}>
          <MaterialIcons name="home" size={24} color="#CF5C36" />
          <Text>Menú</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: 'center', marginRight: 20 }} onPress={() => router.push("/chat")}>
          <MaterialIcons name="chat" size={24} color="#CF5C36" />
          <Text>Chats</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: 'center', marginRight: 20 }} onPress={() => router.push("/forums")}>
          <MaterialIcons name="forum" size={24} color="#CF5C36" />
          <Text>Foro</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: 'center' }}>
          <MaterialIcons name="person" size={24} color="#CF5C36" />
          <Text>Perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default Menu;
