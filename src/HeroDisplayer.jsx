import React, { useState, Suspense, lazy } from 'react';
import Navbar from './components/NavigationHero';

const Hero1 = lazy(() => import('./components/HeroSection/Hero1'));
const Hero2 = lazy(() => import('./components/HeroSection/Hero2'));
const Hero3 = lazy(() => import('./components/HeroSection/Hero3'));
const Hero4 = lazy(() => import('./components/HeroSection/Hero4'));
const Hero5 = lazy(() => import('./components/HeroSection/Hero5'));
const Hero6 = lazy(() => import('./components/HeroSection/Hero6'));
const Hero7 = lazy(() => import('./components/HeroSection/Hero7'));
const Hero8 = lazy(() => import('./components/HeroSection/Hero8'));
//const Hero9 = lazy(() => import('./components/HeroSection/Hero9'));
//const Hero10 = lazy(() => import('./components/HeroSection/Hero10'));

const heroes = [Hero1, Hero2, Hero3, Hero4, Hero5, Hero6, Hero7, Hero8];

function HeroDisplayer() {
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  const goToNextHero = () => {
    console.log("Aller au Hero suivant");
    setCurrentHeroIndex((index) => (index + 1) % heroes.length);
  };
  const goToPreviousHero = () => {
    console.log("Aller au Hero précédent");
    setCurrentHeroIndex((index) => (index - 1 + heroes.length) % heroes.length);
  };

  const CurrentHero = heroes[currentHeroIndex];

  return (
    <div>
      <Navbar onPreviousClick={goToPreviousHero} onNextClick={goToNextHero} />
      <div className='loading-container'>
          <img src={`Loading.png`} alt="Description" className='loading-image'/>
        </div>
      <Suspense fallback={
        <div>chargement</div>
      }>
        <CurrentHero />
      </Suspense>
    </div>
  );
}

export default HeroDisplayer;
