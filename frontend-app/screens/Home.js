import { View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import Nav from "../components/Nav";
import { useDispatch, useSelector } from "react-redux";
import { petDataSource } from "../core/dataSource/remoteDataSource/pet";
import { useNavigation } from "@react-navigation/native";
import { loadPet } from "../core/dataSource/localDataSource/pet";
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
  useEffect(() => {}, [getUserPet()]);
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
