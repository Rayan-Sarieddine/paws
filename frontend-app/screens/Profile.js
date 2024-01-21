import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import React from "react";
import Nav from "../components/Nav";
import { useSelector } from "react-redux";
const screenWidth = Dimensions.get("window").width;
const Profile = () => {
  // Getting pet info from redux
  const pet = useSelector((state) => {
    return state.Pet;
  });

  return (
    <View style={styles.profile}>
      <Image
        source={{
          uri: `http://192.168.0.104:8000/images/pets/${pet.pets.image}`,
        }}
        style={styles.imgHeader}
        onError={(e) => console.log(e.nativeEvent.error)}
      />
      <View style={styles.card}>
        <View style={styles.petInfo}>
          <Text style={styles.petInfoTitle}>Name:</Text>
          <Text style={styles.petInfoValue}>{pet.pets.name}</Text>
        </View>
        <View style={styles.petInfo}>
          <Text style={styles.petInfoTitle}>Species:</Text>
          <Text style={styles.petInfoValue}>{pet.pets.type}</Text>
        </View>
        <View style={styles.petInfo}>
          <Text style={styles.petInfoTitle}>Breed:</Text>
          <Text style={styles.petInfoValue}>{pet.pets.breed}</Text>
        </View>
        <View style={styles.petInfo}>
          <Text style={styles.petInfoTitle}>DOB:</Text>
          <Text style={styles.petInfoValue}>{pet.pets.date_of_birth}</Text>
        </View>
      </View>
      <Nav />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  profile: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  card: {
    marginBottom: 50,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 20,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    alignItems: "center",
  },
  imgHeader: {
    height: 350,
    width: screenWidth,
    marginBottom: 100,
  },
  petInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
  },
  petInfoTitle: {
    fontWeight: "bold",
    color: "#333",
    width: "30%",
  },
  petInfoValue: {
    width: "70%",
    textAlign: "right",
  },
});
export default Profile;
