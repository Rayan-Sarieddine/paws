import React from "react";
import "./style.css";

import { useNavigate } from "react-router-dom";
function Header() {
  const navigate = useNavigate();

  return (
    <div className="header">
      <div className="header-content">
        <h1>Home of</h1>
        <p>Pets</p>
        <div className="header-ctas">
          <button
            className="btn header-cta-adopt"
            onClick={() => navigate("/adopt")}
          >
            Adopt
          </button>
          <button
            className="btn header-cta-shop"
            onClick={() => navigate("/shop")}
          >
            Shop
          </button>
        </div>
      </div>
      <div className="header-table">
        <div className="header-table-item" onClick={() => navigate("/adopt")}>
          <img src="./images/categories/icons/cat.svg" alt="" />
          <span>ADOPT YOUR BESTFRIEND</span>
        </div>
        <div className="header-table-item" onClick={() => navigate("/shop")}>
          <img src="./images/categories/icons/Acces.svg" alt="" />
          <span>GET THEIR SUPPLIES</span>
        </div>
        <div
          className="header-table-item"
          onClick={() => navigate("/lost-found-main")}
        >
          <img src="./images/categories/icons/dog.svg" alt="" />
          <span>Never Loose them</span>
        </div>
      </div>
    </div>
  );
}

export default Header;
