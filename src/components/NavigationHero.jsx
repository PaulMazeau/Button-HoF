// Continuation de votre composant Navbar

import { useEffect } from 'react';

const Navbar = ({ onPreviousClick, onNextClick }) => {
  
  useEffect(() => {
    const audioControl = document.getElementById('audioControl');
    const audio = document.getElementById('backgroundMusic');

    const toggleSound = () => {
      if (audio.paused) {
        audio.play();
        audioControl.textContent = 'SOUND ON';
      } else {
        audio.pause();
        audioControl.textContent = 'SOUND OFF';
      }
    };

    audioControl.addEventListener('click', toggleSound);

    // Cleanup
    return () => audioControl.removeEventListener('click', toggleSound);
  }, []);

  return (
    <div className="nav-bar">
        <a id="prev-hero" className="links" onClick={onPreviousClick}>Previous hero</a>
        <a className="links" href="/">Back Home</a>
        <a id="audioControl" className="links" onClick={() => {}}>Sound Off</a> 
        <a id="next-hero" className="links" onClick={onNextClick}>Next hero</a>
        <audio id="backgroundMusic" loop preload="auto">
            <source src="/TRAPAUL.mp3" type="audio/mp3" />
        </audio>
    </div>
  );
};
  
  export default Navbar;
