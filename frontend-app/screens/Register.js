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
  // Input states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassworde] = useState("");

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle input change and set the state accordingly
  const handleInputChange = (name, value) => {
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassworde(value);
    }
  };

  // Function to handle register submit
  const registerHandle = async () => {
    // Empty fields check
    if (name === "" || email === "" || password === "") {
      setError("All field are required");
      return;
    }
    // Password validation
    if (password.length < 5) {
      setError("Password must be at least 5 characters long");
      return;
    }

    // Name refactor
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
      // Sending request
      const response = await authDataSource.register(data);

      if (response.status === "success") {
        // Resetting states
        setName("");
        setEmail("");
        setPassworde("");
        setIsLoading(false);
        setMessage("Success");
        // Navigation to login screen
        setTimeout(() => {
          navigation.navigate("Login");
        }, 3000);
      }
      // Error handling
    } catch (err) {
      setIsLoading(false);

      setError(err.response.data.message || "An error occurred");
    }
  };

  // Reseting the error amd message states after 3 seconds from setting them
  useEffect(() => {
    setTimeout(() => {
      setError("");
      setMessage("");
    }, 3000);
  }, [error, message]);

  return (
    <SafeAreaView style={styles.register}>
      <PageContainer>
        <View style={styles.registerMain}>
          <Image source={images.logo} style={styles.registerLogo} />
          {message && <Text style={styles.message}>{message}</Text>}

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
            placeholder="Enter your password"
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
              width: 300,
              marginBottom: SIZES.padding,
              marginVertical: 8,
            }}
          />
          <View style={styles.registerCta}>
            <Text style={styles.alreadyText}>Already have an account?</Text>
            <Text
              style={styles.loginCta}
              onPress={() => navigation.navigate("Login")}
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

// Styles
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
  message: {
    color: COLORS.green,
    fontSize: 10,
    marginTop: 10,
  },
});

export default Register;
