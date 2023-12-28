import React from "react";
import "./style.css";
import Nav from "../../components/common/Nav";
import PetInfo from "../../components/page components/AdoptPet/PetInfo";
import Footer from "../../components/common/Footer";
import { useSelector } from "react-redux";
function AdoptPet() {
  return (
    <div>
      <Nav />
      <PetInfo />
      <Footer />
    </div>
  );
}

export default AdoptPet;
