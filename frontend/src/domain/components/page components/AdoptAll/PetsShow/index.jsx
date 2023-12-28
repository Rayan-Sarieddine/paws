import React, { useState } from "react";
import "./style.css";
import { useSelector } from "react-redux";

function PetsShow() {
  const petData = useSelector((state) => state.Pet);
  const [currentPage, setCurrentPage] = useState(1);
  const petsPerPage = 9;
  const indexOfLastPet = currentPage * petsPerPage;
  const indexOfFirstPet = indexOfLastPet - petsPerPage;
  const currentPets = petData?.pets.slice(indexOfFirstPet, indexOfLastPet);
  const [filter, setFilter] = useState({ type: "", age: "", status: "" });
  const handleTypeChange = (e) => {
    setFilter({ ...filter, type: e.target.value });
  };

  const handleAgeChange = (e) => {
    setFilter({ ...filter, age: e.target.value });
  };
  const handleStatusChange = (e) => {
    setFilter({ ...filter, status: e.target.value });
  };
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const filterData = () => {};

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
              value="dog"
              checked={filter.type === "dog"}
              onChange={handleTypeChange}
            />
            Dogs
          </label>
          <label>
            <input
              type="radio"
              name="type"
              value="cat"
              checked={filter.type === "cat"}
              onChange={handleTypeChange}
            />
            Cats
          </label>
          <label>
            <input
              type="radio"
              name="type"
              value="other"
              checked={filter.type === "other"}
              onChange={handleTypeChange}
            />
            Others
          </label>
        </div>
        <div className="filter-category second-filter">
          <h3>Age</h3>
          <hr></hr>
          <label>
            <input
              type="radio"
              name="age"
              value="puppy_kitten"
              checked={filter.age === "puppy_kitten"}
              onChange={handleAgeChange}
            />
            Puppy/Kitten
          </label>
          <label>
            <input
              type="radio"
              name="age"
              value="young"
              checked={filter.age === "young"}
              onChange={handleAgeChange}
            />
            Young
          </label>
          <label>
            <input
              type="radio"
              name="age"
              value="adult"
              checked={filter.age === "adult"}
              onChange={handleAgeChange}
            />
            Adult
          </label>
          <label>
            <input
              type="radio"
              name="age"
              value="senior"
              checked={filter.age === "senior"}
              onChange={handleAgeChange}
            />
            Senior
          </label>
        </div>
        <button className="btn btn-filter" onClick={filterData()}>
          Filter
        </button>
      </div>
      <div className="pet-pagination-main">
        <div className="pet-pagination-header">
          <p>ADOPT</p>
          <div className="pet-pagination-header_filter">
            <p>Show</p>
          </div>
        </div>
        <div className="pet-pagination-controls">
          <button
            className="btn btn-pagination-left"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt;
          </button>

          <button
            className="btn btn-pagination-right"
            onClick={() => paginate(currentPage + 1)}
            disabled={
              currentPage === Math.ceil(petData?.pets.length / petsPerPage)
            }
          >
            &gt;
          </button>
        </div>
        <div className="pet-pagination-petCards">
          {currentPets.map((pet, index) => (
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
                <button className="btn btn-adopt">VIEW</button>
              </div>
            </div>
          ))}
        </div>
        <div className="pet-pagination-controls">
          <button
            className="btn btn-pagination-left"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt;
          </button>

          <button
            className="btn btn-pagination-right"
            onClick={() => paginate(currentPage + 1)}
            disabled={
              currentPage === Math.ceil(petData?.pets.length / petsPerPage)
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
