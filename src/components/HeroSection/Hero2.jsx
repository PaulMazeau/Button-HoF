import React, { useEffect } from 'react';
import HeroContainer from '../../layouts/HeroContainer'; // Assurez-vous que HeroContainer est converti en composant React
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import '../../styles/global.css';
import '../../styles/homepage.css';
import '../../styles/hero/hero2.css';

const Hero2 = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    let wheel = document.querySelector(".wheel");
    let images = gsap.utils.toArray(".wheel__card");

    const setup = () => {
      let radius = wheel.offsetWidth / 2;
      let center = wheel.offsetWidth / 2;
      let total = images.length;
      let slice = (2 * Math.PI) / total;

      images.forEach((item, i) => {
        let angle = i * slice;
        let el = item;

        let x = center + radius * Math.sin(angle);
        let y = center - radius * Math.cos(angle);

        gsap.set(el, {
          rotation: angle + "_rad",
          xPercent: -50,
          yPercent: -50,
          x: x,
          y: y,
        });
      });
    };

    gsap.to(".wheel", {
      rotate: () => -360,
      ease: "none",
      duration: images.length,
      scrollTrigger: {
        trigger: ".wheel",
        start: 0,
        end: "max",
        scrub: 1,
        snap: 1 / images.length,
        invalidateOnRefresh: true,
      },
    });

    setup();
    window.addEventListener("resize", setup);

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(instance => instance.kill());
      window.removeEventListener("resize", setup);
    };
  }, []);

  return (
    <HeroContainer title="Hero 2">
      <div className="container-animation">
      <div className="header">
        <h1>
          Human stories, <br />
          Superhuman audiovisuals
        </h1>
      </div>
      <section className="slider-section">
        <div className="wheel">
          {Array.from({ length: 30 }, (_, i) => (
            <div className="wheel__card" key={i}>
              <img src={`./images/${String(i % 10 + 1).padStart(2, '0')}.webp`} alt={`Image ${i + 1}`} />
            </div>
          ))}
        </div>
      </section>
      </div>
    </HeroContainer>
  );
};

export default Hero2;
