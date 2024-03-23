import React, { useEffect, useRef } from 'react';
import HeroContainer from '../../layouts/HeroContainer'; 
import '../../styles/global.css';
import '../../styles/homepage.css';
import '../../styles/hero/hero7.css';

const Hero7 = () => {
  useEffect(() => {
    const pixels = document.querySelectorAll(".pixel");
    const resetDuration = 300;

    pixels.forEach((pixel) => {
      let timeoutId;

      pixel.addEventListener("mouseover", () => {
        clearTimeout(timeoutId);
        pixel.classList.add("active");
        timeoutId = setTimeout(() => {
          pixel.classList.remove("active");
        }, resetDuration);
      });
    });
  }, []);

  return (
    <HeroContainer title="Hero 7">
      <div className="container">
        <div className="img-container">
          <div className="img">
            <img src="./images/01.webp" alt="" />
          </div>
          <div className="img-overlay"></div>
          <div className="img-pixels">
            {[...Array(64)].map((_, i) => (
              <div key={i} className="pixel"></div>
            ))}
          </div>
        </div>
      </div>
    </HeroContainer>
  );
};

export default Hero7;