import React, { useEffect, useState } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { selectPet } from "../../core/dataSource/localDataSource/pet";
import { useNavigate } from "react-router-dom";
import { petsDataSource } from "../../core/dataSource/remoteDataSource/pets";

function Pets() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [petData, setpetData] = useState();
  const handleViewClick = (pet) => {
    dispatch(selectPet(pet));
    navigate("/adopt-details");
  };
  const getPetData = async () => {
    try {
      const response = await petsDataSource.getPets();
      setpetData(response.pets);
      dispatch(loadPets(petData));
      console.log(response.pets);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getPetData();
  }, []);
  const [age, setAge] = useState(5);

  const [currentPage, setCurrentPage] = useState(1);
  const petsPerPage = 9;
  const [filter, setFilter] = useState({ type: "all", age: "", status: "" });
  const [filteredPets, setFilteredPets] = useState(petData);

  useEffect(() => {
    let newFilteredPets = petData;

    if (filter.type !== "all") {
      newFilteredPets = newFilteredPets?.filter((pet) => pet.type === filter.type);
    }

    if (filter.age) {
      newFilteredPets = newFilteredPets?.filter((pet) => pet.age <= filter.age);
    }

    setFilteredPets(newFilteredPets);
  }, [filter, petData]);

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
        <button
          className="btn btn-add"
          onClick={() => {
            navigate("/add-pet");
          }}
        >
          ADD PET
        </button>
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
              value="dogs"
              checked={filter.type === "dogs"}
              onChange={handleTypeChange}
            />
            Dogs
          </label>
          <label>
            <input
              type="radio"
              name="type"
              value="cats"
              checked={filter.type === "cats"}
              onChange={handleTypeChange}
            />
            Cats
          </label>
          <label>
            <input
              type="radio"
              name="type"
              value="fish"
              checked={filter.type === "fish"}
              onChange={handleTypeChange}
            />
            Fish
          </label>

          <label>
            <input
              type="radio"
              name="type"
              value="rabbits"
              checked={filter.type === "rabbits"}
              onChange={handleTypeChange}
            />
            Rabbits
          </label>
          <label>
            <input
              type="radio"
              name="type"
              value="others"
              checked={filter.type === "others"}
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
            disabled={currentPage === Math.ceil(petData?.length / petsPerPage)}
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
                <img src={`http://localhost:8000/images/pets/${pet.image}`} alt={pet.name} />
                <div className="pet-details">
                  <h3>{pet.name}</h3>
                  <p>
                    {pet.description} | {pet.breed}
                  </p>
                  <button className="btn-edit" onClick={() => handleViewClick(pet)}>
                    EDIT
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
            disabled={currentPage === Math.ceil(petData?.length / petsPerPage)}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pets;
