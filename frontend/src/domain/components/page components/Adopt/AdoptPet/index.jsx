import React, { useEffect, useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { petsDataSource } from "../../../../../core/dataSource/remoteDataSource/pets";
import { loadPets } from "../../../../../core/dataSource/localDataSource/pet";
function AdoptPet() {
  const navigate = useNavigate();
  const [petStats, sePetStats] = useState([]);
  const petsData = useSelector((state) => state.Pet);
  console.log("swjbw", petsData);
  const stats = {
    totalNumberOfAdoptedPets: 0,
    totalNumberOfAvailablePets: 0,
    totalNumberOfLostPets: 0,
    totalNumberOfFoundPets: 0,
    totalNumberOfPetsByType: {},
  };

  petsData.pets?.forEach((pet) => {
    if (pet.status === "ADOPTED") {
      stats.totalNumberOfAdoptedPets++;
    } else if (pet.status === "AVAILABLE") {
      stats.totalNumberOfAvailablePets++;
    } else if (pet.status === "LOST") {
      stats.totalNumberOfLostPets++;
    } else if (pet.status === "FOUND") {
      stats.totalNumberOfFoundPets++;
    }

    if (stats.totalNumberOfPetsByType[pet.type]) {
      stats.totalNumberOfPetsByType[pet.type]++;
    } else {
      stats.totalNumberOfPetsByType[pet.type] = 1;
    }
  });
  console.log(stats);
  return (
    <div className="adopt-pet">
      <div className="adopt-pet-main">
        <div className="adopt-pet-main-left">
          <p>adopt</p>
          <h2>Your new best friend is just a tail wag away!"</h2>
          <h3>
            Help yourself find a new bestfriend and help an animal find a new
            forever home
          </h3>
          <ul>
            <li>
              <img src="./images/Adopt-Page/check-mark.png" alt="check-mark" />
              <p>All pets Vaccinated</p>
            </li>
            <li>
              <img src="./images/Adopt-Page/check-mark.png" alt="check-mark" />
              <p>All Trained to love</p>
            </li>
          </ul>
        </div>
        <div className="adopt-pet-main-right">
          <div className="adopt-pet-main-right-img">
            <img
              src="./images/Adopt-Page/adopt-page.png"
              alt="picture_of_pets_looking_up"
            />
          </div>
          <div className="adopt-pet-main-right_content">
            <p>| Pet Adoption</p>
            <h2>Available Pets for Adoption</h2>
            <h3>
              Choose between a wide variety of pets the one that best matches
              you!
            </h3>
            <button
              className="btn adopt-pet-main-right_content_btn"
              onClick={() => {
                navigate("/adopt-all");
              }}
            >
              browse pets
            </button>
          </div>
        </div>
      </div>
      <div className="adopt-pet-footer">
        {Object.entries(stats?.totalNumberOfPetsByType || {}).map(
          ([petType, count]) => (
            <div className="pet-type-card" key={petType}>
              <p className="adopt-pet-footer_value">{`${count}`}</p>
              <p>{`${petType}s`}</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default AdoptPet;
