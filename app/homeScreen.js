import React from "react";
import { View, Text, Button } from "react-native";

const HomeScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Bienvenido a mi aplicación</Text>
      <Button
        title="Iniciar Sesión"
        onPress={() => {
          // Aquí puedes implementar la navegación a la pantalla de inicio de sesión
        }}
      />
    </View>
  );
};

export default HomeScreen;
