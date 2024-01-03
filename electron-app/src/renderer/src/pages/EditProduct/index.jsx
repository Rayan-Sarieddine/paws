import React, { useEffect, useState } from "react";
import "./style.css";
import { productDataSource } from "../../core/dataSource/remoteDataSource/products";
import { useDispatch, useSelector } from "react-redux";
import { local } from "../../core/helpers/localstorage";
import { updateSelectedProduct } from "../../core/dataSource/localDataSource/product";
import Nav from "../../components/common/Nav";

function EditProduct() {
  const dispatch = useDispatch();
  //get the selected product details from redux
  const selectedProduct = useSelector((state) => state.Product.curerntSelected);

  //state to hold new product attributes
  const [productAttributes, setproductAttributes] = useState({
    name: "",
    price: "",
    description: "",
    details: "",
    stock: "",
    category: selectedProduct.category
  });
  const [newImage, setNewImage] = useState(null);

  //for giving the user remarks
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setproductAttributes((prevAttributes) => ({
      ...prevAttributes,
      category: selectedProduct.category
    }));
  }, [selectedProduct]);

  //Reset for error and message
  useEffect(() => {
    const timer = setTimeout(() => {
      setError("");
      setMessage("");
    }, 5000);
    return () => clearTimeout(timer);
  }, [error, message]);

  //Function to handle change in inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setproductAttributes((prevAttributes) => ({
      ...prevAttributes,
      [name]: value
    }));
  };

  //Function to handle update of any selected attribute
  const updateProductAttribute = async (attributeName) => {
    const value = productAttributes[attributeName];
    const minLength = 5;
    if (!value) {
      setError(`Please enter a valid ${attributeName}`);
      return;
    }
    if ((attributeName === "stock" || attributeName === "price") && (value < 0 || value > 100000)) {
      setError("Please enter a valid number");
      return;
    }
    if (
      (attributeName === "description" || attributeName === "details") &&
      value.length < minLength
    ) {
      setError(`Please enter more details in ${attributeName}`);
      return;
    }

    try {
      const updateData = { barcode: selectedProduct.barcode, [attributeName]: value };
      await productDataSource.updateProduct(updateData);
      dispatch(updateSelectedProduct({ [attributeName]: value }));
      setMessage(`${attributeName} updated`);
      setproductAttributes((prev) => ({ ...prev, [attributeName]: "" }));
    } catch (err) {
      setError(err.message || err.toString());
    }
  };

  //Function to handle updating product picture
  const updatePicture = async () => {
    const type = local("type");
    const token = local("token");
    const headers = {
      Authorization: `${type} ${token}`
    };

    try {
      if (!newImage) {
        setError("Please upload an image");
        return;
      }

      const formData = new FormData();
      formData.append("image", newImage);
      formData.append("barcode", selectedProduct.barcode);

      const response = await fetch("http://127.0.0.1:8000/products/", {
        method: "PUT",
        body: formData,
        headers: headers
      });

      if (!response.ok) {
        throw new Error("Failed to update the image");
      }
      //response includes the updated product
      const updatedProductData = await response.json();
      if (updatedProductData && updatedProductData.product) {
        dispatch(updateSelectedProduct(updatedProductData.product));
        setMessage("Picture updated");
      } else {
        throw new Error("Invalid response data");
      }

      setNewImage(null);
    } catch (err) {
      setError(err.message || err.toString());
    }
  };

  return (
    <div className="edit-product">
      <Nav />
      <div className="edit-producr-content">
        <div className="edit-product-header">
          <p className="error">{error}</p>
          <p className="message">{message}</p>
          <p className="product-name">{selectedProduct.barcode}</p>
        </div>
        <div className="add-product-form">
          {Object.entries(productAttributes).map(
            ([key, value]) =>
              key !== "category" && (
                <div className="input-group" key={key}>
                  <label htmlFor={key}>Edit {key.charAt(0).toUpperCase() + key.slice(1)}</label>
                  <input
                    type="text"
                    id={key}
                    name={key}
                    placeholder={selectedProduct[key] || ""}
                    value={productAttributes[key]}
                    onChange={handleInputChange}
                    required
                  />
                  <button onClick={() => updateProductAttribute(key)} className="btn">
                    Submit {key.charAt(0).toUpperCase() + key.slice(1)}
                  </button>
                </div>
              )
          )}

          <div className="status-group status-group-category">
            <p>Category:</p>
            <div className="category-labels">
              <label>
                <input
                  type="radio"
                  name="category"
                  value="DOG SUPPLIES"
                  checked={productAttributes.category === "DOG SUPPLIES"}
                  onChange={handleInputChange}
                  required
                />
                DOG SUPPLIES
              </label>
              <label>
                <input
                  type="radio"
                  name="category"
                  value="CAT SUPPLIES"
                  checked={productAttributes.category === "CAT SUPPLIES"}
                  onChange={handleInputChange}
                  required
                />
                CAT SUPPLIES
              </label>
              <label>
                <input
                  type="radio"
                  name="category"
                  value="BIRD SUPPLIES"
                  checked={productAttributes.category === "BIRD SUPPLIES"}
                  onChange={handleInputChange}
                  required
                />
                BIRD SUPPLIES
              </label>
              <label>
                <input
                  type="radio"
                  name="category"
                  value="FISH SUPPLIES"
                  checked={productAttributes.category === "FISH SUPPLIES"}
                  onChange={handleInputChange}
                  required
                />
                FISH SUPPLIES
              </label>
              <label>
                <input
                  type="radio"
                  name="category"
                  value="SMALL ANIMAL SUPPLIES"
                  checked={productAttributes.category === "SMALL ANIMAL SUPPLIES"}
                  onChange={handleInputChange}
                  required
                />
                SMALL ANIMAL SUPPLIES
              </label>
              <label>
                <input
                  type="radio"
                  name="category"
                  value="ACCESSORIES"
                  checked={productAttributes.category === "ACCESSORIES"}
                  onChange={handleInputChange}
                  required
                />
                ACCESSORIES
              </label>
              <label>
                <input
                  type="radio"
                  name="category"
                  value="OTHERS"
                  checked={productAttributes.category === "OTHERS"}
                  onChange={handleInputChange}
                  required
                />
                OTHERS
              </label>
            </div>
            <button onClick={() => updateProductAttribute("category")} className="btn">
              Change category
            </button>
          </div>

          <div className="file-upload-container">
            <label htmlFor="upload-button">Change product Picture:</label>
            <input
              id="upload-button"
              type="file"
              onChange={(e) => setNewImage(e.target.files[0])}
              required
            />
            <button onClick={updatePicture} className="btn">
              Update
            </button>
            <img
              src={`http://127.0.0.1:8000/images/products/${selectedProduct.image}`}
              alt={selectedProduct.name}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;
