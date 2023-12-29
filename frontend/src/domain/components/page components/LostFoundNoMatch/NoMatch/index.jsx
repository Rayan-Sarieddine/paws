import React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
function NoMatch() {
  const navigate = useNavigate();
  const tryagain = () => {};
  return (
    <div className="nomatch">
      <h3 className="nomatch-text">Sorry! No results found</h3>
      <div className="nomatch-btns">
        <button
          className="btn tryagain-btn"
          onClick={() => {
            tryagain();
          }}
        >
          Try Again
        </button>
        <button
          className="btn manualsearch-btn"
          onClick={() => {
            navigate("/lost-found-manual");
          }}
        >
          Manually search in lost & Found
        </button>
      </div>
    </div>
  );
}

export default NoMatch;
