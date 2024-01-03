import React from "react";
import Nav from "../../components/common/Nav";
import HeaderImg from "../../components/common/HeaderImg";
import Footer from "../../components/common/Footer";
import LostReport from "../../components/page components/LostReporting/LostReport";

function LostReporting() {
  return (
    <div>
      <Nav />
      <HeaderImg img_link="lost-hero.png" />
      <LostReport />
      <Footer />
    </div>
  );
}

export default LostReporting;
