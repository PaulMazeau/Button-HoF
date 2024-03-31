import React, { useEffect, useRef, useState } from 'react';

export default function Filter6() {
  const sketchRef = useRef(null);
  const containerRef = useRef(null);
  const [isClient, setIsClient] = useState(false);
  let p5Instance = useRef(null); // Utilise useRef pour stocker l'instance p5

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
            video.hide(); // Cache l'élément vidéo HTML pour utiliser le canvas p5
          };

          s.draw = () => {
            video.loadPixels();
            s.loadPixels();

            // Optimisation : Boucle unique pour le traitement des pixels
            for (let i = 0; i < video.pixels.length; i += 4) {
              const r = video.pixels[i];
              const g = video.pixels[i + 1];
              const b = video.pixels[i + 2];

              const gray = (r + g + b) / 3;
              let grayShade = 255 - gray; // Inverse les niveaux de gris

              s.pixels[i] = grayShade; // Rouge
              s.pixels[i + 1] = grayShade; // Vert
              s.pixels[i + 2] = grayShade; // Bleu
              s.pixels[i + 3] = 255; // Alpha
            }
            s.updatePixels();
          };
        };

        if (p5Instance.current) {
          p5Instance.current.remove(); // Supprime l'instance précédente de p5
        }
        p5Instance.current = new p5.default(sketch, sketchRef.current);
      });
    }

    // Fonction de nettoyage
    return () => {
      if (p5Instance.current) {
        p5Instance.current.remove(); // Nettoie l'instance de p5
      }
    };
  }, [isClient]);

  return (
    <div className="filter-container" ref={containerRef}>
      <div ref={sketchRef}></div>
    </div>
  );
}
