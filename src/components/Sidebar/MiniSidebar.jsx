import { MiniSidebarWrapper } from '../../assets/wrappers/Sidebar';
import SidebarItem from './SidebarItem';

const MiniSidebar = () => {
  return (
    <MiniSidebarWrapper size="mini" className="mini">
      <SidebarItem type="home" title="홈" url="/" />
      <SidebarItem
        type="subscriptions"
        title="구독"
        url="/feed/subscriptions"
      />
      <SidebarItem type="you" title="나" url="/feed/you" />
    </MiniSidebarWrapper>
  );
};
export default MiniSidebar;
