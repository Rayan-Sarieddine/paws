import { View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import Nav from "../components/Nav";
import { useSelector } from "react-redux";
import { petDataSource } from "../core/dataSource/remoteDataSource/pet";

const Home = () => {
  const user = useSelector((state) => {
    return state.User;
  });
  const getUserPet = async () => {
    try {
      const response = await petDataSource.getPet(user.user_id);
      console.log("====================================");
      console.log(response, "fh");
      console.log("====================================");
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
