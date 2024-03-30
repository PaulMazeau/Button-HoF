import React, { useState, useEffect } from 'react';
import HeroContainer from '../../layouts/HeroContainer';
import '../../styles/global.css';
import '../../styles/homepage.css';
import '../../styles/hero/hero7.css';

const Hero7 = () => {
  // Utiliser l'état pour gérer les pixels actifs
  const [activePixels, setActivePixels] = useState(Array(64).fill(false));

  const handleMouseOver = (index) => {
    setActivePixels(current => 
      current.map((isActive, i) => i === index ? true : isActive)
    );

    setTimeout(() => {
      setActivePixels(current => 
        current.map((isActive, i) => i === index ? false : isActive)
      );
    }, 300);
  };

  return (
    <HeroContainer title="Hero 7">
      <div className="container">
        <div className="img-container">
          <div className="img">
            <img src="./images/01.webp" alt="" />
          </div>
          <div className="img-overlay"></div>
          <div className="img-pixels">
            {activePixels.map((isActive, i) => (
              <div 
                key={i} 
                className={`pixel ${isActive ? 'active' : ''}`} 
                onMouseOver={() => handleMouseOver(i)}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </HeroContainer>
  );
};

export default Hero7;
