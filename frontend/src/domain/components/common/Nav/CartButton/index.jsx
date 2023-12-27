import React, { useEffect } from "react";
import "./styles.css";
import { Link, useNavigate } from "react-router-dom";
import { local } from "../../../../../core/helpers/localstorage";
import { useDispatch, useSelector } from "react-redux";
import { cleanData } from "../../../../../core/dataSource/localDataSource/user";
import { useLogin } from "../../../../../core/hooks/login.hook";

const CartButton = ({ isCartMenuHidden, setIsCartMenuHidden }) => {
  const userData = useSelector((state) => state.User);
  console.log(userData);
  //when user clicks on logout handler

  return (
    <div
      className={
        isCartMenuHidden ? "cart-drop-down" : "cart-drop-down cart-show"
      }
    >
      {userData.cart?.items?.length === 0 ? (
        <p>No items found</p>
      ) : (
        userData.cart.items.map((item)=>{
          return <div key={userData.cart.items.productID}>
<img src={`http://127.0.0.1:8000/images/products/${item.productImage}`} alt=""
          </div>
        })
      )}
    </div>
  );
};

export default CartButton;
