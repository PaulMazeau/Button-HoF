import React, { useEffect, useRef } from 'react';
import HeroContainer from '../../layouts/HeroContainer'; // Assurez-vous que HeroContainer est adapté à React
import gsap from 'gsap';
import '../../styles/global.css';
import '../../styles/homepage.css';
import '../../styles/hero/hero6.css';

const Hero6 = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const positions = [
      { top: "0%", left: "0%" },
      { top: "0%", left: "10%" },
      { top: "0%", left: "60%" },
      { top: "16%", left: "15%" },
      { top: "16%", left: "40%" },
      { top: "16%", left: "90%" },
      { top: "32%", left: "50%" },
      { top: "32%", left: "75%" },
      { top: "48%", left: "0%" },
      { top: "64%", left: "30%" },
      { top: "64%", left: "50%" },
      { top: "64%", left: "90%" },
      { top: "80%", left: "20%" },
      { top: "80%", left: "70%" },
    ];

    const imgs = gsap.utils.toArray(".img-hero6", containerRef.current);
    gsap.set(imgs, {
      top: "45%",
      left: "50%",
      transform: "translate(-50%, -50%) scale(0)",
    });

    gsap.from("p", {
      y: 40,
      ease: "power4.inOut",
      duration: 1,
      stagger: {
        amount: 0.15,
      },
      delay: 0.5,
    });

    gsap.to(imgs, {
      scale: 1,
      width: "300px",
      height: "400px",
      stagger: 0.15,
      duration: 0.75,
      ease: "power2.out",
      delay: 1,
      onComplete: scatterAndShrink,
    });

    function scatterAndShrink() {
      gsap.to(imgs, {
        top: (i) => positions[i].top,
        left: (i) => positions[i].left,
        transform: "none",
        width: "75px",
        height: "100px",
        stagger: 0.075,
        duration: 0.75,
        ease: "power2.out",
      });
    }
  }, []);

  return (
    <HeroContainer title="Hero 6">
      <div className="container" ref={containerRef}>
      <div class="header">
          <div class="text">
            <p>In a future</p>
          </div>
          <div class="text">
            <p>not too distant</p>
          </div>
        </div>
        <div class="gallery">
          <div class="img-hero6">
            <img src="./images/01.webp" alt="" />
          </div>
          <div class="img">
            <img src="./images/02.webp" alt="" />
          </div>
          <div class="img">
            <img src="./images/03.webp" alt="" />
          </div>
          <div class="img">
            <img src="./images/04.webp" alt="" />
          </div>
          <div class="img">
            <img src="./images/05.webp" alt="" />
          </div>
          <div class="img">
            <img src="./images/06.webp" alt="" />
          </div>
          <div class="img">
            <img src="./images/07.webp" alt="" />
          </div>
          <div class="img">
            <img src="./images/08.webp" alt="" />
          </div>
          <div class="img">
            <img src="./images/09.webp" alt="" />
          </div>
          <div class="img">
            <img src="./images/10.webp" alt="" />
          </div>
          <div class="img">
            <img src="./images/11.webp" alt="" />
          </div>
          <div class="img">
            <img src="./images/01.webp" alt="" />
          </div>
          <div class="img">
            <img src="./images/02.webp" alt="" />
          </div>
          <div class="img">
            <img src="./images/03.webp" alt="" />
          </div>
        </div>
      </div>
    </HeroContainer>
  );
};

export default Hero6;
