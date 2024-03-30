import React, { useEffect } from 'react';
import HeroContainer from '../../layouts/HeroContainer';
import gsap from 'gsap';
import '../../styles/global.css';
import '../../styles/homepage.css';
import '../../styles/hero/hero3.css';

const items = [
    {
        img: "./images/01.webp",
        icon: "<i class='ph ph-meta-logo'></i>",
        link: "instagram.com",
        parllaxSpeed: 0.065,
    },
    {
        img: "./images/02.webp",
        icon: "<i class='ph-bold ph-pinterest-logo'></i>",
        link: "google.com",
        parllaxSpeed: 0.05,
    },
    {
        img: "./images/03.webp",
        icon: "<i class='ph ph-instagram-logo'></i>",
        link: "google.com",
        parllaxSpeed: 0.08,
    },
    {
        img: "./images/04.webp",
        icon: "<i class='ph ph-meta-logo'></i>",
        link: "instagram.com",
        parllaxSpeed: 0.1,
    },
    {
        img: "./images/05.webp",
        icon: "<i class='ph ph-instagram-logo'></i>",
        link: "google.com",
        parllaxSpeed: 0.07,
    },
    {
        img: "./images/06.webp",
        icon: "<i class='ph-bold ph-pinterest-logo'></i>",
        link: "google.com",
        parllaxSpeed: 0.085,
    },
    {
        img: "./images/07.webp",
        icon: "<i class='ph ph-instagram-logo'></i>",
        link: "instagram.com",
        parllaxSpeed: 0.06,
    },
    {
        img: "./images/08.webp",
        icon: "<i class='ph-bold ph-pinterest-logo'></i>",
        link: "google.com",
        parllaxSpeed: 0.04,
    },
    {
        img: "./images/09.webp",
        icon: "<i class='ph ph-instagram-logo'></i>",
        link: "instagram.com",
        parllaxSpeed: 0.1,
    },
    {
        img: "./images/10.webp",
        icon: "<i class='ph ph-instagram-logo'></i>",
        link: "google.com",
        parllaxSpeed: 0.065,
    },
];

const itemPositions = [
  // Vos positions spécifiques pour chaque item
  { top: "-5%", left: "5%" },
  { top: "40%", left: "-5%" },
  { top: "25%", left: "20%" },
  { top: "60%", left: "40%" },
  { top: "70%", left: "10%" },
  { top: "-10%", left: "65%" },
  { top: "10%", left: "85%" },
  { top: "40%", left: "60%" },
  { top: "80%", left: "70%" },
  { top: "50%", left: "95%" },
];

const Hero3 = () => {
  useEffect(() => {
    const moveItems = (e) => {
      items.forEach((item, index) => {
        const animationFactor = item.parllaxSpeed;
        const deltaX = (e.clientX - window.innerWidth / 2) * animationFactor;
        const deltaY = (e.clientY - window.innerHeight / 2) * animationFactor;

        gsap.to(`.item-hero3-${index}`, { x: deltaX, y: deltaY, duration: 0.75 });
      });
    };

    document.addEventListener("mousemove", moveItems);

    // Cleanup function
    return () => {
      document.removeEventListener("mousemove", moveItems);
    };
  }, []);

  return (
    <HeroContainer title="Hero 3">
      <div className="header-hero3">
        <h1 className='h1-hero3'>Bring order to your <br />creative universe</h1>
        <button className='button-hero3'>Join Backr00m</button>
      </div>
      <div className="gallery-hero3">
        {items.map((item, index) => (
          <div className={`item-hero3 item-hero3-${index}`} style={{ top: itemPositions[index].top, left: itemPositions[index].left }} key={index}>
            <img src={item.img} className="img-hero3" alt="" style={{ opacity: "0.5" }}/>
            <a href={item.link} dangerouslySetInnerHTML={{ __html: item.icon }}></a>
          </div>
        ))}
      </div>
    </HeroContainer>
  );
};

export default Hero3;
