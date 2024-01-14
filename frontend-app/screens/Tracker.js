import { View, Text, StyleSheet, Dimensions } from "react-native";
import React, { useEffect } from "react";
import Nav from "../components/Nav";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";

const Tracker = () => {
  const navigation = useNavigation();
  async function getLocationPermission() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      navigation.navigate("Home");
      return;
    }
  }
  async function getUserLocation() {
    try {
      await getLocationPermission();

      let location = await Location.getCurrentPositionAsync({});
      console.log(location);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getUserLocation();
  }, []);
  return (
    <View style={styles.tracker}>
      <MapView
        style={styles.map}
        region={{
          latitude: 33.88863,
          longitude: 35.49548,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        provider="google"
      ></MapView>
      <Nav />
    </View>
  );
};
const styles = StyleSheet.create({
  tracker: {
    flex: 1,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 1.3,
  },
});
export default Tracker;
