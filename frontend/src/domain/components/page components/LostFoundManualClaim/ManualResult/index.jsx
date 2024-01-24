import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { useSelector } from "react-redux";

function ManualResult() {
  const selectedPost = useSelector((state) => state.Post.curerntSelected);

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
        <img
          src={`http://localhost:8000/images/posts/${selectedPost.image}`}
          alt="pet_img"
        />
      </div>
      <div className="match-result-pet-info">
        <p>
          Found At: <span>{selectedPost?.location}</span>
        </p>
        <p>
          Description: <span>{selectedPost?.description}</span>
        </p>
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
          <p className="manual-yes-modal-phone">
            {selectedPost.added_by.phone}
          </p>
        </div>
      )}
      {showNoModal && (
        <div className="manual-no-modal">
          <button
            className="btn btn-No"
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
