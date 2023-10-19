import React, { useState, useLayoutEffect } from "react";
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { messagingTitle, router } from "../components/chat/MessagingTitle";


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
      <Stack.Screen name='login' options={{ title: 'Inicio de sesión' }} />
      <Stack.Screen name='chat' options={{ title: 'Chats' }} />
      <Stack.Screen name='directory' options={{ title: 'Directorio' }} />
      <Stack.Screen name='messaging' options={{ title: mTitle }} />
      <Stack.Screen name='forums' options={{ title: 'Foros' }} />
      <Stack.Screen name='answers' options={{ title: 'Respuestas' }} />
      <Stack.Screen name='main' options={{ title: 'Menú principal' }} />
      <Stack.Screen name='journal' options={{ title: 'Bitacora' }} />
    </Stack>
  );
};

export default Layout;
