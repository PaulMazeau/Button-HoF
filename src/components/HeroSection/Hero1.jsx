import React, { useEffect } from 'react';
import HeroContainer from '../../layouts/HeroContainer';
import '../../styles/global.css';
import '../../styles/homepage.css';
import '../../styles/hero/hero1.css';

const HomePage = () => {
  useEffect(() => {
    const handlePointerMove = (e) => {
      var motSuiveur = document.getElementById('cursor-word');
      motSuiveur.style.left = e.pageX + 'px';
      motSuiveur.style.top = e.pageY + 'px';
      motSuiveur.style.display = 'block';
    };

    document.addEventListener('pointermove', handlePointerMove);

    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = 200;
    ctx.globalCompositeOperation = "destination-out";

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    const draw = (e) => {
      if (!isDrawing) return;
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(e.clientX, e.clientY);
      ctx.stroke();
      [lastX, lastY] = [e.clientX, e.clientY];
    };

    canvas.addEventListener("pointerdown", (e) => {
      isDrawing = true;
      [lastX, lastY] = [e.clientX, e.clientY];
    });

    canvas.addEventListener("pointermove", draw);
    canvas.addEventListener("pointerup", () => (isDrawing = false));
    canvas.addEventListener("pointerout", () => (isDrawing = false));

    // Cleanup
    return () => {
      document.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener("pointerdown", draw);
      canvas.removeEventListener("pointermove", draw);
      canvas.removeEventListener("pointerup", draw);
      canvas.removeEventListener("pointerout", draw);
    };
  }, []);

  return (
    <HeroContainer title="Hero 1">
      <div id="cursor-word">CLICK</div>
      <canvas id="draw"></canvas>
    </HeroContainer>
  );
};

export default HomePage;
