import React, { useEffect, useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
//remote data storage dependencies
import { authDataSource } from "../../../core/dataSource/remoteDataSource/auth";

//local data storage dependencies and helpers
import { loggedIn } from "../../../core/dataSource/localDataSource/user";
import { local } from "../../../core/helpers/localstorage";

function SignUp() {
  const navigateTo = useNavigate();
  //state to store form related data
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConformPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    //check if user is already logged in
    const token = local("token");
    if (token) {
      navigateTo("/");
    }
    if (error) {
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  }, [error]);

  //handle login form submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    //data to be send of body of request
    let data = { email: email, password: password };
    try {
      //acios request
      const response = await authDataSource.register(data);

      navigateTo("/login");
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  return <div>SignUp</div>;
}

export default SignUp;
