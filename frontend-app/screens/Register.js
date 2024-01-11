import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, images, FONTS, SIZES } from "../constants";
import PageContainer from "../components/PageContainer";
import Button from "../components/Button";
import { authDataSource } from "../core/dataSource/remoteDataSource/auth";

const Register = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassworde] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleInputChange = (name, value) => {
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassworde(value);
    }
  };
  const registerHandle = async () => {
    if (name === "" || email === "" || password === "") {
      setError("All field are required");
      return;
    }
    if (password < 5) {
      setError("Password must be at least 5 characters long");
      return;
    }
    const trimmedName = name.trim();
    const hasValidName = /^\S(.*\s+.*)*\S$/.test(trimmedName); // Name to be having at least one space in middle (first name and last name)
    if (!hasValidName) {
      setError("Please enter full name");
      return;
    }
    setIsLoading(true);
    let data = {
      name: name,
      email: email,
      password: password,
    };
    try {
      const response = await authDataSource.register(data);
      console.log(response);
      setIsLoading(false);
    } catch (err) {
      setError(err.message || "An error occurred");
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setError("");
    }, 3000);
  }, [error]);
  return (
    <SafeAreaView style={styles.register}>
      <PageContainer>
        <View style={styles.registerMain}>
          <Image source={images.logo} style={styles.registerLogo} />
          <Text style={[FONTS.body4, styles.welcome]}>Welcome!</Text>
          <TextInput
            placeholder="Enter your full name"
            style={styles.input}
            value={name}
            onChangeText={(value) => handleInputChange("name", value)}
          ></TextInput>

          <TextInput
            placeholder="Enter your email"
            style={styles.input}
            value={email}
            onChangeText={(value) => handleInputChange("email", value)}
          ></TextInput>

          <TextInput
            secureTextEntry={true}
            placeholder="Enter your Password"
            style={styles.input}
            value={password}
            onChangeText={(value) => handleInputChange("password", value)}
          ></TextInput>
          <Button
            title="Register"
            onPress={registerHandle}
            isLoading={isLoading}
            filled
            style={{
              width: SIZES.width - 44,
              marginBottom: SIZES.padding,
              marginVertical: 8,
            }}
          />
          <View style={styles.registerCta}>
            <Text style={styles.alreadyText}>Already have an account?</Text>
            <Text
              style={styles.loginCta}
              onPress={() => navigation.navigate("Logon")}
            >
              Login
            </Text>
          </View>
          {error && <Text style={styles.error}>{error}</Text>}
        </View>
      </PageContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  register: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  registerMain: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 22,
  },
  registerLogo: {
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
  registerCta: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  loginCta: {
    color: COLORS.primary,
  },
  error: {
    color: COLORS.red,
    fontSize: 10,
    marginTop: 10,
  },
});

export default Register;
