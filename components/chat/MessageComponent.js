import { View, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../../utils/styles";

export default function MessageComponent({ item, user }) {
  const isCurrentUser = item.user !== user;

  return (
    <View>
      <View
        style={
          isCurrentUser
            ? styles.mmessageWrapper
            : [styles.mmessageWrapper, { alignItems: "flex-end" }]
        }
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons
            name='person-circle-outline'
            size={30}
            color='black'
            style={styles.mvatar}
          />
          <View
            style={
              isCurrentUser
                ? styles.mmessage
                : [styles.mmessage, { backgroundColor: "rgb(194, 243, 194)" }]
            }
          >
            <Text>{item.text}</Text>
          </View>
        </View>
        <Text style={{ marginLeft: 40 }}>{item.time}</Text>
      </View>
    </View>
  );
}
