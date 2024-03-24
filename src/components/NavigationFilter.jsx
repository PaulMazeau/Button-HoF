import '../styles/filter.css'

const NavbarFilter = ({ setCurrentFilterIndex }) => {

    return (
      <>
        <h4>You need to allow the camera to play with all these filters.</h4>
        <ul className="filter-list">
          <li className="filter-element" onClick={() => setCurrentFilterIndex(0)}>Filter 1</li>
          <li className="filter-element" onClick={() => setCurrentFilterIndex(1)}>Filter 2</li>
          <li className="filter-element" onClick={() => setCurrentFilterIndex(2)}>Filter 3</li>
        </ul>
      </>
    );
  };

export default NavbarFilter