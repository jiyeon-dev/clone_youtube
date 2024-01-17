import Arrow from '../../assets/icons/Arrow.svg?react';
import { CiBellOn, CiBellOff } from 'react-icons/ci';
import { BiSolidBellRing } from 'react-icons/bi';
import { GoPerson } from 'react-icons/go';
import { bindChannelInfo } from '../../utils/query';
import { formatViewCount } from '../../utils/formatter';
import { useEffect, useRef, useState } from 'react';
import {
  ChannelBox,
  AvatarSection,
  InfoSection,
  MainInfo,
  SubscribeButton,
} from '../../assets/wrappers/Channel';

const Channel = ({ item }) => {
  const channel = bindChannelInfo(item);
  const dropdownContentRef = useRef();
  const [isShow, setIsShow] = useState(false);
  const [alarm, setAlarm] = useState('');

  useEffect(() => {
    // bind dropdown events
    if (dropdownContentRef.current) {
      const menuItems = dropdownContentRef.current.querySelectorAll('div');
      menuItems.forEach((element) => {
        element.addEventListener('click', (e) => {
          menuItems.forEach((el) => el.classList.remove('selected'));
          e.target.classList.add('selected');
          setIsShow(false);
          setAlarm(e.target.dataset.alarm);
          // TODO: 구독 정보 변경 API 호출
        });
      });

      // dropdown 외부 클릭 시 닫기
      window.onclick = function (e) {
        if (!e.target.matches('.dropdown-button') && isShow) {
          setIsShow(false);
        }
      };
    }
  }, [dropdownContentRef.current]);

  return (
    <ChannelBox>
      <AvatarSection>
        <a href="">
          <img src={channel.img} alt={channel.customUrl} draggable="false" />
        </a>
      </AvatarSection>
      <InfoSection>
        <MainInfo>
          <div id="channel-name">{channel.title}</div>
          <div id="metadata">
            <span id="subscribers">{channel.customUrl}</span>
            <span id="dot">•</span>
            <span id="video-count">
              구독자 {formatViewCount(channel.subscriberCount)}명
            </span>
          </div>
          <div id="description">{channel.description}</div>
        </MainInfo>
        <SubscribeButton>
          <div className="dropdown-button" onClick={() => setIsShow(!isShow)}>
            {(() => {
              switch (alarm) {
                case 'all':
                  return <BiSolidBellRing size={24} />;
                case 'no':
                  return <CiBellOff size={24} />;
                case 'unsubscribe':
                  return <GoPerson size={24} />;
                case 'custom':
                default:
                  return <CiBellOn size={28} />;
              }
            })()}
            <span>구독중</span>
            <Arrow />
          </div>
          <div
            className={isShow ? 'dropdown-content show' : 'dropdown-content'}
            ref={dropdownContentRef}
          >
            <div data-alarm="all" className="selected">
              <BiSolidBellRing size={24} />
              전체
            </div>
            <div data-alarm="custom">
              <CiBellOn size={24} />
              맞춤설정
            </div>
            <div data-alarm="no">
              <CiBellOff size={24} />
              없음
            </div>
            <div data-alarm="unsubscribe">
              <GoPerson size={24} />
              구독취소
            </div>
          </div>
        </SubscribeButton>
      </InfoSection>
    </ChannelBox>
  );
};
export default Channel;
