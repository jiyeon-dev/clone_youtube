import { SidebarWrapper } from '../../assets/wrappers/Sidebar';
import SidebarItem from './SidebarItem';

const Sidebar = () => {
  return (
    <SidebarWrapper>
      <section>
        <SidebarItem type="home" title="홈" />
        <SidebarItem type="subscriptions" title="구독" />
      </section>
      <section>
        <SidebarItem type="you" title="나" reverse={true} />
        <SidebarItem type="history" title="시청 기록" />
        <SidebarItem type="playlist" title="나중에 볼 동영상" keyCode="WL" />
        <SidebarItem
          type="playlist"
          title="좋아요 표시한 동영상"
          keyCode="LL"
        />
      </section>
      <section>
        <p>구독</p>
        <SidebarItem type="guide_builder" title="채널 탐색" />
      </section>
    </SidebarWrapper>
  );
};
export default Sidebar;
