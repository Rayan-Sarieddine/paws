import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
function Result() {
  const [showYesModal, setShowYesModal] = useState(false);
  const [showNoModal, setShowNoModal] = useState(false);
  const resultyes = () => {
    setShowYesModal(true);
  };
  const resultno = () => {
    setShowNoModal(true);
  };
  const navigate = useNavigate();
  return (
    <div className="result">
      <h3>Match Result Found!</h3>
      <div className="result-comparison">
        <div className="result-comparison-1">
          <img src="./images/Adopt-Page/adopt-page.png" alt="pet_img" />
          <p>Your Pet</p>
        </div>
        <div className="result-comparison-2">
          <img src="./images/Adopt-Page/adopt-page.png" alt="pet_img" />
          <p>Matched Result</p>
        </div>
      </div>
      <div className="result-actions">
        <p>Is this your Pet?</p>
        <button
          className="btn result-yes"
          onClick={() => {
            resultyes();
          }}
        >
          Yes
        </button>
        <button
          className="btn result-no"
          onClick={() => {
            resultno();
          }}
        >
          No
        </button>
      </div>
      {showYesModal && (
        <div className="yes-modal">
          <p className="yes-modal-text">
            That’s great news, to retreive your pet please contact the person
            who reported him lost on:
          </p>
          <p className="yes-modal-phone">+961 76 451 145</p>
        </div>
      )}
      {showNoModal && (
        <div className="no-modal">
          <button
            className="btn"
            onClick={() => {
              navigate("/lost-found-manual");
            }}
          >
            Manual Search
          </button>
        </div>
      )}
    </div>
  );
}

export default Result;
