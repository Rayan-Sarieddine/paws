import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css"; // Assuming you have a CSS file for styles

const LogIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(username, password);
  };

  return (
    <section className="login-section">
      {Array.from({ length: 128 }, (_, i) => (
        <span key={i}></span>
      ))}
      <div className="signin">
        <div className="content">
          <img src="./favicon.png" alt="logo" />
          <h2>log in</h2>
          <div className="sign-up-part">
            <p>New Member?</p>
            <h4>Signup</h4>
          </div>
          <form className="form" onSubmit={handleSubmit}>
            <div className="inputBox">
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <i>Username</i>
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

            <p className="forgot-password_link">Forgot Password</p>

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
