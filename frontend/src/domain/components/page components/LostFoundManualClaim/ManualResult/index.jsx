import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
function ManualResult() {
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
    <div className="manual-result">
      <div className="manual-result-comparison">
        <img src="./images/Adopt-Page/adopt-page.png" alt="pet_img" />
      </div>
      <div className="manual-result-actions">
        <p>Is this your Pet?</p>
        <button
          className="btn manual-result-yes"
          onClick={() => {
            resultyes();
          }}
        >
          Yes
        </button>
        <button
          className="btn manual-result-no"
          onClick={() => {
            resultno();
          }}
        >
          No
        </button>
      </div>
      {showYesModal && (
        <div className="manual-yes-modal">
          <p className="manual-yes-modal-text">
            That’s great news, to retreive your pet please contact the person
            who reported him lost on:
          </p>
          <p className="manual-yes-modal-phone">+961 76 451 145</p>
        </div>
      )}
      {showNoModal && (
        <div className="manual-no-modal">
          <button
            className="btn"
            onClick={() => {
              navigate("/lost-found-manual");
            }}
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
}

export default ManualResult;
