import React, { useEffect } from 'react';
import HeroContainer from '../../layouts/HeroContainer';
import '../../styles/global.css';
import '../../styles/homepage.css';
import '../../styles/hero/hero1.css';

const HomePage = () => {
  useEffect(() => {
    const motSuiveur = document.getElementById('cursor-word');
    const handlePointerMove = (e) => {
      motSuiveur.style.left = e.pageX + 'px';
      motSuiveur.style.top = e.pageY + 'px';
      motSuiveur.classList.add('visible');
    };

    document.addEventListener('pointermove', handlePointerMove);

    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = 200; // Considérer de réduire si possible pour des performances accrues
    ctx.globalCompositeOperation = "destination-out";

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    let animationFrameId;

    function draw(e) {
      if (!isDrawing) return;
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(e.clientX, e.clientY);
      ctx.stroke();
      [lastX, lastY] = [e.clientX, e.clientY];
    }

    function startDrawing(e) {
      isDrawing = true;
      [lastX, lastY] = [e.clientX, e.clientY];
      draw(e);
    }

    function stopDrawing() {
      isDrawing = false;
      cancelAnimationFrame(animationFrameId);
    }

    canvas.addEventListener("pointerdown", startDrawing);
    canvas.addEventListener("pointermove", (e) => {
      if (isDrawing) {
        animationFrameId = requestAnimationFrame(() => draw(e));
      }
    });
    canvas.addEventListener("pointerup", stopDrawing);
    canvas.addEventListener("pointerout", stopDrawing);

    // Cleanup
    return () => {
      document.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener("pointerdown", startDrawing);
      canvas.removeEventListener("pointermove", draw);
      canvas.removeEventListener("pointerup", stopDrawing);
      canvas.removeEventListener("pointerout", stopDrawing);
    };
  }, []);

  return (
    <HeroContainer title="Hero 1">
      <div id="cursor-word" className="cursor-word">DRAW</div>
      <canvas id='draw'></canvas>
    </HeroContainer>
  );
};

export default HomePage;
