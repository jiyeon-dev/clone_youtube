import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const HomeLayout = () => {
  return (
    <>
      {/* header */}
      <Header />
      {/* left side bar */}
      <Sidebar />
      {/* body */}
      <Outlet />
    </>
  );
};
export default HomeLayout;
