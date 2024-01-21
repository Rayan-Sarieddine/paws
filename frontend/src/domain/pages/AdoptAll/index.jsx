import React from "react";
import Nav from "../../components/common/Nav";
import PetsShow from "../../components/page components/AdoptAll/PetsShow";
import Footer from "../../components/common/Footer";
import HeaderImg from "../../components/common/HeaderImg";

function AdoptAll() {
  return (
    <div>
      <Nav />
      <HeaderImg img_link="adopt-hero.png" />
      <PetsShow />
      <Footer />
    </div>
  );
}

export default AdoptAll;
