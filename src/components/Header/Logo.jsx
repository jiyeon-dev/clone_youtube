import { CiMenuBurger } from 'react-icons/ci';
import logoImg from '../../assets/logo.svg';
import { LogoWrapper } from '../../assets/wrappers/Header';

const Logo = () => {
  return (
    <LogoWrapper>
      <button type="button" className="btn nav-toggle-btn">
        <CiMenuBurger size={20} />
      </button>

      <div className="logo-container">
        <img src={logoImg} alt="youtube" width={90} />
        <span id="country-code">kr</span>
      </div>
    </LogoWrapper>
  );
};

export default Logo;
