import React from "react";
import "./style.css";
function Footer() {
  const year = new Date().getFullYear;
  return (
    <div className="footer">
      <div className="footer-main">
        <div className="footer-main_section1">
          <img src="" alt="logo" />
          <p>home</p>
          <p>of pets</p>
        </div>
        <div className="footer-main_section2"></div>
        <div className="footer-main_section3"></div>
      </div>
      <div className="footer-bottom">
        <p className="footer-bottom_copyrights">
          © {year} PAWS by Rayan sarieddine
        </p>
      </div>
    </div>
  );
}

export default Footer;
