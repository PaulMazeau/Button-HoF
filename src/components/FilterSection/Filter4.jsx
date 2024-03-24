import React, { useEffect, useRef, useState } from 'react';

export default function Filter4() {
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
            video.hide();
          };

          s.draw = () => {
            video.loadPixels();
            s.loadPixels();

            for (let y = 0; y < s.height; y++) {
              for (let x = 0; x < s.width; x++) {
                const index = (x + y * s.width) * 4;
                const r = video.pixels[index + 0];
                const g = video.pixels[index + 1];
                const b = video.pixels[index + 2];

                const bright = (r + g + b) / 3;

                if (bright < 85) {
                  s.pixels[index + 0] = 255; // Rouge
                  s.pixels[index + 1] = 0;   // Vert
                  s.pixels[index + 2] = 0;   // Bleu
                } else if (bright < 170) {
                  s.pixels[index + 0] = 0;   // Rouge
                  s.pixels[index + 1] = 255; // Vert
                  s.pixels[index + 2] = 0;   // Bleu
                } else {
                  s.pixels[index + 0] = 0;   // Rouge
                  s.pixels[index + 1] = 0;   // Vert
                  s.pixels[index + 2] = 255; // Bleu
                }
                s.pixels[index + 3] = 255; // Alpha
              }
            }
            s.updatePixels();
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
