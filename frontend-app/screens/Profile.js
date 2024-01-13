import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import Nav from "../components/Nav";
import { useSelector } from "react-redux";
import { images } from "../constants";

const Profile = () => {
  const pet = useSelector((state) => {
    return state.Pet;
  });
  console.log("====================================");
  console.log(pet);
  console.log("====================================");
  return (
    <View style={styles.profile}>
      <View style={styles.card}>
        <Image
          source={{
            uri: `http://192.168.0.104:8000/images/pets/${pet.pets.image}`,
          }}
          style={styles.profileImg}
          onError={(e) => console.log(e.nativeEvent.error)}
        />
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
const styles = StyleSheet.create({
  profile: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
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
  profileImg: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
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
