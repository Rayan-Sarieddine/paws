import React, { useEffect, useState } from "react";
import "./style.css";
import { userDataSource } from "../../../../../core/dataSource/remoteDataSource/users";
import { useDispatch } from "react-redux";
// import { useDispatch } from "react-redux";

function CheckoutDetails() {
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const dispatch = useDispatch();

  const getCartData = async () => {
    try {
      const response = await userDataSource.getCart();
      setCartItems(response.cartItems || []);
      console.log("cart items", cartItems);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCartData();
  }, []);

  useEffect(() => {
    setCartTotal(cartItems.reduce((total, item) => total + item.total, 0));
  }, [cartItems]);

  const handleQuantityChange = (itemIndex, newQuantity) => {
    setCartItems((currentItems) =>
      currentItems.map((item, index) =>
        index === itemIndex
          ? {
              ...item,
              quantity: newQuantity,
              total: item.productID.price * newQuantity,
            }
          : item
      )
    );
  };
  //save to cart
  const savetoNewCart = async () => {
    await userDataSource.updateCart();
  };
  return (
    <div>
      <div className="checkout-cart-all-content">
        {cartItems.length === 0 ? (
          <div className="center-div">
            <p className="checkout-cart-all-content-no-items">
              No items In Cart
            </p>
          </div>
        ) : (
          <>
            {cartItems.map((item, index) => {
              return (
                <div
                  key={item.productID.barcode}
                  className="checkout-cart-item"
                >
                  <div className="cart-items-section">
                    <img
                      src={`http://127.0.0.1:8000/images/products/${item.productImage}`}
                      alt={item.productID.name}
                    />
                    <div className="checkout-product-main-info">
                      <h4>{item.productID.name}</h4>
                      <p>${item.total}</p>
                    </div>
                  </div>
                  <div className="quantity">
                    <button
                      className="quantity-btn decrease"
                      onClick={() =>
                        handleQuantityChange(
                          index,
                          Math.max(1, item.quantity - 1)
                        )
                      }
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className="quantity-input"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(
                          index,
                          Math.max(1, parseInt(e.target.value))
                        )
                      }
                      min="1"
                      max="10"
                    />
                    <button
                      className="quantity-btn increase"
                      onClick={() =>
                        handleQuantityChange(index, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
            <div className="checkout-cart-total">
              <hr></hr>
              <div className="checkout-cart-total-value">
                <span>TOTAL:</span>
                <p>${cartTotal}</p>
              </div>
              <hr></hr>
              <div className="checkout-actions">
                <div className="checkout-actions-coupon">
                  <input type="text" placeholder="Enter Coupon" />
                </div>
                <div className="checkout-action_btns">
                  <button
                    className="btn checkout-edit-btn"
                    onClick={() => {
                      savetoNewCart();
                    }}
                  >
                    Save
                  </button>
                  <button className="btn checkout-btn">Checkout</button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CheckoutDetails;
