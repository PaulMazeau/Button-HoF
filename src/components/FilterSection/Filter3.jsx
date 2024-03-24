import React, { useEffect, useRef, useState } from 'react';

export default function Filter3() {
  const sketchRef = useRef();
  const containerRef = useRef();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(typeof window !== "undefined");
    if (isClient) {
      import('p5').then((p5) => {
        const sketch = (s) => {
          let video;

          s.setup = () => {
            const { offsetWidth: w, offsetHeight: h } = containerRef.current;
            s.createCanvas(w, h);
            video = s.createCapture(s.VIDEO);
            video.size(w, h);
            video.hide(); // Cachez l'élément vidéo HTML pour utiliser le canvas p5
          };

          s.draw = () => {
            s.background(0);
            // Dessinez la vidéo sur le canevas
            s.image(video, 0, 0, s.width, s.height);
            // Appliquez le filtre pour inverser les couleurs
            s.filter(s.INVERT);
            // Appliquez un filtre de seuil pour augmenter le contraste
            s.filter(s.THRESHOLD);
          };
        };

        new p5.default(sketch, sketchRef.current);
      });
    }
  }, [isClient]);

  return (
    <div className="filter-container" ref={containerRef}>
      <div ref={sketchRef}></div>
    </div>
  );
}
