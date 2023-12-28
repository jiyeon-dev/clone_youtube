import { MiniSidebarWrapper } from '../../assets/wrappers/Sidebar';
import SidebarItem from './SidebarItem';

const MiniSidebar = () => {
  return (
    <MiniSidebarWrapper size="mini" className="mini">
      <SidebarItem type="home" title="홈" />
      <SidebarItem type="subscriptions" title="구독" />
      <SidebarItem type="you" title="나" />
    </MiniSidebarWrapper>
  );
};
export default MiniSidebar;
