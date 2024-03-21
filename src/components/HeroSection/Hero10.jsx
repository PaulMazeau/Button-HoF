import React, { useEffect, useState } from 'react';
import HeroContainer from '../../layouts/HeroContainer'; // Adaptez votre HeroContainer pour React
import gsap from 'gsap';
import '../../styles/global.css';
import '../../styles/homepage.css';
import '../../styles/hero/hero10.css';

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

const Hero10 = () => {
useEffect(() => {
  const gallery = document.querySelector(".gallery");

  items.forEach((itemData, index) => {
    const position = itemPositions[index];
    const item = document.createElement("div");
    item.classList.add("item");
    item.style.top = position.top;
    item.style.left = position.left;

    const img = document.createElement("img");
    img.src = itemData.img;
    item.appendChild(img);

    const link = document.createElement("a");
    link.href = itemData.link;
    link.innerHTML = itemData.icon; // Sécurité: Assurez-vous que itemData.icon est sûr
    item.appendChild(link);

    gallery.appendChild(item);
  });

  document.addEventListener("mousemove", (e) => {
    document.querySelectorAll(".item").forEach((item, index) => {
      const animationFactor = items[index].parllaxSpeed;
      const deltaX = (e.clientX - window.innerWidth / 2) * animationFactor;
      const deltaY = (e.clientY - window.innerHeight / 2) * animationFactor;

      gsap.to(item, { x: deltaX, y: deltaY, duration: 0.75 });
    });
  });
}, []);

return (
  <HeroContainer title="Hero 10">
    <div className="header">
      <h1>Bring order to your <br />creative universe</h1>
      <button>Join Waitlist</button>
    </div>
    <div className="gallery"></div>
  </HeroContainer>
);
};

export default Hero10;