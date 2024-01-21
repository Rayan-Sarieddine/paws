import React, { useEffect, useState } from "react";
import "./style.css";
// import { postsDataSource } from "../../../../../core/dataSource/remoteDataSource/posts";
import { local } from "../../../../../core/helpers/localstorage";

function FoundReport() {
  const [description, setDescription] = useState("");
  const [region, setRegion] = useState("OTHER");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    const type = local("type");
    const token = local("token");
    const headers = {
      Authorization: `${type} ${token}`,
    };

    try {
      const formData = new FormData();
      formData.append("description", description);
      formData.append("location", region);
      formData.append("image", file);
      console.log(formData);
      const response = await fetch("http://127.0.0.1:8000/posts", {
        method: "POST",
        body: formData,
        headers: {
          ...headers,
        },
      });
      setRegion("OTHER");
      setFile(null);
      setDescription("");
      setMessage("Post added");
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setError("");
      setMessage("");
    }, 2000);
  }, [error, message]);

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
      {/* <p className="error">{error}</p> */}
      <p className="message">{message}</p>
    </div>
  );
}

export default FoundReport;
