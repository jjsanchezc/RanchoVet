import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import index from "./app/index"
import chat from "./app/chat"
import forums from "./app/forums"
import directory from "./app/forums"

export default function app() {
    const Stack = createNativeStackNavigator();

    return (
        <>
            <NavigationContainer>
                <Stack.Navigator initialRouuteName="Menu">
                    {/* Pantalla home */}
                    <Stack.Screen name="Menu" component={index} />
                    {/* Pantalla de chats */}
                    <Stack.Screen name="chat" component={chat} />
                    {/* Pantalla de foros */}
                    <Stack.Screen name="directory" component={directory} />
                    {/* Pantalla de foros */}
                    <Stack.Screen name="forums" component={forums} />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    )
}