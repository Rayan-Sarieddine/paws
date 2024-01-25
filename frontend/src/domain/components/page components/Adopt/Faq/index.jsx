import React, { useState } from "react";
import "./style.css";

function Faq() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <div className="faq-left">
        <img
          src="./images/Adopt-Page/adopt2.png"
          alt="pets"
          className="faq-pets-image"
        />
      </div>
      <div className="faq-right">
        <p className="faq-title">| FAQ</p>
        <h2 className="faq-header">Frequently asked questions by adopters</h2>
        {[
          {
            question: "How to adopt a pet?",
            answer:
              "The adoption process is very easy and straightforward, all you have to do is choose the pet you want to adopt and submit a request. After that a representative from paws will contact you via phone or email in a period of 3 days.",
          },
          {
            question: "What do I need to adopt a pet?",
            answer: "A kind heart and a ball throwing hand ⚽.",
          },
          {
            question: "What type of pet should I adopt?",
            answer: "The one that makes you happy 😋.",
          },
        ].map((faq, index) => (
          <div
            key={index}
            className="faq-item"
            onClick={() => toggleFAQ(index)}
          >
            <div className="faq-question">
              {faq.question}
              <img
                src={"./images/icons/arrow.svg"}
                className={`arrow ${activeIndex === index ? "rotated" : ""}`}
                alt="toggle"
              />
            </div>
            {activeIndex === index && (
              <div className="faq-answer">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Faq;
