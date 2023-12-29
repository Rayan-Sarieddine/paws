import React from "react";
import "./style.css";
import Nav from "../../components/common/Nav";
import HeaderImg from "../../components/common/HeaderImg";
import Footer from "../../components/common/Footer";
import LostOrFound from "../../components/page components/LostFoundMain/LostOrFound";
function LostFoundMain() {
  return (
    <div>
      <Nav />
      <HeaderImg img_link="lost-hero.png" />
      <LostOrFound />
      <Footer />
    </div>
  );
}

export default LostFoundMain;
