import { CiMenuBurger } from 'react-icons/ci';
import logoImg from '../../assets/logo.svg';
import { LogoWrapper } from '../../assets/wrappers/Header';
import { useGlobalContext } from '../../context';
import { useNavigate } from 'react-router-dom';

const Logo = () => {
  const navigate = useNavigate();
  const { isNavOpen, setIsNavOpen } = useGlobalContext();
  const handleClick = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <LogoWrapper>
      <button
        type="button"
        className="btn nav-toggle-btn"
        onClick={() => handleClick()}
      >
        <CiMenuBurger size={20} />
      </button>

      <div className="logo-container" onClick={() => navigate('/')}>
        <img src={logoImg} alt="youtube" width={90} />
        <span id="country-code">kr</span>
      </div>
    </LogoWrapper>
  );
};

export default Logo;
