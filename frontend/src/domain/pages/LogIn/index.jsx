import React, { useEffect, useState } from "react";
import "./style.css";

//router dependencies
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

//remote data storage dependencies
import { authDataSource } from "../../../core/dataSource/remoteDataSource/auth";

//local data storage dependencies and helpers
import { loggedIn } from "../../../core/dataSource/localDataSource/user";
import { local } from "../../../core/helpers/localstorage";
import { useDispatch } from "react-redux";
// const GOOGLE_CLIENT_ID =
//   "80417416444-mc1emnb4r8o1eph2f3note9p7vubvlen.apps.googleusercontent.com";
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

      //setting user slice
      dispatch(
        loggedIn({
          email: response.user.email,
          user_id: response.user._id,
          name: response.user.name,
          address: response.user.address,
          phone: response.user.phone,
          userType: response.user.userType,
          chatSessions: response.user.chatSessions,
          cart: response.user.cart,
          image: response.user.image,
          token: response.token,
        })
      );

      navigateTo("/");
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  const forgotPassword = () => {
    if (!email) {
      setError("please eter your email first");
      return;
    }
    setMessage("Password Reset link is sent");
  };
  // useEffect(() => {
  //   // Initialize Google sign-in client
  //   window.gapi.load("auth2", () => {
  //     window.gapi.auth2.init({ client_id: GOOGLE_CLIENT_ID });
  //   });
  // }, []);
  // const handleGoogleLogin = async () => {
  //   try {
  //     const auth2 = window.gapi.auth2.getAuthInstance();
  //     const googleUser = await auth2.signIn();

  //     const id_token = googleUser.getAuthResponse().id_token;
  //     // to send this token to your backend for verification and further processing
  //     try {
  //       const response = await authDataSource.googleAuth({ token: id_token });
  //       console.log(response);
  //     } catch (innerError) {
  //       console.error("Error in sending token to backend:", innerError);
  //     }
  //   } catch (error) {
  //     console.error("Google Sign-In error:", error);
  //   }
  // };
  return (
    <section className="login-section">
      {/* Each item of array represents a span box, 128 is needed, 100 extra to take account for bigger screens and resizing */}
      {Array.from({ length: 228 }, (_, i) => (
        <span key={i}></span>
      ))}
      <div className="signin">
        <div className="content">
          <img src="./favicon.png" alt="logo" />

          <h2 className="log-cart-title">log in</h2>

          <div className="sign-up-part">
            <p>New Member?</p>
            <Link to="/sign-up">
              <h4>Signup</h4>
            </Link>
          </div>
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

            <p className="forgot-password_link" onClick={forgotPassword}>
              Forgot Password
            </p>
            {/* <div className="inputBox">
              <button onClick={handleGoogleLogin}>Sign in with Google</button>
            </div> */}
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
