import React, { useEffect, useState } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { authDataSource } from "../../../core/dataSource/remoteDataSource/auth";
function ForgotPassword() {
  const navigateTo = useNavigate();

  //state to store form related data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
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
    if (password.length < 5) {
      setError("Password too short");
      return;
    }
    //data to be send of body of request
    let data = { email: email, password: password };
    try {
      //axios request
      const response = await authDataSource.forgotPassword(data);

      setMessage("Sucessfully updated password");
      setTimeout(() => {
        navigateTo("/login");
      }, 2000);
    } catch (error) {
      setError(error.response.data.message);
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
          <img src="./favicon.png" alt="logo" />

          <h2 className="log-cart-title">forgot password</h2>

          <div className="sign-up-part">
            <p>Back to</p>
            <Link to="/login">
              <h4>Login</h4>
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
              <i>New Password</i>
            </div>

            {error && <p className="error">{error}</p>}
            {message && <p className="message">{message}</p>}
            <div className="inputBox">
              <input type="submit" value="Reset Password" />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ForgotPassword;
