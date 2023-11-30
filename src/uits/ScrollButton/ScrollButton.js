import React from 'react'
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import "animate.css";

const ScrollButton = () => {
   const [showTopBtn, setShowTopBtn] = useState(false);

   const goToTop = () => {
     window.scrollTo({
       top: 0,
       behavior: "smooth",
     });
   };

   useEffect(() => {
     window.addEventListener("scroll", () => {
       if (window.scrollY > 100) {
         setShowTopBtn(true);
       } else {
         setShowTopBtn(false);
       }
     });
   }, []);

  return (
    <div className="fixed bottom-14 right-5">
      {showTopBtn && (
        <button
          onClick={goToTop}
          className="bg-yellow-500 text-2xl rounded-sm md:text-3xl text-white p-1 animate__animated animate__shakeY animate__slower animate__delay-9000s animate__infinite"
        >
          <i className="ri-arrow-up-double-line"></i>
        </button>
      )}
    </div>
  );
}

export default ScrollButton
