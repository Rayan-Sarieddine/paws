import React, { useEffect, useState } from "react";
import { local } from "../../../../../core/helpers/localstorage";
import { useNavigate } from "react-router-dom";
import "./style.css";
function LostReport() {
  const navigate = useNavigate();
  const [region, setRegion] = useState("OTHER");
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
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
      formData.append("type", "LOST");
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
      console.log(response);
      navigate("/lost-found-searching");
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setError("");
    }, 2000);
  }, [error]);
  return (
    <div className="lost-report">
      <p className="lost-report-title">LOST & FOUND</p>
      <h4>Lost your pet?</h4>
      <p className="lost-report-prompt">
        Just fill the info below and we will try to find it!
      </p>
      <form onSubmit={onFormSubmit}>
        <div className="input-group">
          <label>Upload a clear picture of your pet:</label>
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
          <label>Which area did you lose your pet at/ pet last seen at:</label>
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
        <button type="submit" className="lost-submit-btn">
          Submit
        </button>
      </form>
      {/* <p className="error">{error}</p> */}
      <p
        className="lost-manual-search"
        onClick={() => {
          navigate("/lost-found-manual");
        }}
      >
        or Manually search in lost & Found
      </p>
    </div>
  );
}

export default LostReport;
