import React, { useState, useLayoutEffect, useEffect } from "react";
import * as Localization from "expo-localization";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { styles } from "../utils/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const translations = {
  "en-US": {
    chat: "Chat",
    forum: "Forum",
    directory: "Directory",
    journal: "Journal",
    profile: "Profile",
  },
  "es-ES": {
    chat: "Chat",
    forum: "Foro",
    directory: "Directorio",
    journal: "Bitácora",
    profile: "Perfil",
  },
  // otros idiomas
};

const Main = () => {
  const [user_type, setuser_type] = useState("");
  const router = useRouter();

  useLayoutEffect(() => {
    const values = async () => {
      setuser_type(await AsyncStorage.getItem("user_type"));
    };
    values();
  }, []);

  const locale = Localization.locale;
  const language = locale.split("-")[0];
  const t =
    translations[locale] || translations[language] || translations["es-ES"];

  const chat = () => {
    router.push("/chat");
  };

  const foro = () => {
    router.push("/forums");
  };

  const directorio = () => {
    router.push("/directory");
  };

  const bitacora = () => {
    router.push("/journal");
  };

  const perfil = () => {
    router.push("/profile");
  };

  return (
    <View style={styles.mainMenuContainer}>
      <View style={styles.mainMenuButtonContainer}>
        <TouchableOpacity style={styles.mainMenuButton} onPress={chat}>
          <Text style={styles.mainMenuButtonText}>{t.chat}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.mainMenuButton} onPress={foro}>
          <Text style={styles.mainMenuButtonText}>{t.forum}</Text>
        </TouchableOpacity>
        {user_type !== "vet" && (
          <TouchableOpacity style={styles.mainMenuButton} onPress={directorio}>
            <Text style={styles.mainMenuButtonText}>{t.directory}</Text>
          </TouchableOpacity>
        )}
        {user_type !== "vet" && (
          <TouchableOpacity style={styles.mainMenuButton} onPress={bitacora}>
            <Text style={styles.mainMenuButtonText}>{t.journal}</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.mainMenuButton} onPress={perfil}>
          <Text style={styles.mainMenuButtonText}>{t.profile}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Main;
