import React, { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import HeroContainer from '../../layouts/HeroContainer'; 
import '../../styles/global.css';
import '../../styles/homepage.css';
import '../../styles/hero/hero4.css';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Hero4 = () => {
  useEffect(() => {
    let iteration = 0;
    const spacing = 0.05;
    const snap = gsap.utils.snap(spacing);
    const cards = gsap.utils.toArray(".cards li");
    const seamlessLoop = buildSeamlessLoop(cards, spacing);
    const scrub = gsap.to(seamlessLoop, {
      totalTime: 0,
      duration: 0.5,
      ease: "power3",
      paused: true,
    });

    ScrollTrigger.create({
      start: 0,
      end: "+=3000",
      pin: ".gallery-hero4",
      onUpdate(self) {
        if (self.progress === 1 && self.direction > 0 && !self.wrapping) {
          wrapForward(self);
        } else if (self.progress < 1e-5 && self.direction < 0 && !self.wrapping) {
          wrapBackward(self);
        } else {
          scrub.vars.totalTime = snap((iteration + self.progress) * seamlessLoop.duration());
          scrub.invalidate().restart();
          self.wrapping = false;
        }
      },
    });

    function wrapForward(trigger) {
      iteration++;
      trigger.wrapping = true;
      trigger.scroll(trigger.start + 1);
    }

    function wrapBackward(trigger) {
      iteration--;
      if (iteration < 0) {
        iteration = 9;
        seamlessLoop.totalTime(seamlessLoop.totalTime() + seamlessLoop.duration() * 10);
        scrub.pause();
      }
      trigger.wrapping = true;
      trigger.scroll(trigger.end - 1);
    }

    function buildSeamlessLoop(items, spacing) {
      let overlap = Math.ceil((1 / spacing) * 2);
      let startTime = items.length * spacing + 0.5;
      let loopTime = (items.length + overlap) * spacing + 1;
      let rawSequence = gsap.timeline({ paused: true });
      let seamlessLoop = gsap.timeline({
        paused: true,
        repeat: -1,
        onRepeat() {
          this._time === this._dur && (this._tTime += this._dur - 0.05);
        },
      });
      let l = items.length + overlap * 2;
      let time = 0;

      gsap.set(items, { yPercent: 400, opacity: 1, scale: 0 });

      for (let i = 0; i < l; i++) {
        let index = i % items.length;
        let item = items[index];
        time = i * spacing;
        rawSequence
          .fromTo(
            item,
            { scale: 0, opacity: 1 },
            {
              scale: 1,
              opacity: 1,
              zIndex: 100,
              duration: 0.5,
              yoyo: true,
              repeat: 1,
              ease: "power1.in",
              immediateRender: false,
            },
            time
          )
          .fromTo(
            item,
            { yPercent: 300 },
            {
              yPercent: -200,
              duration: 1,
              ease: "none",
              immediateRender: false,
            },
            time
          );
        if (i <= items.length) {
          seamlessLoop.add(`label${i}`, time);
        }
      }

      rawSequence.time(startTime);
      seamlessLoop
        .to(rawSequence, {
          time: loopTime,
          duration: loopTime - startTime,
          ease: "none",
        })
        .fromTo(
          rawSequence,
          { time: overlap * spacing + 1 },
          {
            time: startTime,
            duration: startTime - (overlap * spacing + 1),
            immediateRender: false,
            ease: "none",
          }
        );

      return seamlessLoop;
    }

   // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((instance) => instance.kill());
      scrub.kill();
      seamlessLoop.kill();
    };
  }, []);

  return (
    <HeroContainer title="Hero4">
      <div className="gallery-hero4">
        <ul className="cards">
          {Array.from({ length: 20 }, (_, i) => (
            <li key={i}></li>
          ))}
        </ul>
      </div>
    </HeroContainer>
  );
};

export default Hero4;
