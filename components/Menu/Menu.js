import { useNavigation } from "expo-router";
import React from "react";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";

const Menu = () => {
    const navigation = useNavigation();
    return(
        <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.buttonStyle}
            onPress={()=>navigation.navigate('chat')}>
                <Text> Chats </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonStyle}
            onPress={()=>navigation.navigate('forums')}>
                <Text> Foros </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({

    menuContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly"
    }
});

export default Menu;