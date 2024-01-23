import { CiBellOn } from 'react-icons/ci';
import { MdOutlineVideoCall } from 'react-icons/md';
import { NavUserWrapper } from '../../assets/wrappers/Header';

const NavUser = () => {
  return (
    <NavUserWrapper>
      <button type="button" className="btn" disabled>
        <MdOutlineVideoCall size={30} />
      </button>
      <button type="button" className="btn">
        <CiBellOn size={28} />
      </button>
      <button className="btn avatar-btn">
        <img width={32} height={32} alt="" />
      </button>
    </NavUserWrapper>
  );
};
export default NavUser;
