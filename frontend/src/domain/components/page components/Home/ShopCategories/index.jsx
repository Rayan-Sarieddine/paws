import React from "react";
import "./style.css";
import Category from "./Category";
import { useNavigate } from "react-router-dom";
function ShopCategories() {
  const navigate = useNavigate();
  return (
    <div className="shop-by">
      <div className="grid-header">
        <img src="./favicon.png" alt="logo"></img>
        <h3>Shop By Category</h3>
      </div>
      <div
        className="shop-catogories"
        onClick={() => {
          navigate("/shop");
        }}
      >
        <Category name="Dog Supplies" image="1.png" icon="dog.svg" />
        <Category name="Cat Supplies" image="2.png" icon="cat.svg" />
        <Category name="Bird Supplies" image="4.png" icon="bird.svg" />
        <Category name="Fish Supplies" image="3.png" icon="fish.svg" />
        <Category
          name=" Small Animal Supplies"
          image="5.png"
          icon="Rabbit.svg"
        />
        <Category name="Accessories" image="6.png" icon="Acces.svg" />
      </div>
    </div>
  );
}

export default ShopCategories;
