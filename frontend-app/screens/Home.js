import { View, Text, StyleSheet, Image } from "react-native";
import React, { useEffect } from "react";
import Nav from "../components/Nav";
import { useDispatch, useSelector } from "react-redux";
import { petDataSource } from "../core/dataSource/remoteDataSource/pet";
import { useNavigation } from "@react-navigation/native";
import { loadPet } from "../core/dataSource/localDataSource/pet";
import Button from "../components/Button";
import { images } from "../constants";
const Home = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.User;
  });
  const getUserPet = async () => {
    try {
      const response = await petDataSource.getPet(user.user_id);
      if (response.pets.length === 0) {
        navigation.navigate("AddPet");
      } else {
        dispatch(loadPet(response.pets[0]));
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getUserPet();
    });

    return unsubscribe;
  }, [navigation]);
  return (
    <View style={styles.home}>
      <View style={styles.cards}>
        <View style={styles.card}>
          <Image source={images.pet} style={styles.cardImg} />
          <Button
            title="View Pet"
            onPress={() => {
              navigation.navigate("Profile");
            }}
            filled
            style={styles.cardBtn}
          />
        </View>
        <View style={styles.card}>
          <Image source={images.track} style={styles.cardImg} />
          <Button
            title="Track Pet"
            onPress={() => {
              navigation.navigate("Tracker");
            }}
            filled
            style={styles.cardBtn}
          />
        </View>
        <View style={styles.card}>
          <Image source={images.doctor} style={styles.cardImg} />
          <Button
            title="AI Doctor"
            onPress={() => {
              navigation.navigate("Chat");
            }}
            filled
            style={styles.cardBtn}
          />
        </View>
      </View>
      <Nav />
    </View>
  );
};
const styles = StyleSheet.create({
  home: {
    flex: 1,
  },
  cards: { marginTop: 40 },
  card: {
    marginHorizontal: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardImg: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
});
export default Home;
