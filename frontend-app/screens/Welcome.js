import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import PageContainer from "../components/PageContainer";
import { COLORS, FONTS, SIZES, images } from "../constants";
const screenWidth = Dimensions.get("window").width;
const Welcome = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <PageContainer>
        <View style={styles.main}>
          <Image source={images.screen2} style={styles.imgHeader} />
          <Image source={images.logo} style={styles.imgLogo} />
          <Text style={[FONTS.h4, styles.textIntro]}>Hey! Welcome</Text>
          <Text style={FONTS.body4}>To the home of pets!</Text>
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
  imgLogo: {
    height: 120,
    width: 120,
    marginBottom: 22,
  },
  imgHeader: {
    height: 420,
    width: screenWidth,
    marginBottom: 22,
  },
  textIntro: {
    marginBottom: 10,
    color: COLORS.black,
  },
});
export default Welcome;
