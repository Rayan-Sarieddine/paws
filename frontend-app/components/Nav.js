import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { AntDesign, Entypo, Fontisto, Ionicons } from "@expo/vector-icons";
import React from "react";
import { COLORS } from "../constants";
import { useNavigation } from "@react-navigation/native";
const screenWidth = Dimensions.get("window").width;
const Nav = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.nav}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Home");
        }}
      >
        <View style={styles.navItem}>
          <AntDesign
            name="home"
            size={24}
            color="white"
            style={styles.navLogo}
          />
          <Text style={styles.navTitle}>Home</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Tracker");
        }}
      >
        <View style={styles.navItem}>
          <Entypo
            name="location"
            size={24}
            color="white"
            style={styles.navLogo}
          />
          <Text style={styles.navTitle}>Tracker</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Chat");
        }}
      >
        <View style={styles.navItem}>
          <Fontisto
            name="hipchat"
            size={24}
            color="white"
            style={styles.navLogo}
          />
          <Text style={styles.navTitle}>Chat</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Profile");
        }}
      >
        <View style={styles.navItem}>
          <Ionicons
            name="paw-outline"
            size={24}
            color="white"
            style={styles.navLogo}
          />
          <Text style={styles.navTitle}>Profile</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  nav: {
    width: screenWidth,
    height: 100,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  navLogo: {
    textAlign: "center",
    marginBottom: 5,
  },
  navTitle: {
    color: "white",
  },
});
export default Nav;
