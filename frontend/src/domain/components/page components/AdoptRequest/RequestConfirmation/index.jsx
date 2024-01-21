import React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

function RequestConfirmation() {
  const navigate = useNavigate();

  return (
    <div className="request-confirmation">
      <div className="request-confirmation_content">
        <h3>Adoption request Sent!</h3>
        <p>We will contact you via phone in the next 3 days</p>
        <div className="request-confirmation_btns">
          <button
            className="btn request-confirmation_backBtn"
            on
            onClick={() => {
              navigate("/");
            }}
          >
            Back To Home
          </button>

          <button
            className="btn request-confirmation_shopBtn"
            on
            onClick={() => {
              navigate("/shop");
            }}
          >
            continue To Shop
          </button>
        </div>
      </div>
    </div>
  );
}

export default RequestConfirmation;
