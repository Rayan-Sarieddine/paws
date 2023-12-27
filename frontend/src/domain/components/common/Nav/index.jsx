import React, { useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from "../Button";
import { useLogin } from "../../../../core/hooks/login.hook";
import UserProfileBtn from "./UserProfileBtn";
import { useSelector } from "react-redux";
function Nav() {
  const userData = useSelector((state) => state.User);
  const [isLoggedIn, token] = useLogin();
  //for the profileimage click to show the menu
  const [isProfileMenuHidden, setIsProfileMenuHidden] = useState(true);
  console.log(userData);
  //for the on click event of the nav elements
  const [activeLink, setActiveLink] = useState("Home");
  const handleClick = (name) => {
    setActiveLink(name);
    switch (name) {
      case "Adopt":
        navigate("/adopt");
        break;
      case "Home":
        navigate("/");
        break;
      case "Shop":
        navigate("/shop");
        break;
      case "Chat with Us":
        navigate("/chat");
        break;
      case "Lost & Found":
        navigate("/lost-found-main");
        break;
      default:
    }
  };
  //log in navigation
  let navigate = useNavigate();
  const logIn = () => {
    navigate("/login");
  };
  //sign-up navigation
  const signUp = () => {
    navigate("/sign-up");
  };

  const handleOnClickProfile = () => {
    setIsProfileMenuHidden((prev) => !prev);
  };
  return (
    <nav className="hero-nav">
      <div className="nav-logo">
        <Link to="/">
          <img
            src="./images/logo/logo-icon-transparent.png"
            alt="Home of Pets"
          />
        </Link>
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
      {!isLoggedIn ? (
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
      ) : (
        <li>
          <div className="pfp-pic" onClick={handleOnClickProfile}>
            <img
              src={`http://127.0.0.1:8000/images/users/${userData.image}`}
              alt=""
            />
          </div>
          <UserProfileBtn isProfileMenuHidden={isProfileMenuHidden} />
        </li>
      )}
    </nav>
  );
}

export default Nav;