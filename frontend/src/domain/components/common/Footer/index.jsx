import React from "react";
import "./style.css";
import Button from "../Button";
import Downloadbtn from "../DownloadBtn";
import { useNavigate } from "react-router-dom";
function Footer() {
  const navigate = useNavigate();
  //year for copyrights
  const year = new Date().getFullYear();

  //button click handler
  const handleclick = () => {
    navigate("/adopt");
  };
  return (
    <div className="footer">
      <div className="footer-wrapper">
        <div className="footer-main">
          <div className="footer-main_section1">
            <img src="/images/logo/logo-icon-transparent.png" alt="logo" />
            <h3>home</h3>
            <p className="footer-main_title2">of pets</p>
            <Button
              text="ADOPT"
              handleOnClick={handleclick}
              type="button"
              classes={["footer-main_btn"]}
            />
          </div>
          <div className="footer-main_section2">
            <h4>Download Desktop App</h4>
            <p className="footer-main_section2-p">
              Make it easier for yourself to access all our services!
            </p>
            <div className="footer-main_section2-downloadBtns">
              <Downloadbtn text="Mac" image="apple-icon.png" />
              <Downloadbtn text="windows" image="windows-icon.png" />
            </div>
          </div>
          <div className="footer-main_section3">
            <h4>Install App</h4>
            <p className="footer-main_section3-p">
              Keep track of your pet, find your pet a date, post pictures on
              pawstagram and more!
            </p>
            <div className="footer-main_section3-downloadBtns">
              <Downloadbtn text="Google Play" image="play-store-icon.png" />
              <Downloadbtn text="App Store" image="app-store-icon.png" />
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-bottom_copyrights">
            © {year} PAWS by Rayan sarieddine
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
