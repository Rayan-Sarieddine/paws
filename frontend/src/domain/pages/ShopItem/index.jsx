import React from "react";
import Nav from "../../components/common/Nav";
import HeaderImg from "../../components/common/HeaderImg";
import Footer from "../../components/common/Footer";
import Productinfo from "../../components/page components/ShopItem/ProductInfo";
import RelatedItems from "../../components/page components/ShopItem/RelatedItems";

function ShopItem() {
  return (
    <div>
      <Nav />
      <HeaderImg img_link="shop-hero.png" />
      <Productinfo />
      <RelatedItems />
      <Footer />
    </div>
  );
}

export default ShopItem;
