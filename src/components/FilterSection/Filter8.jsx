import React, { useEffect, useRef, useState } from 'react';

export default function Filter8() {
  const sketchRef = useRef();
  const containerRef = useRef();
  const [isClient, setIsClient] = useState(false);
  let p5Instance = useRef(null); // Utilise useRef pour stocker l'instance p5


  useEffect(() => {
    setIsClient(typeof window !== "undefined");
    if (isClient) {
      import('p5').then((p5) => {
        const sketch = (s) => {
          let video;
          const asciiDensity = 'N@#$9876543210?!abc;:+=-,._';
          const sampleSize = 10; // Modifier cette valeur pour changer la densité des caractères

          s.setup = () => {
            const { offsetWidth: w, offsetHeight: h } = containerRef.current;
            s.createCanvas(w, h);
            video = s.createCapture(s.VIDEO);
            video.size(w, h);
            video.hide(); // Cachez l'élément vidéo HTML pour utiliser le canvas p5
          };

          s.draw = () => {
            s.background(25);
            let w = s.width / video.width;
            let h = s.height / video.height;
            video.loadPixels(); // Chargement des pixels du flux vidéo

            for (let x = 0; x < video.width; x += sampleSize) {
              for (let y = 0; y < video.height; y += sampleSize) {
                const pixelPos = (x + y * video.width) * 4;
                const r = video.pixels[pixelPos + 0];
                const g = video.pixels[pixelPos + 1];
                const b = video.pixels[pixelPos + 2];
                const avg_brightness = (r + g + b) / 3;
                s.fill(255);
                s.noStroke();
                const density_charIndex = s.floor(s.map(avg_brightness, 10, 220, asciiDensity.length, 0));
                s.textSize(w * (sampleSize / 3)); // Ajustement de la taille du texte
                s.textAlign(s.CENTER, s.CENTER);
                s.text(asciiDensity.charAt(density_charIndex), x * w + w * 0.5, y * h + h * 0.5);
              }
            }
          };
        };

        if (p5Instance.current) {
          p5Instance.current.remove(); // Supprimer l'instance précédente de p5
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
