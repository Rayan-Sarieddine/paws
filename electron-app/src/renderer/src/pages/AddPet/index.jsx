import React, { useEffect, useState } from "react";
import "./style.css";
import { petsDataSource } from "../../core/dataSource/remoteDataSource/pets";
import { local } from "../../core/helpers/localstorage";
import Nav from "../../components/common/Nav";
function AddPet() {
  //Pet data from inputs
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
  const [petImage, setPetImage] = useState(null);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  //Function to handle data change in inputs
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPetData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  //Function to handle status radio button click
  const handleStatusChange = (event) => {
    setPetData((prevData) => ({
      ...prevData,
      status: event.target.value
    }));
  };

  //Function to handle form submit of adding a new pet
  const handleSubmit = async (e) => {
    e.preventDefault();
    const type = local("type");
    const token = local("token");
    const headers = {
      Authorization: `${type} ${token}`
    };

    try {
      //Form data to be sent
      const formData = new FormData();
      //Set Form data
      formData.append("image", petImage);
      formData.append("name", petData.petName);
      formData.append("breed", petData.petBreed);
      formData.append("description", petData.petDescription);
      formData.append("age", petData.petAge);
      formData.append("type", petData.petType);
      formData.append("story", petData.petStory);
      formData.append("STATUS", petData.status);
      formData.append("breed_description", petData.breedDescription);

      //Inputs validation
      if (
        petData.breedDescription.length < 5 ||
        petData.petDescription.length < 5 ||
        petData.petStory.length < 5
      ) {
        setError("Not enough information given");
        return;
      }
      if (petData.petAge < 0) {
        setError("age cannot be negative");
        return;
      }
      //Fetch response
      const response = await fetch("http://127.0.0.1:8000/pets/", {
        method: "POST",
        body: formData,
        headers: headers
      });

      if (response.status === 200) {
        setMessage("Success");
        setPetData({
          petName: "",
          petBreed: "",
          petType: "",
          petAge: "",
          petStory: "",
          petDescription: "",
          breedDescription: "",
          status: "AVAILABLE"
        });
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err);
    }
  };

  //Reset for message and error
  useEffect(() => {
    setTimeout(() => {
      setError("");
      setMessage("");
    }, 5000);
  }, [error, message]);

  return (
    <div className="add-pet">
      <Nav />
      <form onSubmit={handleSubmit} className="add-pet-form">
        {Object.keys(petData).map((key) => {
          if (key === "status" || key === "petPicture") {
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
          <input
            id="upload-button"
            type="file"
            onChange={(e) => {
              setPetImage(e.target.files[0]);
            }}
            required
          />
        </div>

        <button type="submit" className="btn">
          Add Pet
        </button>
        <p className="error">{error}</p>
        <p className="message">{message}</p>
      </form>
    </div>
  );
}

export default AddPet;
