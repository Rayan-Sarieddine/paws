import React, { useEffect, useState } from "react";
import "./style.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from "../Button";
import { useLogin } from "../../../../core/hooks/login.hook";
import UserProfileBtn from "./UserProfileBtn";
import CartButton from "./CartButton";
import { useDispatch, useSelector } from "react-redux";
import { changeLocation } from "../../../../core/dataSource/localDataSource/active_nav";
import PawsLoader from "../PawsLoader";

function Nav() {
  const navigate = useNavigate();
  const location = useLocation();
  //user data from user slice ofredux
  const userData = useSelector((state) => state.User);
  const navData = useSelector((state) => state.active_nav);
  console.log(navData);

  //loggen in hook and its trigger
  const [logoutTrigger, setLogoutTrigger] = useState(0);
  const [isLoggedIn, token] = useLogin(logoutTrigger);

  if (!isLoggedIn) {
    if (location.pathname !== "/") {
      navigate("/login");
    }
  }
  //to show profile menu when user clicks on his image(menu to log out and edit profile)
  const [isProfileMenuHidden, setIsProfileMenuHidden] = useState(true);
  const [isCartMenuHidden, setIsCartMenuHidden] = useState(true);

  //nav navigation

  const dispatch = useDispatch();
  const handleClick = (name) => {
    dispatch(changeLocation({ page: name }));
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

  const logIn = () => {
    navigate("/login");
  };

  //sign-up navigation
  const signUp = () => {
    navigate("/sign-up");
  };

  //control state of profileMenu on click of user image
  const handleOnClickProfile = () => {
    setIsProfileMenuHidden((prev) => !prev);
  };
  const handleOnClickCart = () => {
    setIsCartMenuHidden((prev) => !prev);
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
                className={`nav-link ${navData.page === name ? "active" : ""}`}
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
        <ul className="user-nav-buttons">
          <li>
            <div className="cart-pic" onClick={handleOnClickCart}>
              <img src={"./images/icons/cart.png"} alt="" />
            </div>
            <CartButton
              isCartMenuHidden={isCartMenuHidden}
              setIsCartMenuHidden={setIsCartMenuHidden}
            />
          </li>
          <li>
            <div className="pfp-pic" onClick={handleOnClickProfile}>
              <img
                src={`http://127.0.0.1:8000/images/users/${userData.image}`}
                alt=""
              />
            </div>
            <UserProfileBtn
              isProfileMenuHidden={isProfileMenuHidden}
              setIsProfileMenuHidden={setIsProfileMenuHidden}
              setLogoutTrigger={setLogoutTrigger}
            />
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Nav;
