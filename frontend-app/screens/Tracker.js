import { View, Text, StyleSheet, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import MapView, { Callout, Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../constants";
import { useSelector } from "react-redux";
import { trackerDataSource } from "../core/dataSource/remoteDataSource/tracker";

const Tracker = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => {
    return state.User;
  });
  const pet = useSelector((state) => {
    return state.Pet;
  });
  console.log("here", pet);
  const [userLong, setuserLong] = useState(0);
  const [userLat, setuserLat] = useState(0);
  async function getLocationPermission() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      navigation.navigate("Home");
      return;
    }
  }
  async function getPetLocation() {
    try {
      const response = await trackerDataSource.getTrackerById({
        id: pet.pets.id,
      });
    } catch (err) {
      console.log(err);
    }
  }
  async function getUserLocation() {
    try {
      await getLocationPermission();

      let location = await Location.getCurrentPositionAsync({});
      setuserLat(location.coords.latitude);
      setuserLong(location.coords.longitude);
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
      >
        <Marker
          coordinate={{ latitude: userLat, longitude: userLong }}
          pinColor={COLORS.primary}
        >
          <Callout style={styles.callout}>
            <Text>{user.name}</Text>
          </Callout>
        </Marker>
      </MapView>
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
  callout: {
    backgroundColor: "white",
    borderRadius: 10,
  },
});
export default Tracker;
