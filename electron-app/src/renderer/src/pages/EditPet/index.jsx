import React, { useEffect, useState } from "react";
import "./style.css";
import { petsDataSource } from "../../core/dataSource/remoteDataSource/pets";
import { useSelector } from "react-redux";
import { local } from "../../core/helpers/localstorage";

function EditPet() {
  //get the selected pet details from redux
  const selectedPet = useSelector((state) => state.Pet.curerntSelected);

  //state to hold new pet attributes
  const [petAttributes, setPetAttributes] = useState({
    breed: "",
    type: "",
    age: "",
    story: "",
    description: "",
    breed_description: "",
    status: selectedPet.status
  });
  const [newImage, setNewImage] = useState(null);

  //for giving the user remarks
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setPetAttributes((prevAttributes) => ({
      ...prevAttributes,
      status: selectedPet.status
    }));
  }, [selectedPet]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setError("");
      setMessage("");
    }, 5000);
    return () => clearTimeout(timer);
  }, [error, message]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPetAttributes((prevAttributes) => ({
      ...prevAttributes,
      [name]: value
    }));
  };

  const updatePetAttribute = async (attributeName) => {
    const value = petAttributes[attributeName];
    const minLength = 5;
    if (!value) {
      setError(`Please enter a valid ${attributeName}`);
      return;
    }
    if (attributeName === "age" && (value < 0 || value > 30)) {
      setError("Please enter a valid age");
      return;
    }
    if (
      (attributeName === "description" ||
        attributeName === "story" ||
        attributeName === "breed_description") &&
      value.length < minLength
    ) {
      setError(`Please enter more details in ${attributeName}`);
      return;
    }

    try {
      const updateData = { name: selectedPet.name, [attributeName]: value };
      await petsDataSource.updatePet(updateData);
      setMessage(`${attributeName} updated`);
      setPetAttributes((prev) => ({ ...prev, [attributeName]: "" }));
    } catch (err) {
      setError(err.message || err.toString());
    }
  };

  const updatePicture = async () => {
    const type = local("type");
    const token = local("token");
    const headers = {
      Authorization: `${type} ${token}`
    };
    try {
      if (!newImage) {
        setError("Please upload an image");
        return;
      }
      const formData = new FormData();
      formData.append("image", newImage);
      formData.append("name", selectedPet.name);

      await fetch("http://127.0.0.1:8000/pets/", {
        method: "PUT",
        body: formData,
        headers: headers
      });
      setMessage("Picture updated");
      setNewImage(null);
    } catch (err) {
      setError(err.message || err.toString());
    }
  };

  return (
    <>
      <div className="edit-pet-header">
        <p className="error">{error}</p>
        <p className="message">{message}</p>
        <p>{selectedPet.name}</p>
      </div>
      <div className="add-pet-form">
        {Object.entries(petAttributes).map(
          ([key, value]) =>
            key !== "status" && (
              <div className="input-group" key={key}>
                <label htmlFor={key}>Edit {key.charAt(0).toUpperCase() + key.slice(1)}</label>
                <input
                  type="text"
                  id={key}
                  name={key}
                  placeholder={selectedPet[key]}
                  value={value}
                  onChange={handleInputChange}
                  required
                />
                <button onClick={() => updatePetAttribute(key)} className="btn">
                  Submit {key.charAt(0).toUpperCase() + key.slice(1)}
                </button>
              </div>
            )
        )}

        <div className="status-group">
          <p>Status:</p>
          <label>
            <input
              type="radio"
              name="status"
              value="AVAILABLE"
              checked={petAttributes.status === "AVAILABLE"}
              onChange={handleInputChange}
              required
            />
            AVAILABLE
          </label>
          <label>
            <input
              type="radio"
              name="status"
              value="FOUND"
              checked={petAttributes.status === "FOUND"}
              onChange={handleInputChange}
              required
            />
            FOUND
          </label>
          <label>
            <input
              type="radio"
              name="status"
              value="ADOPTED"
              checked={petAttributes.status === "ADOPTED"}
              onChange={handleInputChange}
              required
            />
            ADOPTED
          </label>
          <label>
            <input
              type="radio"
              name="status"
              value="LOST"
              checked={petAttributes.status === "LOST"}
              onChange={handleInputChange}
              required
            />
            LOST
          </label>

          <button onClick={() => updatePetAttribute("status")} className="btn">
            Change Status
          </button>
        </div>

        <div className="file-upload-container">
          <label htmlFor="upload-button">Change Pet Picture:</label>
          <input
            id="upload-button"
            type="file"
            onChange={(e) => setNewImage(e.target.files[0])}
            required
          />
          <button onClick={updatePicture} className="btn">
            Update
          </button>
          <img
            src={`http://127.0.0.1:8000/images/pets/${selectedPet.image}`}
            alt={selectedPet.name}
          />
        </div>
      </div>
    </>
  );
}

export default EditPet;
