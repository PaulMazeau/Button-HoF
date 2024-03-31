import React, { useEffect, useRef, useState } from 'react';

 export default function Filter1() {
   const sketchRef = useRef(null);
   const containerRef = useRef(null);
   const [isClient, setIsClient] = useState(false);
   const [shapes, setShapes] = useState([]);
   const [imagesLoaded, setImagesLoaded] = useState(false);
   let p5Instance = useRef(null);
 
   useEffect(() => {
     setIsClient(typeof window !== "undefined");
     if (isClient) {
       import('p5').then((p5) => {
         const loadImageAsync = (url) => new Promise((resolve) => {
           new p5.default().loadImage(url, resolve);
         });
 
         Promise.all([
          loadImageAsync("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/fa0a52ad-bdd1-4612-8de5-b55808ca719b/d5947df-df9f2b94-9ab1-435a-af90-6ce96115a2fc.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2ZhMGE1MmFkLWJkZDEtNDYxMi04ZGU1LWI1NTgwOGNhNzE5YlwvZDU5NDdkZi1kZjlmMmI5NC05YWIxLTQzNWEtYWY5MC02Y2U5NjExNWEyZmMuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.WDGvdp2t_oc5yuIJpkhGXJbpVezup5iSzBiJG2ocgCk"),
          loadImageAsync("https://media0.giphy.com/media/l4pTabAGJsmKWkXyo/giphy.gif"),
           loadImageAsync("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/3199e27a-73d4-4ad0-ad41-66bc3fd2f109/dbs64z8-53706708-7b4b-4455-9b83-eb5555eb7fc2.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzMxOTllMjdhLTczZDQtNGFkMC1hZDQxLTY2YmMzZmQyZjEwOVwvZGJzNjR6OC01MzcwNjcwOC03YjRiLTQ0NTUtOWI4My1lYjU1NTVlYjdmYzIuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.rnCLASN2JVtZmCH8sCW4rW6Zmh6iTFkbLU881Pt5j3I"),
           loadImageAsync("https://media1.giphy.com/media/8UI7yuJAZUemJP8bf4/source.gif"),
         ]).then((loadedImages) => {
           setShapes(loadedImages);
           setImagesLoaded(true);
         });
       });
     }
 
     return () => {
       if (p5Instance.current) {
         p5Instance.current.remove(); // Nettoyer l'instance de p5
       }
     };
   }, [isClient]);
 
   useEffect(() => {
     if (isClient && imagesLoaded) {
       import('p5').then((p5) => {
         const sketch = (s) => {
           let camera;
           const vScale = 6;
           const maxColor = 765;
 
           s.setup = () => {
             const { offsetWidth: w, offsetHeight: h } = containerRef.current;
             s.createCanvas(w, h);
             camera = s.createCapture(s.VIDEO);
             camera.size(w, h);
             camera.hide();
           };
 
           s.draw = () => {
             if (!shapes.length) return;
 
             s.clear();
             camera.loadPixels();
 
             for (let y = 0; y < camera.height; y += vScale) {
               for (let x = 0; x < camera.width; x += vScale) {
                 const i = (y * camera.width + x) * 4;
                 const [r, g, b] = [camera.pixels[i], camera.pixels[i + 1], camera.pixels[i + 2]];
                 let gradientToIndex = s.floor((1 - (r + g + b) / maxColor) * (shapes.length - 1));
                 s.image(shapes[gradientToIndex], x, y, vScale, vScale);
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
   }, [isClient, imagesLoaded, shapes]);
 
   return (
     <div className="filter-container" ref={containerRef}>
       <div ref={sketchRef}></div>
     </div>
   );
 }
 