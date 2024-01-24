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
import { local } from "../core/helpers/localstorage";
import { useDispatch } from "react-redux";
import { loadPet } from "../core/dataSource/localDataSource/pet";
import { loadTracker } from "../core/dataSource/localDataSource/tracker";

const AddPet = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setisLoading] = useState(false);

  // User data states
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [type, setType] = useState("");
  const [tracker, setTracker] = useState("");

  // Img states
  const [localUri, setLocalUri] = useState("");
  const [filename, setFilename] = useState("");
  const [typeImg, setTypeImg] = useState("");

  // Function to handle input change and set the state accordingly
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

  // Function to handle submit adding a new pet
  const addHandle = async () => {
    // Input empty check
    if (
      name === "" ||
      dateOfBirth === "" ||
      type === "" ||
      localUri === "" ||
      tracker === ""
    ) {
      setError("All field are required");
      return;
    }

    //Date validation
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
      //Sending Data
      let data = {
        secret: tracker,
      };
      const response = await trackerDataSource.getTracker(data);
      if (response.message === "success") {
        const token = await local("token");
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        // sending image
        const formData = new FormData();

        formData.append("image", {
          uri: localUri,
          name: filename,
          type: typeImg,
        });
        formData.append("date_of_birth", dateOfBirth);
        formData.append("type", type);
        formData.append("name", name);

        const response = await fetch("http://192.168.210.16:8000/pets/", {
          method: "POST",
          body: formData,
          headers: { ...headers },
        });
        const responseData = await response.json();
        if (responseData.status === "success") {
          // Setting the tracker of the pet in backend and redux
          const response2 = await trackerDataSource.setTrackerPet({
            pet_id: responseData.pet.id,
            secret: tracker,
          });
          dispatch(loadTracker({ secret: tracker }));
          // resetting states
          setName("");
          setDateOfBirth("");
          setType("");
          setTracker("");
          setLocalUri("");
          setFilename("");
          setTypeImg("");
          setMessage("Success");
          // Navigation to home screen
          setTimeout(() => {
            navigation.navigate("Home");
          }, 2000);
        }
      }
      // Error handling
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        console.error(err);
        setError("An error occurred while adding the pet.");
      }
    }
  };

  // Function to allow user to choose image of his pet
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (result.canceled || !result.assets) {
      setError("Image selection was cancelled or no image was selected.");
      return;
    }
    setLocalUri(result.assets[0].uri);
    setFilename(result.assets[0].uri.split("/").pop());
    let match = /\.(\w+)$/.exec(result.assets[0].uri);
    setTypeImg(match ? `image/${match[1]}` : `image`);
  };

  // Reseting the error amd message states after 3 seconds from setting them
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
          {localUri && <Text style={styles.imageAdded}>Image added</Text>}
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
            placeholder="Tracker Code:"
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
              width: 300,
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

// Styles
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
