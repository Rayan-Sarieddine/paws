import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { useSelector } from "react-redux";
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
  const matchPet = useSelector((state) => {
    return state.Post.resultPosts[0];
  });
  console.log(matchPet);
  return (
    <div className="result">
      <h3>Match Result Found!</h3>
      <div className="result-pet">
        <div className="result-pet-img">
          <img
            src={`http://localhost:8000/images/posts/${matchPet.image}`}
            alt="pet_img"
          />
        </div>
        <div className="result-pet-info">
          <p>
            Found At: <span>{matchPet?.location}</span>
          </p>
          <p>
            Description: <span>{matchPet?.description}</span>
          </p>
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
          <p className="yes-modal-phone">{matchPet?.added_by?.phone}</p>
        </div>
      )}
      {showNoModal && (
        <div className="no-modal">
          <button
            className="btn"
            onClick={() => {
              navigate("/lost-found-reporting");
            }}
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
}

export default Result;
