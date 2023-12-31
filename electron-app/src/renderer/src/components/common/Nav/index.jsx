import React from "react";
import "./style.css";
import { useNavigate } from "react-router";
import { cleanData } from "../../../core/dataSource/localDataSource/user";
function Nav() {
  const navigate = useNavigate();
  const logout = () => {
    dispatch(cleanData());
    localStorage.removeItem("token");
    localStorage.removeItem("type");
    navigate("/");
  };
  return (
    <div className="sidebar">
      <div className="logo-main">
        <img src="./src/assets/images/favicon.png" alt="logo" />
      </div>
      <ul className="main-list">
        <ul className="list">
          <li onClick={() => navigate("/dashboard")}>
            <img src="./src/assets/icons/dashboard.svg" alt="dashboard_icon" />
            Dashboard
          </li>
          <li onClick={() => navigate("/pets")}>
            <img src="./src/assets/icons/pets.svg" alt="pet_icon" />
            Pets
          </li>
          <li onClick={() => navigate("/products")}>
            <img src="./src/assets/icons/products.svg" alt="product_icon" />
            Products
          </li>
          <li onClick={() => navigate("/orders")}>
            <img src="./src/assets/icons/orders.svg" alt="order_icon" />
            Orders
          </li>
          <li onClick={() => navigate("/adoption-requests")}>
            <img src="./src/assets/icons/requests.svg" alt="adoption_icon" />
            Adoption Requests
          </li>
          <li onClick={() => navigate("/chat")}>
            <img src="./src/assets/icons/chat.svg" alt="chat_icon" />
            Chat
          </li>
          <li onClick={() => logout()}>
            <img src="./src/assets/icons/logout.svg" alt="signout_icon" />
            Log Out
          </li>
        </ul>
      </ul>
    </div>
  );
}

export default Nav;
