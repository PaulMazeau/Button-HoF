import React, { useEffect, useRef, useState } from 'react';

export default function Filter7() {
  const sketchRef = useRef(null);
  const containerRef = useRef(null);
  const [isClient, setIsClient] = useState(false);
  let p5Instance = useRef(null); 

  useEffect(() => {
    setIsClient(typeof window !== "undefined");

    if (isClient) {
      import('p5').then((p5) => {
        const sketch = (s) => {
          let video;
          const asciiDensity = 'N@#$9876543210?!abc;:+=-,._';
          const sampleSize = 5;

          s.setup = () => {
            const { offsetWidth: w, offsetHeight: h } = containerRef.current;
            s.createCanvas(w, h);
            video = s.createCapture(s.VIDEO);
            video.size(w / sampleSize, h / sampleSize);
            video.hide();
          };

          s.draw = () => {
            s.background(25);
            video.loadPixels();

            for (let x = 0; x < video.width; x++) {
              for (let y = 0; y < video.height; y++) {
                const pixelPos = (x + y * video.width) * 4;
                const r = video.pixels[pixelPos + 0];
                const g = video.pixels[pixelPos + 1];
                const b = video.pixels[pixelPos + 2];
                const avgBrightness = (r + g + b) / 3;
                const densityCharIndex = s.floor(s.map(avgBrightness, 0, 255, asciiDensity.length - 1, 0));
                
                s.fill(255);
                s.noStroke();
                s.textSize(sampleSize * 1.5); // Adapt la taille du texte pour correspondre à sampleSize
                s.text(asciiDensity.charAt(densityCharIndex), x * sampleSize, y * sampleSize);
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

    // Clean Up
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
