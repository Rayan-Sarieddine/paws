import React from "react";
import "./style.css";
import Nav from "../../components/common/Nav";
import PetInfo from "../../components/page components/AdoptPet/PetInfo";
import Footer from "../../components/common/Footer";
import { useSelector } from "react-redux";
import HeaderImg from "../../components/common/HeaderImg";
function AdoptPet() {
  return (
    <div>
      <Nav />
      <HeaderImg img_link="adopt-hero.png" />
      <PetInfo />
      <Footer />
    </div>
  );
}

export default AdoptPet;
