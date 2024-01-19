import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import PageContainer from "../components/PageContainer";
import { COLORS, FONTS, SIZES, images } from "../constants";
import Button from "../components/Button";
const screenWidth = Dimensions.get("window").width;
const Welcome = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <PageContainer>
        <View style={styles.main}>
          <Image source={images.screen2} style={styles.imgHeader} />
          <Text style={[FONTS.h4, styles.textIntro]}>Welcome</Text>
          <Text style={[FONTS.body4, styles.textSlogan]}>
            To the home of pets!
          </Text>
          <Button
            title="Log in"
            filled
            onPress={() => navigation.navigate("Login")}
            style={{
              width: SIZES.width - 44,
              marginBottom: SIZES.padding,
            }}
          />

          <Button
            title="Register"
            onPress={() => navigation.navigate("Register")}
            style={{
              width: SIZES.width - 44,
              marginBottom: SIZES.padding,
              backgroundColor: "transparent",
              borderColor: COLORS.primary,
            }}
          />
        </View>
      </PageContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  main: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },

  imgHeader: {
    height: 320,
    width: screenWidth,
    marginBottom: 100,
  },
  textIntro: {
    marginBottom: 10,
    color: COLORS.black,
  },
  textSlogan: {
    marginBottom: 15,
    color: COLORS.black,
  },
  btn: {
    width: 300,
    marginTop: 20,
  },
});
export default Welcome;
