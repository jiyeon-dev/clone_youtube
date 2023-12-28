import Logo from './Logo';
import SearchBar from './SearchBar';
import NavUser from './NavUser';
import { Wrapper } from '../../assets/wrappers/Header';

const Header = () => {
  return (
    <Wrapper>
      <Logo />
      <SearchBar />
      <NavUser />
    </Wrapper>
  );
};

export default Header;
