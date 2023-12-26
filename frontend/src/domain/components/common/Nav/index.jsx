import React, { useState } from "react";
import "./style.css";
import Button from "../Button";
function Nav() {
  //for the on click event of the nav elements
  const [activeLink, setActiveLink] = useState("");
  const handleClick = (name) => {
    setActiveLink(name);
  };
  //log in navigation
  const logIn = () => {};
  //sign-up navigation
  const signUp = () => {};

  return (
    <nav className="hero-nav">
      <div className="nav-logo">
        <img src="./images/logo/logo-icon-transparent.png" alt="Home of Pets" />
      </div>
      <ul className="nav-links">
        {["Home", "Adopt", "Shop", "Lost & Found", "Chat with Us"].map(
          (name) => (
            <li key={name}>
              <button
                className={`nav-link ${activeLink === name ? "active" : ""}`}
                onClick={() => handleClick(name)}
              >
                {name}
              </button>
            </li>
          )
        )}
      </ul>

      <div className="nav-auth">
        <Button
          text="LOG-IN"
          handleOnClick={logIn}
          classes={["log-in"]}
          type="button"
        />
        <Button
          text="SIGN-UP"
          handleOnClick={signUp}
          classes={["sign-up"]}
          type="button"
        />
      </div>
    </nav>
  );
}

export default Nav;
