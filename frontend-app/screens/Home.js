import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Nav from "../components/Nav";

const Home = () => {
  return (
    <View style={styles.home}>
      <Text>Home</Text>
      <Nav />
    </View>
  );
};
const styles = StyleSheet.create({
  home: {
    flex: 1,
  },
});
export default Home;
