import React from "react";
import Nav from "../../components/common/Nav";

import Footer from "../../components/common/Footer";
import NoMatch from "../../components/page components/LostFoundNoMatch/NoMatch";
import HeaderImg from "../../components/common/HeaderImg";

function LostFoundNoMatch() {
  return (
    <div>
      <Nav />
      <HeaderImg img_link="found-hero.png" />
      <NoMatch />
      <Footer />
    </div>
  );
}

export default LostFoundNoMatch;
