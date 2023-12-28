import React from "react";
import "./style.css";
import Nav from "../../components/common/Nav";
import HeaderImg from "../../components/common/HeaderImg";
import Footer from "../../components/common/Footer";
import ShopItems from "../../components/page components/Shop/ShopItems";
function Shop() {
  return (
    <div>
      <Nav />
      <HeaderImg img_link="shop-hero.png" />
      <ShopItems />
      <Footer />
    </div>
  );
}

export default Shop;
