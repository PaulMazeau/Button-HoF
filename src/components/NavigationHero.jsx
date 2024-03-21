import '../styles/global.css'

const Navbar = ({ onPreviousClick, onNextClick }) => {
  return (
    <div class="nav-bar">
        <a id="prev-hero" class="links" onClick={onPreviousClick}>Previous hero</a>
        <a class="links" href="/">Back Home</a>
        <a class="links" href="#">Mute Sound</a>
        <a id="next-hero" class="links" onClick={onNextClick}>Next hero</a>
    </div>
  );
}

export default Navbar;
