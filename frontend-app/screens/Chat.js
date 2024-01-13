import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Nav from "../components/Nav";

const Chat = () => {
  return (
    <View style={styles.chat}>
      <Nav />
    </View>
  );
};
const styles = StyleSheet.create({
  chat: {
    flex: 1,
  },
});
export default Chat;
