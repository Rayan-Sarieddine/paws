import React, { useEffect, useState } from "react";
import "./style.css";

const CheckMark = () => {
  return (
    <div className="success-container">
      <img src="./favicon.png" alt="Success" className="success-image" />
      <h2>Successful!</h2>
    </div>
  );
};

export default CheckMark;
