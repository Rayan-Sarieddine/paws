import React from "react";
import "./styles.css";
import { Link, useNavigate } from "react-router-dom";

const UserProfileBtn = ({ isProfileMenuHidden }) => {
  const handleOnClick = () => {};
  return (
    <div
      className={
        isProfileMenuHidden ? "pfp-drop-down" : "pfp-drop-down pfp-show"
      }
    >
      <Link to={"/edit-profile"} className="pfp-drop-down-item">
        Edit Profile
      </Link>
      <Link className="pfp-drop-down-item" onClick={handleOnClick}>
        Log out
      </Link>
    </div>
  );
};

export default UserProfileBtn;
