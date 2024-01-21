import React, { useEffect, useState } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { selectPet } from "../../../../../core/dataSource/localDataSource/pet";
import { useNavigate } from "react-router-dom";

function PetsShow() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleViewClick = (pet) => {
    dispatch(selectPet(pet));
    navigate("/adopt-details");
  };

  const petData = useSelector((state) => state.Pet);

  const [age, setAge] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const petsPerPage = 9;
  const [filter, setFilter] = useState({ type: "all", age: "", status: "" });
  const [filteredPets, setFilteredPets] = useState(petData.pets);

  useEffect(() => {
    let newFilteredPets = petData.pets;

    if (filter.type !== "all") {
      newFilteredPets = newFilteredPets?.filter(
        (pet) => pet.type === filter.type
      );
    }

    if (filter.age) {
      newFilteredPets = newFilteredPets?.filter((pet) => pet.age <= filter.age);
    }

    setFilteredPets(newFilteredPets);
  }, [filter, petData.pets]);

  const indexOfLastPet = currentPage * petsPerPage;
  const indexOfFirstPet = indexOfLastPet - petsPerPage;
  const currentPets = filteredPets?.slice(indexOfFirstPet, indexOfLastPet);

  const handleTypeChange = (e) => {
    setFilter({ ...filter, type: e.target.value });
  };

  const handleAgeChange = (e) => {
    const newAge = parseInt(e.target.value);
    setAge(newAge);
    setFilter({ ...filter, age: newAge });
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  useEffect(() => {}, [currentPets]);
  return (
    <div className="pets-show-container">
      <div className="filters">
        <div className="filter-category">
          <h3>Type</h3>
          <hr></hr>
          <label>
            <input
              type="radio"
              name="type"
              value="all"
              checked={filter.type === "all"}
              onChange={handleTypeChange}
            />
            All
          </label>
          <label>
            <input
              type="radio"
              name="type"
              value="DOGS"
              checked={filter.type === "DOGS"}
              onChange={handleTypeChange}
            />
            Dogs
          </label>
          <label>
            <input
              type="radio"
              name="type"
              value="CATS"
              checked={filter.type === "CATS"}
              onChange={handleTypeChange}
            />
            Cats
          </label>
          <label>
            <input
              type="radio"
              name="type"
              value="FISH"
              checked={filter.type === "FISH"}
              onChange={handleTypeChange}
            />
            Fish
          </label>

          <label>
            <input
              type="radio"
              name="type"
              value="RABBITS"
              checked={filter.type === "RABBITS"}
              onChange={handleTypeChange}
            />
            Rabbits
          </label>
          <label>
            <input
              type="radio"
              name="type"
              value="OTHERS"
              checked={filter.type === "OTHERS"}
              onChange={handleTypeChange}
            />
            Others
          </label>
        </div>
        <div className="filter-category second-filter">
          <h3>Age</h3>
          <hr></hr>
          <input
            type="range"
            id="ageSlider"
            name="ageSlider"
            min={1}
            max={14}
            value={age}
            onChange={handleAgeChange}
          />
          <p>Age to be less than {age}</p>
        </div>
      </div>
      <div className="pet-pagination-main">
        <div className="pet-pagination-header">
          <p>ADOPT</p>
        </div>
        <div className="pet-pagination-controls">
          <button
            className="btn btn-pagination-left"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          <span>{currentPage}</span>
          <button
            className="btn btn-pagination-right"
            onClick={() => paginate(currentPage + 1)}
            disabled={
              currentPage === Math.ceil(petData?.pets?.length / petsPerPage)
            }
          >
            &gt;
          </button>
        </div>
        {currentPets?.length === 0 ? (
          <div className="no-pets-to-show">
            <p>No Pets Found</p>
          </div>
        ) : (
          <div className="pet-pagination-petCards">
            {currentPets?.map((pet, index) => (
              <div key={index} className="pet-pagination-card">
                <img
                  src={`http://localhost:8000/images/pets/${pet.image}`}
                  alt={pet.name}
                />
                <div className="pet-details">
                  <h3>{pet.name}</h3>
                  <p>
                    {pet.description} | {pet.breed}
                  </p>
                  <button
                    className="btn btn-adopt"
                    onClick={() => handleViewClick(pet)}
                  >
                    VIEW
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="pet-pagination-controls">
          <button
            className="btn btn-pagination-left"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          <span>{currentPage}</span>
          <button
            className="btn btn-pagination-right"
            onClick={() => paginate(currentPage + 1)}
            disabled={
              currentPage === Math.ceil(petData?.pets?.length / petsPerPage)
            }
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}

export default PetsShow;
