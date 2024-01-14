import { View, TouchableOpacity, TextInput, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES, images } from "../constants";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons, FontAwesome, Ionicons } from "@expo/vector-icons";
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import axios from "axios";
import { useSelector } from "react-redux";

const Chat = ({ navigation }) => {
  const user = useSelector((state) => {
    return state.User;
  });
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([]);

  const renderMessage = (props) => {
    const { currentMessage } = props;

    if (currentMessage.user._id === user.id) {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <Bubble
            {...props}
            wrapperStyle={{
              right: {
                backgroundColor: COLORS.primary,
                marginRight: 12,
                marginVertical: 12,
              },
            }}
            textStyle={{
              right: {
                color: "#fff",
              },
            }}
          />
        </View>
      );
    } else {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        >
          <Image
            source={images.doctor}
            style={{
              height: 40,
              width: 40,
              borderRadius: 20,
              marginLeft: 8,
            }}
          />
          <Bubble
            {...props}
            wrapperStyle={{
              left: {
                backgroundColor: COLORS.secondary,
                marginLeft: 12,
              },
            }}
            textStyle={{
              left: {
                color: COLORS.white,
              },
            }}
          />
        </View>
      );
    }
  };

  const generateText = () => {
    setIsTyping(true);
    const message = {
      _id: Math.random().toString(36).substring(7),
      text: inputMessage,
      createdAt: new Date(),
      user: { _id: user.id },
    };

    setMessages((previousMessage) =>
      GiftedChat.append(previousMessage, [message])
    );

    axios
      .post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: inputMessage,
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer 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",
          },
        }
      )
      .then((response) => {
        const content = response.data.choices[0].message.content;
        setInputMessage("");

        const responseMessage = {
          _id: Math.random().toString(36).substring(7),
          text: content.trim(),
          createdAt: new Date(),
          user: { _id: 2, name: "ChatGPT" },
        };

        setIsTyping(false);
        setMessages((previousMessage) =>
          GiftedChat.append(previousMessage, [responseMessage])
        );
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setIsTyping(false);
      });
  };

  const submitHandler = () => {
    generateText();
  };

  const handleInputText = (text) => {
    setInputMessage(text);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      <StatusBar style="auto" />
      <View
        style={{
          height: 60,
          backgroundColor: COLORS.white,
          position: "absolute",
          top: 20,
          right: 0,
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
          paddingHorizontal: 22,
          width: SIZES.width,
          zIndex: 9999,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            height: 40,
            width: 40,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MaterialIcons name="keyboard-arrow-left" size={30} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1, justifyContent: "center" }}>
        <GiftedChat
          messages={messages}
          renderInputToolbar={() => {}}
          user={{ _id: user.id }}
          minInputToolbarHeight={0}
          renderMessage={renderMessage}
          isTyping={isTyping}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          backgroundColor: COLORS.white,
          paddingVertical: 8,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            marginLeft: 10,
            backgroundColor: COLORS.white,
            paddingVertical: 8,
            marginHorizontal: 12,
            borderRadius: 12,
            borderColor: "#333",
            borderWidth: 0.2,
          }}
        >
          <TextInput
            value={inputMessage}
            onChangeText={handleInputText}
            placeholder="Enter your question"
            placeholderTextColor="#333"
            style={{
              color: "#333",
              flex: 1,
              paddingHorizontal: 10,
            }}
          />

          <TouchableOpacity
            onPress={submitHandler}
            style={{
              padding: 6,
              borderRadius: 8,
              marginHorizontal: 12,
            }}
          >
            <FontAwesome name="send-o" color={COLORS.primary} size={24} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Chat;
