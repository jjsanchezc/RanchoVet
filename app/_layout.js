import React, { useState, useLayoutEffect } from "react";
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { messagingTitle, router } from "../components/chat/MessagingTitle";
import { View, Text } from "react-native";


export const unstable_settings = {
  initialRouteName: 'login',
};

const Layout = () => {
  const [mTitle, setMTitle] = useState("");

  useLayoutEffect(() => {
    console.log("Router changed in Layout ", messagingTitle.value);
    setMTitle(messagingTitle.value);
  }, [messagingTitle.value, router])

  const [fontsLoaded] = useFonts({
    DMBold: require('../assets/fonts/DMSans-Bold.ttf'),
    DMMedium: require('../assets/fonts/DMSans-Medium.ttf'),
    DMRegular: require('../assets/fonts/DMSans-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack initialRouteName='login'>
      <Stack.Screen name='login' options={{ title: 'Inicio de sesión', headerStyle: {backgroundColor: "#CF5C36" , },  headerTitleStyle: { color: "#050517",  fontFamily: 'DMBold', }, }} />
      <Stack.Screen name='chat' options={{ title: 'Chats', headerStyle: {backgroundColor: "#CF5C36" , },  headerTitleStyle: { color: "#050517",  fontFamily: 'DMBold', }, }} />
      <Stack.Screen name='directory' options={{ title: 'Directorio' , headerStyle: {backgroundColor: "#CF5C36" , },  headerTitleStyle: { color: "#050517",  fontFamily: 'DMBold', }, }}/>
      <Stack.Screen name='messaging' options={{ title: mTitle , headerStyle: {backgroundColor: "#CF5C36" , },  headerTitleStyle: { color: "#050517",  fontFamily: 'DMBold', }, }} />
      <Stack.Screen name='forums' options={{ title: 'Foros' , headerStyle: {backgroundColor: "#CF5C36" , },  headerTitleStyle: { color: "#050517",  fontFamily: 'DMBold', }, }}/>
      <Stack.Screen name='answers' options={{ title: 'Respuestas' , headerStyle: {backgroundColor: "#CF5C36" , },  headerTitleStyle: { color: "#050517",  fontFamily: 'DMBold', }, }} />
      <Stack.Screen name='main' options={{ title: 'Menú principal', headerStyle: {backgroundColor: "#CF5C36" , },  headerTitleStyle: { color: "#050517",  fontFamily: 'DMBold', }, }}/>
      <Stack.Screen name='journal' options={{ title: 'Bitácora' , headerStyle: {backgroundColor: "#CF5C36" , },  headerTitleStyle: { color: "#050517",  fontFamily: 'DMBold', }, }}/>
      <Stack.Screen name='profile' options={{ title: 'Perfil' , headerStyle: {backgroundColor: "#CF5C36" , },  headerTitleStyle: { color: "#050517",  fontFamily: 'DMBold', }, }} />
    </Stack>
  );
};

export default Layout;
