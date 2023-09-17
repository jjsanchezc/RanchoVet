import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Asegúrate de instalar esta biblioteca

const App = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity style={{ alignItems: 'center', marginRight: 20 }}>
          <MaterialIcons name="home" size={24} color="#CF5C36" />
          <Text>Inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: 'center', marginRight: 20 }}>
          <MaterialIcons name="chat" size={24} color="#CF5C36" />
          <Text>Chats</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: 'center', marginRight: 20 }}>
          <MaterialIcons name="forum" size={24} color="#CF5C36" />
          <Text>Foro</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: 'center' }}>
          <MaterialIcons name="person" size={24} color="#CF5C36" />
          <Text>Cuenta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default App;
