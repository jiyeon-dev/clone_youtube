import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import MiniSidebar from '../components/Sidebar/MiniSidebar';
import Sidebar from '../components/Sidebar';
import { useGlobalContext } from '../context';

const HomeLayout = () => {
  const { isNavOpen } = useGlobalContext();

  return (
    <>
      {/* header */}
      <Header />
      {/* left side bar */}
      {isNavOpen ? <Sidebar /> : <MiniSidebar />}
      {/* body */}
      <div
        style={{
          marginLeft: isNavOpen ? 'var(--nav-width)' : 'var(--mini-nav-width)',
          marginTop: 'var(--header-height)',
          display: 'flex',
        }}
      >
        <Outlet />
      </div>
    </>
  );
};
export default HomeLayout;
