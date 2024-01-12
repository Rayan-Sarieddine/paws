import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Nav from "../components/Nav";
import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state) => {
    return state.User;
  });
  console.log("====================================");
  console.log(user);
  console.log("====================================");
  const getUserPet = async () => {
    try{
      const response=await 
    }catch(err){
      console.log(err)
    }
  };
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
