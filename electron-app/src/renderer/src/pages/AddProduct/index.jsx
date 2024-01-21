import React, { useEffect, useState } from "react";
import "./style.css";
import { productDataSource } from "../../core/dataSource/remoteDataSource/products";
import { local } from "../../core/helpers/localstorage";
import Nav from "../../components/common/Nav";

function AddProduct() {
  //Product Data
  const [productData, setproductData] = useState({
    barcode: "",
    name: "",
    price: "",
    description: "",
    details: "",
    stock: "",
    category: "OTHERS"
  });
  const [productImage, setproductImage] = useState(null);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  //Function to handle input change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setproductData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  //Function to handle radio button click
  const handleCategoryChange = (event) => {
    setproductData((prevData) => ({
      ...prevData,
      category: event.target.value
    }));
  };

  //Function to handle form submt to add a new product
  const handleSubmit = async (e) => {
    e.preventDefault();
    //Get header data
    const type = local("type");
    const token = local("token");
    //Set headers
    const headers = {
      Authorization: `${type} ${token}`
    };

    try {
      const formData = new FormData();
      //Set form data
      formData.append("image", productImage);
      formData.append("name", productData.name);
      formData.append("barcode", productData.barcode);
      formData.append("description", productData.description);
      formData.append("stock", productData.stock);
      formData.append("price", productData.price);
      formData.append("details", productData.details);
      formData.append("category", productData.category);

      //Data Validation
      if (productData.description.length < 5 || productData.details.length < 5) {
        setError("Not enough information given");
        return;
      }
      if (productData.stock < 0 || productData.price < 0) {
        setError("numbers cannot be negative");
        return;
      }
      //Fetch response
      const response = await fetch("http://127.0.0.1:8000/products/", {
        method: "POST",
        body: formData,
        headers: headers
      });
      if (response.status === 200) {
        setMessage("Success");
        //Reset data
        setproductData({
          barcode: "",
          name: "",
          price: "",
          description: "",
          details: "",
          stock: "",
          category: "OTHERS"
        });
      }
      if (response.status === 409) {
        setError("Product barcode already exists");
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err);
    }
  };

  //Reset for error and message
  useEffect(() => {
    setTimeout(() => {
      setError("");
      setMessage("");
    }, 5000);
  }, [error, message]);

  return (
    <div className="add-product">
      <Nav />
      <form onSubmit={handleSubmit} className="add-product-form">
        {Object.keys(productData).map((key) => {
          if (key === "category" || key === "productPicture") {
            return null;
          }
          return (
            <div key={key} className="input-group">
              <label htmlFor={key}>{`Enter ${key}`}</label>
              <input
                type="text"
                id={key}
                name={key}
                placeholder={`Enter ${key}`}
                value={productData[`${key}`]}
                onChange={handleInputChange}
                required
              />
            </div>
          );
        })}

        <div className="status-group">
          <p>Category:</p>
          <label>
            <input
              type="radio"
              name="category"
              value="DOG SUPPLIES"
              checked={productData.category === "DOG SUPPLIES"}
              onChange={handleCategoryChange}
              required
            />{" "}
            DOG SUPPLIES
          </label>
          <label>
            <input
              type="radio"
              name="category"
              value="CAT SUPPLIES"
              checked={productData.category === "CAT SUPPLIES"}
              onChange={handleCategoryChange}
              required
            />{" "}
            CAT SUPPLIES
          </label>
          <label>
            <input
              type="radio"
              name="category"
              value="BIRD SUPPLIES"
              checked={productData.category === "BIRD SUPPLIES"}
              onChange={handleCategoryChange}
              required
            />{" "}
            BIRD SUPPLIES
          </label>
          <label>
            <input
              type="radio"
              name="category"
              value="FISH SUPPLIES"
              checked={productData.category === "FISH SUPPLIES"}
              onChange={handleCategoryChange}
              required
            />{" "}
            FISH SUPPLIES
          </label>
          <label>
            <input
              type="radio"
              name="category"
              value="SMALL ANIMAL SUPPLIES"
              checked={productData.category === "SMALL ANIMAL SUPPLIES"}
              onChange={handleCategoryChange}
              required
            />{" "}
            SMALL ANIMAL SUPPLIES
          </label>
          <label>
            <input
              type="radio"
              name="category"
              value="ACCESSORIES"
              checked={productData.category === "ACCESSORIES"}
              onChange={handleCategoryChange}
              required
            />{" "}
            ACCESSORIES
          </label>
          <label>
            <input
              type="radio"
              name="category"
              value="OTHERS"
              checked={productData.category === "OTHERS"}
              onChange={handleCategoryChange}
              required
            />{" "}
            OTHERS
          </label>
        </div>

        <div className="file-upload-container">
          <label htmlFor="upload-button">Upload product Picture:</label>
          <input
            id="upload-button"
            type="file"
            onChange={(e) => {
              setproductImage(e.target.files[0]);
            }}
            required
          />
        </div>

        <button type="submit" className="btn">
          Add product
        </button>
        <p className="error">{error}</p>
        <p className="message">{message}</p>
      </form>
    </div>
  );
}

export default AddProduct;
