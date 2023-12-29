import React from "react";
import "./style.css";
import Nav from "../../components/common/Nav";
import Footer from "../../components/common/Footer";
import HeaderImg from "../../components/common/HeaderImg";
import ManualResult from "../../components/page components/LostFoundManualClaim/ManualResult";
function LostFoundManualClaim() {
  return (
    <div>
      <Nav />
      <HeaderImg img_link="found-hero.png" />
      <ManualResult />
      <Footer />
    </div>
  );
}

export default LostFoundManualClaim;
