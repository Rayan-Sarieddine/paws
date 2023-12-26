import React from "react";

function Downloadbtn({ text, image }) {
  return (
    <div>
      <div className="footer-main_section2-downloadBtn">
        <img src={`/images/productIcons/${image}`} alt="product icon" />
        <p className="footer-main_section2-downloadBtn-p1">Get it on</p>
        <p className="footer-main_section2-downloadBtn-p1">{text}</p>
      </div>
    </div>
  );
}

export default Downloadbtn;
//use <Downloadbtn text="" image="example.png"/>>
