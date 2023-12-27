import React, { useEffect } from "react";
import "./style.css";
import Footer from "../../components/common/Footer";
import Nav from "../../components/common/Nav";
import ShopCategories from "../../components/page components/Home/ShopCategories";
import ImageGrid from "../../components/page components/Home/ImageGrid";
import LostFound from "../../components/page components/Home/LostFound";
import Header from "../../components/page components/Home/Header";

function Home() {
  return (
    <div>
      <Nav />
      <Header />
      <ShopCategories />
      <ImageGrid />
      <LostFound />
      <Footer />
    </div>
  );
}

export default Home;
