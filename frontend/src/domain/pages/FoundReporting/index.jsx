import React from "react";
import "./style.css";
import Nav from "../../components/common/Nav";
import HeaderImg from "../../components/common/HeaderImg";
import Footer from "../../components/common/Footer";
import FoundReport from "../../components/page components/FoundReporting/FoundReport";
function FoundReporting() {
  return (
    <div>
      <Nav />
      <HeaderImg img_link="lost-hero.png" />
      <FoundReport />
      <Footer />
    </div>
  );
}

export default FoundReporting;
