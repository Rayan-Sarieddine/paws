import { View, Text, StyleSheet, Image, TextInput } from "react-native";
import React, { useState } from "react";
import { COLORS, FONTS, SIZES, images } from "../constants";
import { SafeAreaView } from "react-native-safe-area-context";
import PageContainer from "../components/PageContainer";
import Button from "../components/Button";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

const AddPet = () => {
  const navigation = useNavigation();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [type, setType] = useState("");
  const [image, setimage] = useState("");
  const [tracker, setTracker] = useState("");

  const [isLoading, setisLoading] = useState(false);

  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleInputChange = (name, value) => {
    if (name === "name") {
      setName(value);
    } else if (name === "date_of_birth") {
      setDateOfBirth(value);
    } else if (name === "type") {
      setType(value);
    } else if (name === "tracker") {
      setTracker(value);
    }
  };
  const addHandle = async () => {
    if (email === "" || password === "") {
      setError("All field are required");
      return;
    }
  };
  return (
    <SafeAreaView style={styles.addPet}>
      <PageContainer>
        <View style={styles.addPetMain}>
          <Image source={images.logo} style={styles.addPetLogo} />
          {message && <Text style={styles.message}>{message}</Text>}
          <Text style={[FONTS.body4, styles.welcome]}>Add Pet's Info</Text>
          <TextInput
            placeholder="Name:"
            style={styles.input}
            value={name}
            onChangeText={(value) => handleInputChange("name", value)}
          ></TextInput>
          <TextInput
            placeholder="Birthday(YYYY-MM-DD):"
            style={styles.input}
            value={dateOfBirth}
            onChangeText={(value) => handleInputChange("date_of_birth", value)}
          ></TextInput>

          <TextInput
            placeholder="Species:"
            style={styles.input}
            value={type}
            onChangeText={(value) => handleInputChange("type", value)}
          ></TextInput>
          <TextInput
            placeholder="Tracker #:"
            style={styles.input}
            value={tracker}
            onChangeText={(value) => handleInputChange("tracker", value)}
            keyboardType="numeric"
          ></TextInput>
          <Button
            title="Add Pet"
            onPress={addHandle}
            isLoading={isLoading}
            filled
            style={{
              width: SIZES.width - 44,
              marginBottom: SIZES.padding,
              marginVertical: 8,
            }}
          />

          {error && <Text style={styles.error}>{error}</Text>}
        </View>
      </PageContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  addPet: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  addPetMain: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 22,
  },
  addPetLogo: {
    height: 120,
    width: 120,
    marginBottom: 22,
  },
  input: {
    fontSize: 14,
    height: 65,
    width: 300,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#e5e5e5",
    marginTop: 10,
    padding: 15,
    marginBottom: 5,
  },
  error: {
    color: COLORS.red,
    fontSize: 10,
    marginTop: 10,
  },
  message: {
    color: COLORS.green,
    fontSize: 10,
    marginTop: 10,
  },
  datePicker: {
    width: 300,
  },
});

export default AddPet;
