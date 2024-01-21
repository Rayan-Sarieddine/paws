import React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

function NoMatch() {
  const navigate = useNavigate();

  return (
    <div className="nomatch">
      <h3 className="nomatch-text">Sorry! No results found</h3>
      <div className="nomatch-btns">
        <button
          className="btn tryagain-btn"
          onClick={() => {
            navigate("/lost-found-reporting");
          }}
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

export default NoMatch;
