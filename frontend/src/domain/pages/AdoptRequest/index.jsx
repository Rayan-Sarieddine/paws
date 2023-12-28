import React from "react";
import Nav from "../../components/common/Nav";
import RequestConfirmation from "../../components/page components/AdoptRequest/RequestConfirmation";
import Footer from "../../components/common/Footer";
import HeaderImg from "../../components/common/HeaderImg";

function AdoptRequest() {
  return (
    <div>
      <Nav />
      <HeaderImg img_link="adopt-hero.png" />
      <RequestConfirmation />
      <Footer />
    </div>
  );
}

export default AdoptRequest;
