import React, { useEffect, useRef } from 'react';
import HeroContainer from '../../layouts/HeroContainer';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import '../../styles/global.css';
import '../../styles/homepage.css';
import '../../styles/hero/hero5.css';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Hero5 = () => {
  const productImageRef = useRef(null);

  useEffect(() => {
  
    const productCopy = document.querySelector(".product-copy");
    const segmentHeight = (productCopy.scrollHeight - window.innerHeight) / 8;
    function randomCharacter() {
      const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      return chars[Math.floor(Math.random() * chars.length)];
    }

    function revealText(element) {
      const originalText = element.textContent.trim(); // Utilisez textContent directement
      let revealedText = '';
      let index = 0;

      function revealNextLetter() {
        if (index < originalText.length) {
          revealedText += originalText[index];
          let tempText = revealedText;

          for (let i = index + 1; i < originalText.length; i++) {
            tempText += randomCharacter();
          }

          element.textContent = tempText;
          index++;

          setTimeout(revealNextLetter, 50);
        } else {
          element.textContent = originalText;
        }
      }

      revealNextLetter();
    }

    // Sélectionnez tous les éléments <p> avec l'attribut data-text pour l'effet de révélation
    const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span'); // Ajustez cette sélection selon vos besoins
    textElements.forEach((element) => {
      // Appliquer l'effet seulement si l'élément contient du texte visible
      if (element.textContent.trim().length > 0) {
        revealText(element);
      }
    });

  
    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        let currentSegment = Math.floor(self.scroll() / segmentHeight) + 1;
        currentSegment = Math.min(9, Math.max(1, currentSegment));
        if (productImageRef.current) {
          productImageRef.current.src = `./images/product-page/${currentSegment}.png`;
        }
      }
    });
  
    gsap.from(".product-img", { 
      duration: 0.5, 
      x: -100, 
      opacity: 0, 
      delay: 0.5 
    });
  
    gsap.from(".product-vars img", { 
      duration: 0.5, 
      y: 50, 
      opacity: 0, 
      stagger: 0.2, 
      delay: 0.75 
    });
  
    gsap.from(".product-size .size", { 
      duration: 0.5, 
      x: 50, 
      opacity: 0, 
      stagger: 0.025, 
      delay: 1 
    });
  
    gsap.from(".size-btn", { 
      duration: 0.3, 
      scale: 0, 
      delay: 1.25 
    });
  
    gsap.from(".product", { 
      duration: 0.5, 
      y: 50, 
      opacity: 0, 
      stagger: 0.25, 
      delay: 1.5 
    });
    
  }, []);
  
  return (
    <HeroContainer title="Hero 5">
      <div className="page-content">
        <div className="col product-img">
          <div className="product-img-wrapper">
            <img ref={productImageRef} src="./images/product-page/1.png" alt="" />
          </div>
        </div>
        <div class="col product-copy">
          <div class="product-details">
            <p data-text="02. SHIRT ROCK" class="product-name">02. SHIRT ROCK</p>
            <br />
            <p>180.00 USD</p>
            <br />
            <p>- 100% cotton poplin</p>
            <p>- 130gsm</p>
            <p>- shoulder to arm panel</p>
            <p>- underarm to hem panel</p>
            <p>- button closure</p>
            <p>- vertical chest zip pocket</p>
            <p>- waist pockets with zip closure</p>
            <p>- ukk zips</p>
          </div>
  
          <div class="product-vars">
            <img src="./images/product-page/img1.webp" alt="" />
            <img src="./images/product-page/img2.webp" alt="" />
            <img src="./images/product-page/img3.webp" alt="" />
          </div>
  
          <div class="product-size">
            <div class="size">XXS</div>
            <div class="size">XS</div>
            <div class="size">S</div>
            <div class="size">M</div>
            <div class="size">L</div>
            <div class="size">XL</div>
            <div class="size">XXL</div>
          </div>
  
          <button class="size-btn">
            select your size <i class="ph-bold ph-arrow-right"></i>
          </button>
  
          <div class="other-products">
            <div class="product">
              <img src="./images/product-page/product1.webp" alt="" />
              <p>01 BLAZER BEAT</p>
            </div>
            <div class="product">
              <img src="./images/product-page/product2.webp" alt="" />
              <p>03 DENIM DREAM</p>
            </div>
            <div class="product">
              <img src="./images/product-page/product3.webp" alt="" />
              <p>04 BOHO BREEZE</p>
            </div>
            <div class="product">
              <img src="./images/product-page/product4.webp" alt="" />
              <p>05 SILK SAGA</p>
            </div>
          </div>
        </div>
      </div>
    </HeroContainer>
  );
};

export default Hero5;
