// Continuation de votre composant Navbar

import { useEffect } from 'react';

const Navbar = ({ onPreviousClick, onNextClick }) => {
  
  useEffect(() => {
    const audioControl = document.getElementById('audioControl');
    const audio = document.getElementById('backgroundMusic');

    const toggleSound = () => {
      if (audio.paused) {
        audio.play();
        audioControl.textContent = 'SOUND OFF';
      } else {
        audio.pause();
        audioControl.textContent = 'SOUND ON';
      }
    };

    audioControl.addEventListener('click', toggleSound);

    // Cleanup
    return () => audioControl.removeEventListener('click', toggleSound);
  }, []);

  return (
    <div class="nav-bar">
        <a id="prev-hero" class="links" onClick={onPreviousClick}>Previous hero</a>
        <a class="links" href="/">Back Home</a>
        <a id="audioControl" class="links" onClick={() => {}}>Sound Off</a> 
        <a id="next-hero" class="links" onClick={onNextClick}>Next hero</a>
        <audio id="backgroundMusic" loop preload="auto" transition:persist>
            <source src="/TRAPAUL.mp3" type="audio/mp3" />
        </audio> 
    </div>
  );
};
  
  export default Navbar;
