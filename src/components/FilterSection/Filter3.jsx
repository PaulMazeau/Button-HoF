import React, { useEffect, useRef, useState } from 'react';

export default function Filter3() {
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

          s.setup = () => {
            const { offsetWidth: w, offsetHeight: h } = containerRef.current;
            s.createCanvas(w, h);
            video = s.createCapture(s.VIDEO);
            video.size(w, h);
            video.hide();
          };

          s.draw = () => {
            s.background(0);
            s.image(video, 0, 0, s.width, s.height);
            s.filter(s.INVERT);
            s.filter(s.THRESHOLD);
          };
        };

        if (p5Instance.current) {
          p5Instance.current.remove(); // Supprime l'instance précédente p5
        }

        p5Instance.current = new p5.default(sketch, sketchRef.current);
      });
    }

    return () => {
      if (p5Instance.current) {
        p5Instance.current.remove(); // Nettoyage de l'instance de p5
      }
    };
  }, [isClient]);

  return (
    <div className="filter-container" ref={containerRef}>
      <div ref={sketchRef}></div>
    </div>
  );
}
