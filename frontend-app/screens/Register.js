import { View, Text, SafeAreaView, StyleSheet, Image } from "react-native";
import React from "react";
import { COLORS, images, FONTS } from "../constants";
import PageContainer from "../components/PageContainer";

const Register = () => {
  return (
    <SafeAreaView style={styles.register}>
      <PageContainer>
        <View style={styles.registerMain}>
          <Image source={images.logo} style={styles.registerLogo} />
          <Text style={[FONTS.body4, styles.welcome]}>Welcome Back!</Text>
        </View>
      </PageContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  register: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  registerMain: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 22,
  },
  registerLogo: {
    height: 120,
    width: 120,
    marginBottom: 22,
  },
});

export default Register;
