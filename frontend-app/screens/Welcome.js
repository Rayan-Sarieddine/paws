import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import PageContainer from "../components/PageContainer";
import { COLORS, images } from "../constants";

const Welcome = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <PageContainer>
        <View style={styles.main}>
          <Image source={images.logo} style={styles.imgMain} />
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
    justifyContent: "center",
  },
  imgMain: {
    height: 120,
    width: 120,
    marginBottom: 22,
  },
});
export default Welcome;
