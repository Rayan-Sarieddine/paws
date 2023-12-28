import React from "react";
import "./style.css";
import HeaderImg from "../../components/common/HeaderImg";
import Nav from "../../components/common/Nav";
import AdoptPet from "../../components/page components/Adopt/AdoptPet";
import Animals from "../../components/page components/Adopt/Animals";
import Faq from "../../components/page components/Adopt/Faq";
import Footer from "../../components/common/Footer";
function Adopt() {
  return (
    <div>
      <Nav />
      <HeaderImg img_link="adopt-hero.png" />
      <AdoptPet />
      <Animals />
      <Faq />
      <Footer />
    </div>
  );
}

export default Adopt;
