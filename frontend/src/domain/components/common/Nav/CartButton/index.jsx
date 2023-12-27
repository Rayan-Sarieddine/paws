import React, { useEffect, useState } from "react";
import "./styles.css";
import { Link, useNavigate } from "react-router-dom";
import { local } from "../../../../../core/helpers/localstorage";
import { useDispatch, useSelector } from "react-redux";
import { cleanData } from "../../../../../core/dataSource/localDataSource/user";
import { useLogin } from "../../../../../core/hooks/login.hook";
import { userDataSource } from "../../../../../core/dataSource/remoteDataSource/users";
import Button from "../../Button";

const CartButton = ({ isCartMenuHidden, setIsCartMenuHidden }) => {
  const [cartItems, setCartItems] = useState([]);
  let cartTotal = 0;
  // const userData = useSelector((state) => state.User);

  const getCartData = async () => {
    try {
      const response = await userDataSource.getCart();
      setCartItems(response.cartItems || []);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCartData();
  }, [isCartMenuHidden]);
  return (
    <div
      className={
        isCartMenuHidden ? "cart-drop-down" : "cart-drop-down cart-show"
      }
    >
      <div className="cart-all-content">
        {cartItems?.length === 0 ? (
          <div className="center-div">
            <p className="cart-all-content-no-items">No items In Cart</p>
          </div>
        ) : (
          <>
            {cartItems?.map((item) => {
              cartTotal += item.total;
              return (
                <>
                  <div key={item.productID.barcode} className="cart-item">
                    <div className="cart-items-section">
                      <img
                        src={`http://127.0.0.1:8000/images/products/${item.productImage}`}
                        alt={item.productID.name}
                      />
                      <div className="product-main-info">
                        <h4>{item.productID.name}</h4>
                        <p>${item.total}</p>
                      </div>
                    </div>
                    <p className="cart-items-quantity">{item.quantity}</p>
                  </div>
                </>
              );
            })}
            <div className="cart-total">
              <hr></hr>
              <div className="cart-total-value">
                <span>TOTAL:</span>
                <p>${cartTotal}</p>
              </div>
              <button className="view-cart-button">view cart</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartButton;
