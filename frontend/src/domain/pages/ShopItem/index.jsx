import React from "react";
import Nav from "../../components/common/Nav";
import HeaderImg from "../../components/common/HeaderImg";
import Footer from "../../components/common/Footer";
import Productinfo from "../../components/page components/ShopItem/ProductInfo";

function ShopItem() {
  return (
    <div>
      <Nav />
      <HeaderImg img_link="shop-hero.png" />
      <Productinfo />
      <Footer />
    </div>
  );
}

export default ShopItem;
