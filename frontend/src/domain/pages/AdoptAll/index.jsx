import React from "react";
import "./style.css";
import Nav from "../../components/common/Nav";
import PetsShow from "../../components/page components/AdoptAll/PetsShow";
import Footer from "../../components/common/Footer";
function AdoptAll() {
  return (
    <div>
      <Nav />
      <PetsShow />
      <Footer />
    </div>
  );
}

export default AdoptAll;
