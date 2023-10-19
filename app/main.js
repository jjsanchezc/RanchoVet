import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { styles } from "../utils/styles";

const Main = () => {
  const router = useRouter();
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

  };

  return (
    <View style={styles.mainMenuContainer}>
      <View style={styles.mainMenuButtonContainer}>
        <TouchableOpacity style={styles.mainMenuButton} onPress={chat}>
          <Text style={styles.mainMenuButtonText}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.mainMenuButton} onPress={foro}>
          <Text style={styles.mainMenuButtonText}>Foro</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.mainMenuButton} onPress={directorio}>
          <Text style={styles.mainMenuButtonText}>Directorio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.mainMenuButton} onPress={bitacora}>
          <Text style={styles.mainMenuButtonText}>Bitácora</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.mainMenuButton} onPress={perfil}>
          <Text style={styles.mainMenuButtonText}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Main;
