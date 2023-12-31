import React, { useEffect, useState } from "react";
import "./style.css";
import { useDispatch } from "react-redux";
import { loadProducts, selectProduct } from "../../core/dataSource/localDataSource/product";
import { useNavigate } from "react-router-dom";
import { productDataSource } from "../../core/dataSource/remoteDataSource/products";
import Nav from "../../components/common/Nav";

function Products() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [productData, setProductData] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [price, setPrice] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;
  const [filter, setFilter] = useState({ category: "all", price: "" });

  const handleEditClick = (product) => {
    dispatch(selectProduct(product));
    navigate("/edit-product");
  };

  const getProductData = async () => {
    try {
      const response = await productDataSource.getProducts();
      if (response?.products) {
        setProductData(response.products);
        dispatch(loadProducts(response.products));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  useEffect(() => {
    let newFilteredProducts = productData;

    if (filter.category !== "all") {
      newFilteredProducts = newFilteredProducts.filter(
        (product) => product.category === filter.category
      );
    }

    if (filter.price) {
      newFilteredProducts = newFilteredProducts.filter((product) => product.price <= filter.price);
    }

    setFilteredProducts(newFilteredProducts);
  }, [filter, productData]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handleCategoryChange = (e) => {
    setFilter({ ...filter, category: e.target.value });
  };

  const handlePriceChange = (e) => {
    const newPrice = parseInt(e.target.value, 10);
    setPrice(newPrice);
    setFilter({ ...filter, price: newPrice });
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="products">
      <Nav />
      <div className="products-show-container">
        <div className="filters">
          <button
            className="btn btn-add"
            onClick={() => {
              navigate("/add-product");
            }}
          >
            ADD PRODUCT
          </button>
          <div className="filter-category">
            <h3>Category</h3>
            <hr />
            <label>
              <input
                type="radio"
                name="category"
                value="all"
                checked={filter.category === "all"}
                onChange={handleCategoryChange}
              />
              All
            </label>
            <label>
              <input
                type="radio"
                name="category"
                value="DOG SUPPLIES"
                checked={filter.category === "DOG SUPPLIES"}
                onChange={handleCategoryChange}
              />
              Dog Supplies
            </label>
            <label>
              <input
                type="radio"
                name="category"
                value="CAT SUPPLIES"
                checked={filter.category === "CAT SUPPLIES"}
                onChange={handleCategoryChange}
              />
              Cat Supplies
            </label>
            <label>
              <input
                type="radio"
                name="category"
                value="FISH SUPPLIES"
                checked={filter.category === "FISH SUPPLIES"}
                onChange={handleCategoryChange}
              />
              Fish Supplies
            </label>
            <label>
              <input
                type="radio"
                name="category"
                value="BIRD SUPPLIES"
                checked={filter.category === "BIRD SUPPLIES"}
                onChange={handleCategoryChange}
              />
              Bird Supplies
            </label>
            <label>
              <input
                type="radio"
                name="category"
                value="ACCESSORIES"
                checked={filter.category === "ACCESSORIES"}
                onChange={handleCategoryChange}
              />
              Accessories
            </label>
            <label>
              <input
                type="radio"
                name="category"
                value="OTHERS"
                checked={filter.category === "OTHERS"}
                onChange={handleCategoryChange}
              />
              Others
            </label>
          </div>
          {/* Price Filter */}
          <div className="filter-category second-filter">
            <h3>Price</h3>
            <hr />
            <input
              type="range"
              id="priceSlider"
              name="priceSlider"
              min={1}
              max={14}
              value={price}
              onChange={handlePriceChange}
            />
            <p>Price to be less than {price}</p>
          </div>
        </div>

        {/* Products Display Section */}
        <div className="product-pagination-main">
          {currentProducts.length === 0 ? (
            <div className="no-products-to-show">
              <p>No Products Found</p>
            </div>
          ) : (
            <>
              <div className="product-pagination-header">
                <p>PRODUCTS</p>
              </div>
              <div className="product-pagination-productCards">
                {currentProducts.map((product, index) => (
                  <div key={index} className="product-pagination-card">
                    <img
                      src={`http://localhost:8000/images/products/${product.image}`}
                      alt={product.name}
                    />
                    <div className="product-details">
                      <h3>{product.name}</h3>
                      <p>
                        {product.details} | {product.price}
                      </p>
                      <button className="btn btn-edit" onClick={() => handleEditClick(product)}>
                        EDIT
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {/* Pagination Controls */}
              <div className="product-pagination-controls">
                <button
                  className="btn btn-pagination-left"
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  &lt;
                </button>
                <span>{currentPage}</span>
                <button
                  className="btn btn-pagination-right"
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === Math.ceil(filteredProducts.length / productsPerPage)}
                >
                  &gt;
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Products;
