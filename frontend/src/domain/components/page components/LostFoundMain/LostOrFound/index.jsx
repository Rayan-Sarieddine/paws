import React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
function LostOrFound() {
  const navigate = useNavigate();
  return (
    <div className="lostorfound">
      <p className="lostorfound-title">Lost & Found?</p>
      <h3 className="lostorfound-text">Lost or Found?</h3>
      <div className="lostorfound-btns">
        <button
          className="btn lost-btn"
          onClick={() => {
            navigate("/lost-found-reporting");
          }}
        >
          Lost a Pet
        </button>
        <button
          className="btn found-btn"
          onClick={() => {
            navigate("/found-reporting");
          }}
        >
          Found a Pet
        </button>
      </div>
    </div>
  );
}

export default LostOrFound;
