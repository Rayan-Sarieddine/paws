import React, { useState } from "react";
import "./style.css";
function AddPet() {
  const [petData, setPetData] = useState({
    petName: "",
    petBreed: "",
    petType: "",
    petAge: "",
    petStory: "",
    petDescription: "",
    breedDescription: "",
    status: "AVAILABLE"
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPetData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      setPetData((prevData) => ({
        ...prevData,
        petPicture: event.target.files[0]
      }));
    }
  };

  const handleStatusChange = (event) => {
    setPetData((prevData) => ({
      ...prevData,
      status: event.target.value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(petData);
  };

  return (
    <form onSubmit={handleSubmit} className="add-pet-form">
      {Object.keys(petData).map((key) => {
        if (key === "status" || key === "petPicture") {
          // Skip status and petPicture since they are handled separately
          return null;
        }
        return (
          <div key={key} className="input-group">
            <label htmlFor={key}>{`Enter ${key}`}</label>
            <input
              type="text"
              id={key}
              name={key}
              placeholder={`Enter ${key}`}
              value={petData[`${key}`]}
              onChange={handleInputChange}
              required
            />
          </div>
        );
      })}

      <div className="status-group">
        <p>Status:</p>
        <label>
          <input
            type="radio"
            name="status"
            value="AVAILABLE"
            checked={petData.status === "AVAILABLE"}
            onChange={handleStatusChange}
            required
          />{" "}
          AVAILABLE
        </label>
        <label>
          <input
            type="radio"
            name="status"
            value="ADOPTED"
            checked={petData.status === "ADOPTED"}
            onChange={handleStatusChange}
            required
          />{" "}
          ADOPTED
        </label>
        <label>
          <input
            type="radio"
            name="status"
            value="LOST"
            checked={petData.status === "LOST"}
            onChange={handleStatusChange}
            required
          />{" "}
          LOST
        </label>
        <label>
          <input
            type="radio"
            name="status"
            value="FOUND"
            checked={petData.status === "FOUND"}
            onChange={handleStatusChange}
            required
          />{" "}
          FOUND
        </label>
      </div>

      <div className="file-upload-container">
        <label htmlFor="upload-button">Upload Pet Picture:</label>
        <input id="upload-button" type="file" onChange={handleFileChange} required />
      </div>

      <button type="submit" className="btn">
        Add Pet
      </button>
    </form>
  );
}

export default AddPet;
