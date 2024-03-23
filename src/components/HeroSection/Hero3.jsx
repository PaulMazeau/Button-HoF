import React, { useEffect } from 'react';
import HeroContainer from '../../layouts/HeroContainer';
import gsap from 'gsap';
import '../../styles/global.css';
import '../../styles/homepage.css';
import '../../styles/hero/hero3.css';

const Hero3 = () => {
  useEffect(() => {
    const gallery = document.getElementById("gallery");
    const blocks = document.querySelectorAll(".block");

    const updateGalleryPosition = (e) => {
      const mouseX = e.clientX, mouseY = e.clientY;
      const xDecimal = mouseX / window.innerWidth, yDecimal = mouseY / window.innerHeight;
      const maxX = gallery.offsetWidth - window.innerWidth, maxY = gallery.offsetHeight - window.innerHeight;
      const panX = maxX * xDecimal * -1, panY = maxY * yDecimal * -1;

      gallery.style.transform = `translate(${panX}px, ${panY}px)`;
    };

    const updateBlockScale = (e) => {
      let i = blocks.length, dx, dy;
      const radius = 300, maxScale = 3, radius2 = radius * radius;

      while (i--) {
        const block = blocks[i];
        const rect = block.getBoundingClientRect();
        const cx = rect.left + rect.width / 2 + window.scrollX;
        const cy = rect.top + rect.height / 2 + window.scrollY;
        
        dx = (cx - e.pageX) ** 2;
        dy = (cy - e.pageY) ** 2;
        const distance = Math.sqrt(dx + dy);
        const scale = Math.max(1, maxScale * (1 - distance / radius));

        gsap.to(block, { scale: scale, ease: "power1.in" });
      }
    };

    document.addEventListener("mousemove", updateGalleryPosition);
    document.addEventListener("mousemove", updateBlockScale);

    // Cleanup
    return () => {
      document.removeEventListener("mousemove", updateGalleryPosition);
      document.removeEventListener("mousemove", updateBlockScale);
    };
  }, []);

  return (
    <HeroContainer title="Hero 3">
      <div id="gallery">
        {Array.from({ length: 30 }, (_, i) => (
          <div className="block" key={i}></div>
        ))}
      </div>
    </HeroContainer>
  );
};

export default Hero3;
