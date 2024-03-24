import React, { useState, Suspense, lazy } from 'react';
import NavbarFilter from './components/NavigationFilter'
import './styles/global.css'
import './styles/filter.css'

const Filter1 = lazy(() => import('./components/FilterSection/Filter1'));
const Filter2 = lazy(() => import('./components/FilterSection/Filter2'));
const Filter3 = lazy(() => import('./components/FilterSection/Filter3'));
const Filter4 = lazy(() => import('./components/FilterSection/Filter4'));
const Filter5 = lazy(() => import('./components/FilterSection/Filter5'));
const Filter6 = lazy(() => import('./components/FilterSection/Filter6'));
const Filter7 = lazy(() => import('./components/FilterSection/Filter7'));
const Filter8 = lazy(() => import('./components/FilterSection/Filter8'));

const filters = [Filter1, Filter2, Filter3, Filter4, Filter5, Filter6, Filter7, Filter8];

function FilterDisplayer() {
    const [currentFilterIndex, setCurrentFilterIndex] = useState(0);

    const CurrentFilter = filters[currentFilterIndex];

  return (
    <div className="grid-container">
        <div className="text-container">
            <NavbarFilter setCurrentFilterIndex={setCurrentFilterIndex} client:only/>
        </div>
        <Suspense fallback={
            <div className='loading-container-filter'>
            <img src={`Loading.png`} alt="Description" className='loading-image-filter'/>
            </div>
        }>
            <CurrentFilter key={currentFilterIndex}/>
        </Suspense>
    </div>
  );
}

export default FilterDisplayer;
