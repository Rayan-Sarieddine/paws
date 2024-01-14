import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Nav from "../components/Nav";
import { COLORS } from "../constants";
import { FontAwesome } from "@expo/vector-icons";

const Chat = () => {
  const [inputMessage, setInputMessage] = useState("");
  const [outputMessage, setOutputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const [messages, setMessages] = useState([]);
  const handleInputText = (text) => {
    setInputMessage(text);
  };
  const submitHandler = () => {};
  return (
    <View style={styles.chat}>
      <View style={styles.bottomRow}>
        <View style={styles.bottomRowContent}>
          <TextInput
            value={inputMessage}
            onChangeText={handleInputText}
            placeholder="Enter your question"
            placeholderTextColor={"#333"}
            style={styles.chatInput}
          />

          <TouchableOpacity onPress={submitHandler} style={styles.chatSendBtn}>
            <FontAwesome name="send-o" color={COLORS.primary} size={24} />
          </TouchableOpacity>
        </View>
      </View>
      <Nav />
    </View>
  );
};
const styles = StyleSheet.create({
  chat: {
    flex: 1,
  },
  bottomRow: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 8,
    position: "absolute",
    bottom: 100,
  },
  bottomRowContent: {
    flex: 1,
    flexDirection: "row",
    marginLeft: 10,
    backgroundColor: "#fff",
    paddingVertical: 8,
    marginHorizontal: 12,
    borderRadius: 12,
    borderColor: "#333",
    borderWidth: 0.2,
  },
  chatInput: {
    flex: 1,
    paddingHorizontal: 10,
  },
  chatSendBtn: {
    padding: 6,
    borderRadius: 8,
    marginHorizontal: 12,
  },
});
export default Chat;
