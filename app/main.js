
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from "expo-router";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4E3B2', // Color de fondo F4E3B2
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },

  column: {
    flexDirection: 'column', // Columnas para los botones
    alignItems: 'center',
    width: '50%', // Ancho del contenedor de columna (50% para 2 columnas)
  },

  button: {
    width: 100, // Ancho del botón
    height: 100, // Altura del botón
    backgroundColor: '#CF5C36', // Color del botón CF5C36
    margin: 10, // Margen entre los botones
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white', // Color del texto dentro del botón
  },
});

const Main = () => {
  const router = useRouter();
  const chat = () => {
    router.push("/chat");
  };

  const foro = () => {
    router.push("/forums");
  };

  const directorio = () => {

  };

  const bitacora = () => {

  };

  const perfil = () => {

  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={chat}>
          <Text style={styles.buttonText}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={foro}>
          <Text style={styles.buttonText}>Foro</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={directorio}>
          <Text style={styles.buttonText}>Directorio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={bitacora}>
          <Text style={styles.buttonText}>Bitácora</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={perfil}>
          <Text style={styles.buttonText}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Main;