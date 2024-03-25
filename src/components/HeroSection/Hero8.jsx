import React, { useEffect, useRef, useState } from 'react';
import HeroContainer from '../../layouts/HeroContainer';
import gsap from 'gsap';
import '../../styles/global.css';
import '../../styles/homepage.css';
import '../../styles/hero/hero8.css';

const Hero8 = () => {
  const sliderRef = useRef(null);
  const wrapperRef = useRef(null);
  const progressBarRef = useRef(null);
  const [sliderItems, setSliderItems] = useState([]);

  useEffect(() => {
    const el = sliderRef.current;
    const wrap = wrapperRef.current;
    const bar = progressBarRef.current;
    const items = sliderItems;
    let progress = 0;
    let startX = 0;
    let wrapWidth = 0;
    let maxScroll = 0;
    let isDragging = false;

    const calculate = () => {
      wrapWidth = items[0]?.clientWidth * items.length;
      wrap.style.width = `${wrapWidth}px`;
      maxScroll = wrapWidth - el.clientWidth;
    };

    const move = (delta) => {
      progress = Math.max(0, Math.min(progress + delta, maxScroll));

      gsap.to(wrap, { x: -progress, ease: "none" });
      gsap.to(bar, { scaleX: progress / maxScroll, transformOrigin: "left", ease: "none" });
    };

    const handleTouchStart = (e) => {
      isDragging = true;
      startX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
      e.preventDefault();
    };

    const handleTouchMove = (e) => {
      if (!isDragging) return;
      const x = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
      const delta = (startX - x) * 2; // Adjust multiplier for sensitivity
      move(delta);
      startX = x;
      e.preventDefault();
    };

    const handleTouchEnd = () => {
      isDragging = false;
    };

    el.addEventListener("mousedown", handleTouchStart);
    window.addEventListener("mousemove", handleTouchMove);
    window.addEventListener("mouseup", handleTouchEnd);
    el.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);

    calculate();

    // Cleanup function
    return () => {
      el.removeEventListener("mousedown", handleTouchStart);
      window.removeEventListener("mousemove", handleTouchMove);
      window.removeEventListener("mouseup", handleTouchEnd);
      el.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [sliderItems]); // Make sure to re-bind events if sliderItems change

  return (
    <HeroContainer title="Hero 8">
      <a id="showreel" href="#">Showreel</a>
      <div className="slider" ref={sliderRef}>
        <div className="slider-wrapper" ref={wrapperRef}>
          {Array.from({ length: 6 }).map((_, index) => (
            <div className="slider-item" key={index} ref={(el) => {
              // Ensure we're not overwriting existing refs
              if (el && !sliderItems.includes(el)) {
                setSliderItems((prevItems) => [...prevItems, el]);
              }
            }}>
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
