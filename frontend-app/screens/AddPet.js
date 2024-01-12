import { View, Text, StyleSheet, Image, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, FONTS, SIZES, images } from "../constants";
import { SafeAreaView } from "react-native-safe-area-context";
import PageContainer from "../components/PageContainer";
import Button from "../components/Button";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { trackerDataSource } from "../core/dataSource/remoteDataSource/tracker";
import { petDataSource } from "../core/dataSource/remoteDataSource/pet";

const AddPet = () => {
  const navigation = useNavigation();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState("");
  const [tracker, setTracker] = useState("");

  const [isLoading, setisLoading] = useState(false);

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
    if (
      name === "" ||
      dateOfBirth === "" ||
      type === "" ||
      image === "" ||
      tracker === ""
    ) {
      setError("All field are required");
      return;
    }
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (!dateRegex.test(dateOfBirth)) {
      setError("Invalid date format. Please use YYYY-MM-DD.");
      return;
    }
    const dOB = new Date(dateOfBirth);
    const currentDate = new Date();

    if (dOB > currentDate) {
      setError("Date cannot be in the future");
      return;
    }
    try {
      let data = {
        tracker_id: tracker,
      };
      const response = await trackerDataSource.getTracker(data);
      if (response.message === "success") {
        let data = {
          name: name,
          image: image,
          type: type,
        };
        const response = await petDataSourceDataSource.getTracker(data);
      }
    } catch (err) {
      setError(err.response.data.message);
    }
  };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      setImage(result.assets[0].uri);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setError("");
      setMessage("");
    }, 3000);
  }, [error, message]);
  return (
    <SafeAreaView style={styles.addPet}>
      <PageContainer>
        <View style={styles.addPetMain}>
          <Image source={images.logo} style={styles.addPetLogo} />
          {message && <Text style={styles.message}>{message}</Text>}
          <Text style={[FONTS.body4, styles.welcome]}>Add Pet's Info</Text>
          <Button
            title="Add image"
            onPress={pickImage}
            style={styles.imageBtn}
          />
          {image && <Text style={styles.imageAdded}>Image added</Text>}
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
            keyboardType="numeric"
          ></TextInput>

          <TextInput
            placeholder="Species:"
            style={styles.input}
            value={type}
            onChangeText={(value) => handleInputChange("type", value)}
          ></TextInput>
          <TextInput
            placeholder="Tracker nb:"
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
  imageBtn: {
    marginVertical: 10,
  },
  imageAdded: {
    color: COLORS.green,
    fontSize: 8,
    textTransform: "uppercase",
  },
});

export default AddPet;
