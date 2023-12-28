import React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function Animals() {
  const navigate = useNavigate();
  const petsData = useSelector((state) => {
    return state.Pet;
  });
  const length = 4;
  console.log(petsData, "wsjiwjs");
  return (
    <div className="animals-section">
      <div className="animals-section_header">
        <div className="animals-section_header_img">
          <img src="./favicon.png" alt="logo" />
        </div>
        <p>ADOPT YOUR NEW BESTFRIREND</p>
        <h2>Animals Waiting for Adoption</h2>
      </div>
      <div className="animals-section_body">
        {petsData?.pets?.slice(0, length).map((pet) => {
          return (
            <div className="animals-section_petCard">
              <div className="animals-section_petCard_img">
                <img
                  src={`http://127.0.0.1:8000/images/pets/${pet.image}`}
                  alt="pet"
                />
              </div>
              <div className="petCard-birthInfo">
                <p>Age: </p>
                <p>{pet.age}</p>
              </div>
              <div className="petCard-BreedInfo">
                <p>{pet.breed}</p>
              </div>
              <div className="petCard-StoryInfo">
                <p>{pet.story}</p>
              </div>
              <div className="center-div">
                <button
                  className="btn petCard-btn"
                  onClick={() => {
                    navigate("/adopt-all");
                  }}
                >
                  LEARN MORE
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="center-div">
        <button
          className="btn"
          onClick={() => {
            navigate("/adopt-all");
          }}
        >
          BROWSE ALL PETS
        </button>
      </div>
    </div>
  );
}

export default Animals;
