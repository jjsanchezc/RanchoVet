import React, { useState, useLayoutEffect, useEffect } from "react";
import { View, Text, TouchableOpacity } from 'react-native';
import * as Localization from 'expo-localization';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const translations = {
  'en-US': {
    menu: 'Menu',
    chats: 'Chats',
    directorio: 'Directory',
    foro: 'Forum',
    perfil: 'Profile',
  },
  'es-ES': {
    menu: 'Menú',
    chats: 'Chats',
    directorio: 'Directorio',
    foro: 'Foro',
    perfil: 'Perfil',
  },
};

const Menu = () => {
  const router = useRouter();
  const [user_type, setuser_type] = useState("");

  useLayoutEffect(() => {
    const values = async () => {
      setuser_type(await AsyncStorage.getItem("user_type"));
    };
    values();
  }, []);

  const locale = Localization.locale;
  const language = locale.split('-')[0]; // Obtén solo el código de idioma, sin la región
  const t = translations[locale] || translations[language] || translations['es-ES']; // Fallback a inglés si no se encuentra la traducción

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity style={{ alignItems: 'center', marginRight: 20 }} onPress={() => router.back()}>
          <MaterialIcons name="home" size={24} color="#CF5C36" />
          <Text>{t.menu}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: 'center', marginRight: 20 }} onPress={() => router.replace("/chat")}>
          <MaterialIcons name="chat" size={24} color="#CF5C36" />
          <Text>{t.chats}</Text>
        </TouchableOpacity>
        {user_type !== "vet" && (
          <TouchableOpacity style={{ alignItems: 'center', marginRight: 20 }} onPress={() => router.replace("/directory")}>
            <MaterialIcons name="folder" size={24} color="#CF5C36" />
            <Text>{t.directorio}</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={{ alignItems: 'center', marginRight: 20 }} onPress={() => router.replace("/forums")}>
          <MaterialIcons name="forum" size={24} color="#CF5C36" />
          <Text>{t.foro}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => router.replace("/profile")}>
          <MaterialIcons name="person" size={24} color="#CF5C36" />
          <Text>{t.perfil}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default Menu;
