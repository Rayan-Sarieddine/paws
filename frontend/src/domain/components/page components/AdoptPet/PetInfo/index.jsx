import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { requestsDataSource } from "../../../../../core/dataSource/remoteDataSource/requests";

function PetInfo() {
  const navigate = useNavigate();
  const selectedPet = useSelector((state) => state.Pet.curerntSelected);
  const [showModal, setShowModal] = useState(false);

  const handleAdoptClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirmAdoption = async () => {
    try {
      await requestsDataSource.requestAdoption({ pet_id: selectedPet._id });
      navigate("/adopt-request");
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
    setShowModal(false);
  };
  return (
    <div className="pet-info-container">
      {Object.keys(selectedPet).length === 0 ? (
        <p className="no-pet-selected">No pet selected</p>
      ) : (
        <>
          <h2>{selectedPet.breed}</h2>
          <p className="pet-breed-info">{selectedPet.breed_description}</p>
          <img
            className="pet-image"
            src={`http://localhost:8000/images/pets/${selectedPet.image}`}
            alt={`${selectedPet.name}`}
          />
          <h2>PET STORY</h2>
          <p className="pet-story-info">{selectedPet.story}</p>
          <h2>PET INFORMATION</h2>
          <div className="pet-info-details">
            <div className="pet-info-detail">
              <h4>Type:</h4>
              <p>{selectedPet.type}</p>
            </div>
            <div className="pet-info-detail">
              <h4>Breed:</h4>
              <p>{selectedPet.breed}</p>
            </div>
            <div className="pet-info-detail">
              <h4>Name:</h4>
              <p>{selectedPet.name}</p>
            </div>
            <div className="pet-info-detail">
              <h4>Age:</h4>
              <p>{selectedPet.age}</p>
            </div>
            <div className="pet-info-detail">
              <h4>Status:</h4>
              <p>{selectedPet.status}</p>
            </div>
          </div>
          <button className="btn adopt-button" onClick={handleAdoptClick}>
            ADOPT
          </button>
          <button
            className="btn back-button"
            onClick={() => {
              navigate("/adopt-all");
            }}
          >
            BACK
          </button>
          {showModal && (
            <div className="modal">
              <div className="modal-content">
                <div>
                  <p>
                    Are you sure you want to send an adoption request for{" "}
                    {selectedPet.name}?
                  </p>
                  <button
                    className="btn confirm-adoption-btn"
                    onClick={handleConfirmAdoption}
                  >
                    Confirm
                  </button>
                </div>
                <span className="close-btn" onClick={handleCloseModal}>
                  &times;
                </span>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default PetInfo;
