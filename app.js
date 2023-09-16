import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import home from "./app/home"
import chat from "./app/chat"
import forums from "./app/forums"

export default function app() {
    const Stack = createNativeStackNavigator();

    return(
        <>
        <NavigationContainer>
            <Stack.Navigator initialRouuteName="home">
                {/* Pantalla home */}
                <Stack.Screen name="home">
                    {(props) => <home {...props} channelname={"RanchoVet"}/>}
                </Stack.Screen>
                {/* Pantalla de chats */}
                <Stack.Screen name="chat" component={chat} />
                {/* Pantalla de foros */}
                <Stack.Screen name="forums" component={forums} />
            </Stack.Navigator>
        </NavigationContainer>
        </>
    )
}