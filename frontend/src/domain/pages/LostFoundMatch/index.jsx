import React from "react";
import "./style.css";
import Nav from "../../components/common/Nav";
import Footer from "../../components/common/Footer";
import HeaderImg from "../../components/common/HeaderImg";
import Result from "../../components/page components/LostFoundMatch/Result";
function LostFoundMatch() {
  return (
    <div>
      <Nav />
      <HeaderImg img_link="found-hero.png" />
      <Result />
      <Footer />
    </div>
  );
}

export default LostFoundMatch;
