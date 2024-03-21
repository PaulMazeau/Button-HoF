import React, { useEffect, useRef } from 'react';
import HeroContainer from '../../layouts/HeroContainer'; // Assurez-vous d'avoir adapté HeroContainer pour React
import gsap from 'gsap';
import '../../styles/global.css';
import '../../styles/homepage.css';
import '../../styles/hero/hero8.css';

const Hero8 = () => {
  const sliderRef = useRef(null);
  const wrapperRef = useRef(null);
  const progressBarRef = useRef(null);
  const sliderItems = useRef([]);

  useEffect(() => {
    const el = sliderRef.current;
    const wrap = wrapperRef.current;
    const bar = progressBarRef.current;
    const items = sliderItems.current;
    let progress = 0;
    let wrapWidth = 0;
    let maxScroll = 0;

    const calculate = () => {
      wrapWidth = items[0].clientWidth * items.length;
      wrap.style.width = `${wrapWidth}px`;
      maxScroll = wrapWidth - el.clientWidth;
    };

    const move = (delta) => {
      progress += delta;
      progress = Math.max(0, Math.min(progress, maxScroll));

      gsap.to(wrap, { x: -progress, ease: "none" });
      gsap.to(bar, { scaleX: progress / maxScroll, transformOrigin: "left", ease: "none" });
    };

    // Event listeners for mouse and touch
    const handleWheel = (e) => move(e.deltaY);
    const handleTouchStart = (e) => e.preventDefault();
    const handleTouchMove = (e) => {}; // Implement touch move logic here
    const handleTouchEnd = () => {}; // Implement touch end logic here

    // Add event listeners
    window.addEventListener("resize", calculate);
    el.addEventListener("wheel", handleWheel);
    el.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);

    calculate(); // Initial calculation

    // Cleanup function
    return () => {
      window.removeEventListener("resize", calculate);
      el.removeEventListener("wheel", handleWheel);
      el.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    <HeroContainer title="Hero 8">
      <a id="showreel" href="#">Showreel</a>
      <div className="slider" ref={sliderRef}>
        <div className="slider-wrapper" ref={wrapperRef}>
          {Array.from({ length: 6 }).map((_, index) => (
            <div className="slider-item" key={index} ref={(el) => (sliderItems.current[index] = el)}>
              <figure>
                <img src={`./images/0${index + 1}.webp`} alt="" />
              </figure>
            </div>
          ))}
        </div>
        <div className="slider-progress">
          <div className="slider-progress-bar" ref={progressBarRef}></div>
        </div>
      </div>
    </HeroContainer>
  );
};

export default Hero8;
