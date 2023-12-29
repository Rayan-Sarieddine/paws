import React, { useState } from "react";
import "./style.css";
import { postsDataSource } from "../../../../../core/dataSource/remoteDataSource/posts";

function FoundReport() {
  const [description, setDescription] = useState("");
  const [region, setRegion] = useState("OTHER");
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("description", description);
      formData.append("region", region);
      formData.append("image", file);

      const response = await postsDataSource.submitPost(formData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="found-report">
      <p className="found-report-title">LOST & FOUND</p>
      <h4>Found a pet?</h4>
      <p className="found-report-prompt">
        Fill the info below and help us find its bestfriend!
      </p>
      <form onSubmit={onFormSubmit}>
        <div className="input-group">
          <label>Upload a clear picture of the pet you found:</label>
          <input type="file" onChange={handleFileChange} required />
        </div>

        <div className="input-group">
          <label>Add a description of the pet:</label>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
          />
        </div>
        <div className="input-group">
          <label>Where did you find the pet:</label>
          <select
            id="regions"
            onChange={(e) => setRegion(e.target.value)}
            value={region}
            required
          >
            <option value="BEIRUT">BEIRUT</option>
            <option value="SOUTH">SOUTH</option>
            <option value="NORTH">NORTH</option>
            <option value="BEKAA">BEKAA</option>
            <option value="MOUNT LEBANON">MOUNT LEBANON</option>
            <option value="OTHER">OTHER</option>
          </select>
        </div>
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
}

export default FoundReport;
