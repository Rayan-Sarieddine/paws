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
import { local } from "../core/helpers/localstorage";
import { useDispatch } from "react-redux";
import { loggedIn } from "../core/dataSource/localDataSource/user";

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassworde] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleInputChange = (name, value) => {
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassworde(value);
    }
  };
  const loginHandle = async () => {
    if (email === "" || password === "") {
      setError("All field are required");
      return;
    }

    setIsLoading(true);
    let data = {
      email: email,
      password: password,
    };
    try {
      const response = await authDataSource.login(data);

      if (response.status === "success") {
        local("token", response.token);
        dispatch(
          loggedIn({
            email: response.user.email,
            user_id: response.user.id,
            name: response.user.name,
            token: response.token,
          })
        );
        setEmail("");
        setPassworde("");
        setIsLoading(false);
        setMessage("Success");
        setTimeout(() => {
          navigation.navigate("Home");
        }, 3000);
      }
    } catch (err) {
      setIsLoading(false);
      setError(err.response.data.message || "An error occurred");
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setError("");
      setMessage("");
    }, 3000);
  }, [error, message]);
  return (
    <SafeAreaView style={styles.login}>
      <PageContainer>
        <View style={styles.loginMain}>
          <Image source={images.logo} style={styles.loginLogo} />
          {message && <Text style={styles.message}>{message}</Text>}

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
            title="Login"
            onPress={loginHandle}
            isLoading={isLoading}
            filled
            style={{
              width: 300,
              marginBottom: SIZES.padding,
              marginVertical: 8,
            }}
          />
          <View style={styles.loginCtas}>
            <Text style={styles.alreadyText}>Don’t have an account?</Text>
            <Text
              style={styles.loginCta}
              onPress={() => navigation.navigate("Register")}
            >
              Register
            </Text>
          </View>
          {error && <Text style={styles.error}>{error}</Text>}
        </View>
      </PageContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  login: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  loginMain: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 22,
  },
  loginLogo: {
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
  loginCtas: {
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

export default Login;
