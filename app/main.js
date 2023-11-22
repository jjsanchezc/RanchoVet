import React, { useState, useLayoutEffect, useEffect } from "react";
import * as Localization from "expo-localization";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { styles } from "../utils/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const translations = {
  "en-US": {
    chat: "Chat",
    chatdescvet: "Chat with clients",
    chatdesccamp: "Chat with veterinarians",
    forum: "Forum",
    forumdescvet: "Answer questions from clients",
    forumdesccamp: "Ask questions to veterinarians",
    directory: "Directory",
    directorydesc: "Look at veterinarians and chat with them",
    journal: "Journal",
    journaldesc: "Register and look at your animals' medical history",
    profile: "Profile",
    profiledesc: "Edit your profile and change your password",
  },
  "es-ES": {
    chat: "Chat",
    chatdescvet: "Chatea con clientes",
    chatdesccamp: "Chat con veterinarios",
    forum: "Foro",
    forumdescvet: "Responde preguntas de clientes",
    forumdesccamp: "Haz preguntas a veterinarios",
    directory: "Directorio",
    directorydesc: "Mira veterinarios y chatea con ellos",
    journal: "Bitácora",
    journaldesc: "Registra y mira el historial médico de tus animales",
    profile: "Perfil",
    profiledesc: "Edita tu perfil y cambia tu contraseña",
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
          {user_type !== "vet" && (
            <Text style={styles.mainMenuButtonSubText}>{t.chatdesccamp}</Text>
          )}
          {user_type == "vet" && (
              <Text style={styles.mainMenuButtonSubText}>{t.chatdescvet}</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.mainMenuButton} onPress={foro}>
          <Text style={styles.mainMenuButtonText}>{t.forum}</Text>
          {user_type !== "vet" && (
            <Text style={styles.mainMenuButtonSubText}>{t.forumdesccamp}</Text>
          )}
          {user_type == "vet" && (
              <Text style={styles.mainMenuButtonSubText}>{t.forumdescvet}</Text>
          )}
        </TouchableOpacity>
        {user_type !== "vet" && (
          <TouchableOpacity style={styles.mainMenuButton} onPress={directorio}>
            <Text style={styles.mainMenuButtonText}>{t.directory}</Text>
            <Text style={styles.mainMenuButtonSubText}>{t.directorydesc}</Text>
          </TouchableOpacity>
        )}
        {user_type !== "vet" && (
          <TouchableOpacity style={styles.mainMenuButton} onPress={bitacora}>
            <Text style={styles.mainMenuButtonText}>{t.journal}</Text>
            <Text style={styles.mainMenuButtonSubText}>{t.journaldesc}</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.mainMenuButton} onPress={perfil}>
          <Text style={styles.mainMenuButtonText}>{t.profile}</Text>
          <Text style={styles.mainMenuButtonSubText}>{t.profiledesc}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Main;
