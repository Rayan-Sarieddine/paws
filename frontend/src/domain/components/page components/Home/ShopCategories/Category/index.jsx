import React from "react";

function Category({ name, image, icon }) {
  return (
    <div class="category-card">
      <div class="category-card-front">
        <div class="category-icon">
          <img src={`./images/categories/icons/${icon}`} alt="" />
        </div>
        <div class="content">
          <h4>Cat Supplies</h4>
        </div>
      </div>
      <div class="category-card-back">
        <img src={`./images/categories/images/${image}`} alt="" />
      </div>
    </div>
  );
}

export default Category;
