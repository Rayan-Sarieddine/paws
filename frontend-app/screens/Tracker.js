import { View, Text, StyleSheet, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import MapView, { Callout, Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../constants";
import { useSelector } from "react-redux";
import { trackerDataSource } from "../core/dataSource/remoteDataSource/tracker";
import Button from "../components/Button";
import haversine from "haversine";

const Tracker = () => {
  const navigation = useNavigation();
  const mapRef = React.useRef(null);

  // Getting user and pet information from redux
  const user = useSelector((state) => {
    return state.User;
  });
  const pet = useSelector((state) => {
    return state.Pet;
  });

  // Map location states
  const [userLong, setuserLong] = useState(null);
  const [userLat, setuserLat] = useState(null);
  const [petLong, setpetLong] = useState(null);
  const [petLat, setpetLat] = useState(null);
  const [distance, setDistance] = useState(null);

  // Function to ask permission to use location services on user's phone
  async function getLocationPermission() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      navigation.navigate("Home");
      return;
    }
  }

  // Function to get pet location from DB
  async function getPetLocation() {
    try {
      // Send request
      const response = await trackerDataSource.getTrackerById({
        pet_id: pet.pets.id,
      });
      if (response.message === "success") {
        // Set pet location on map and fly to it
        setpetLat(parseFloat(response.location.lat));
        setpetLong(parseFloat(response.location.long));
        mapRef.current?.animateToRegion(
          {
            latitude: parseFloat(response.location.lat),
            longitude: parseFloat(response.location.long),
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          },
          1000
        );
      }
    } catch (err) {
      console.log(err);
    }
  }

  // Function to get user's location
  async function getUserLocation() {
    try {
      await getLocationPermission();

      let location = await Location.getCurrentPositionAsync({});
      setuserLat(parseFloat(location.coords.latitude));
      setuserLong(parseFloat(location.coords.longitude));
    } catch (error) {
      console.error(error);
    }
  }

  // Function to calculate the distance between the user and the pet using haversine formula
  function getDistance() {
    const start = {
      latitude: userLat,
      longitude: userLong,
    };

    const end = {
      latitude: petLat,
      longitude: petLong,
    };

    if (
      !start.latitude ||
      !start.longitude ||
      !end.latitude ||
      !end.longitude
    ) {
      setDistance("Location data not available");
      return;
    }

    const distanceInMeters = haversine(start, end, { unit: "meter" });

    // if they are close (less than 1 km), show distance in meters, else in kilometers
    const distanceStr =
      distanceInMeters < 1000
        ? `${distanceInMeters.toFixed(2)} meters`
        : `${(distanceInMeters / 1000).toFixed(2)} km`;

    setDistance(distanceStr);
  }

  // Get user and pet location on load of the screen
  useEffect(() => {
    getUserLocation();
    getPetLocation();
  }, []);

  // Calculate the distance only if all locations are set (all location states contain values)
  useEffect(() => {
    if (
      userLat !== null &&
      userLong !== null &&
      petLat !== null &&
      petLong !== null
    ) {
      getDistance();
    }
  }, [userLat, userLong, petLat, petLong]);

  return (
    <View style={styles.tracker}>
      <MapView
        ref={mapRef}
        style={styles.map}
        region={{
          latitude: 33.8938,
          longitude: 35.5018,
          latitudeDelta: 1,
          longitudeDelta: 1,
        }}
        provider="google"
      >
        {userLat && userLong && (
          <Marker
            coordinate={{ latitude: userLat, longitude: userLong }}
            pinColor={COLORS.primary}
          >
            <Callout style={styles.callout}>
              <Text>{user.name}</Text>
            </Callout>
          </Marker>
        )}
        {petLat && petLong && (
          <Marker
            coordinate={{ latitude: petLat, longitude: petLong }}
            pinColor={COLORS.secondary}
          >
            <Callout style={styles.callout}>
              <Text>{pet.pets.name}</Text>
            </Callout>
          </Marker>
        )}
      </MapView>
      {distance !== "Location data not available" ? (
        <Text style={styles.distance}>
          {pet.pets.name} is {distance} away from you
        </Text>
      ) : (
        <Text style={styles.distance}>{distance}</Text>
      )}
      <View style={styles.actions}>
        <Button
          title="Refresh"
          style={styles.refreshBtn}
          filled
          onPress={() => {
            getUserLocation();
            getPetLocation();
            getDistance();
          }}
        />
      </View>

      <Nav />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  tracker: {
    flex: 1,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 1.5,
  },
  callout: {
    backgroundColor: "white",
    borderRadius: 10,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
  },
  refreshBtn: {
    width: 150,
  },
  distance: {
    textAlign: "center",
    marginTop: 40,
  },
});
export default Tracker;
