import React, { useEffect, useState } from 'react';
import HeroContainer from '../../layouts/HeroContainer'; // Assurez-vous d'avoir adapté HeroContainer pour React
import gsap from 'gsap';
import '../../styles/global.css';
import '../../styles/homepage.css';
import '../../styles/hero/hero9.css';

const Hero9 = () => {
  const [counterValue, setCounterValue] = useState(29);

  useEffect(() => {
    const startLoader = () => {
      let currentValue = counterValue;

      const updateCounter = () => {
        if (currentValue >= 100) return;

        currentValue += Math.floor(Math.random() * 10) + 1;
        currentValue = currentValue > 100 ? 100 : currentValue;

        setCounterValue(currentValue);

        const delay = Math.floor(Math.random() * 200) + 50;
        setTimeout(updateCounter, delay);
      };

      updateCounter();
    };

    startLoader();

    gsap.to(".counter", { delay: 3.5, opacity: 0, duration: 0.25 });
    gsap.to(".bar", {
      delay: 3.5,
      height: 0,
      stagger: { amount: 0.5 },
      ease: "power4.inOut",
      duration: 1.5
    });
    gsap.from(".h1", {
      delay: 4,
      y: 700,
      stagger: { amount: 0.5 },
      ease: "power4.inOut",
      duration: 1.5
    });
    gsap.from(".hero", {
      delay: 4.5,
      y: 400,
      ease: "power4.inOut",
      duration: 2
    });
  }, [counterValue]);

  return (
    <HeroContainer title="Hero 9">
      <h2 className="counter">{counterValue}</h2>

      <div className="overlay">
        {Array.from({ length: 10 }).map((_, index) => (
          <div className="bar" key={index}></div>
        ))}
      </div>

      <div className="container">
        <div className="header">
          {['P', 'a', 'u', 'l', '.'].map((letter, index) => (
            <div className="h1" key={index}>{letter}</div>
          ))}
        </div>
        <div className="hero">
          <img src="./images/01.webp" alt="" />
        </div>
      </div>
    </HeroContainer>
  );
};

export default Hero9;
