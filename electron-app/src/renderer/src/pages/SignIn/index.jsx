import React, { useEffect, useState } from "react";
import "./style.css";

//router dependencies
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

//remote data storage dependencies
import { authDataSource } from "../../core/dataSource/remoteDataSource/auth";

//local data storage dependencies and helpers
import { loggedIn } from "../../core/dataSource/localDataSource/user";
import { local } from "../../core/helpers/localstorage";
import { useDispatch } from "react-redux";

const LogIn = () => {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  //state to store form related data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  //to show error for 2 seconds then reset error state
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
    if (message) {
      setTimeout(() => {
        setMessage("");
      }, 2000);
    }
  }, [error, message]);

  //handle login form submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    //data to be send of body of request
    let data = { email: email, password: password };
    try {
      //acios request
      const response = await authDataSource.login(data);
      //setting local storage data
      local("token", response.token);
      local("type", response.user.userType);
      if (response.user.userType !== "ADMIN") {
        setError("Unauthorized");
        return;
      }
      //setting user slice
      dispatch(
        loggedIn({
          email: response.user.email,
          name: response.user.name,
          address: response.user.address,
          phone: response.user.phone,
          userType: response.user.userType,
          chatSessions: response.user.chatSessions,
          cart: response.user.cart,
          image: response.user.image,
          token: response.token
        })
      );
      console.log("logged in");
      navigateTo("/orders");
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  return (
    <section className="login-section">
      {/* Each item of array represents a span box, 128 is needed, 100 extra to take account for bigger screens and resizing */}
      {Array.from({ length: 228 }, (_, i) => (
        <span key={i}></span>
      ))}
      <div className="signin">
        <div className="content">
          <img src="./src/assets/images/favicon.png" alt="logo" />

          <h2 className="log-cart-title">log in</h2>

          <form className="form" onSubmit={handleSubmit}>
            <div className="inputBox">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <i>email</i>
            </div>
            <div className="inputBox">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <i>Password</i>
            </div>

            {error && <p className="error">{error}</p>}
            {message && <p className="message">{message}</p>}
            <div className="inputBox">
              <input type="submit" value="Login" />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LogIn;
