import React from "react";
import "./style.css";
import Nav from "../../components/common/Nav";
import HeaderImg from "../../components/common/HeaderImg";
import Searching from "../../components/page components/LostFoundSearching/Searching";
import Footer from "../../components/common/Footer";
function LostFoundsearching() {
  return (
    <div>
      <Nav />
      <HeaderImg img_link="found-hero.png" />
      <Searching />
      <Footer />
    </div>
  );
}

export default LostFoundsearching;
