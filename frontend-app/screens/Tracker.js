import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Nav from "../components/Nav";

const Tracker = () => {
  return (
    <View style={styles.tracker}>
      <Nav />
    </View>
  );
};
const styles = StyleSheet.create({
  tracker: {
    flex: 1,
  },
});
export default Tracker;
