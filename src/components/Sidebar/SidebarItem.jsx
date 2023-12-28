import { GoHome, GoHomeFill } from 'react-icons/go';
import { BsCollectionPlay, BsCollectionPlayFill } from 'react-icons/bs';
import FeedYou from '../../assets/icons/FeedYou.svg?react';
import FeedYouFill from '../../assets/icons/FeedYouFill.svg?react';
import { GoHistory } from 'react-icons/go';
import { MdAccessTime, MdAccessTimeFilled } from 'react-icons/md'; // 나중에 볼 동영상
import { AiOutlineLike, AiFillLike } from 'react-icons/ai'; // 좋아요
import { GoPlusCircle } from 'react-icons/go'; // 채널 탐색 (fill 없음)
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';

const SidebarItem = ({ type, title, keyCode, reverse }) => {
  // 현재 URL 로 메뉴 활성화
  const url = new URL(window.location.href);
  const lastSegment = url.pathname.substring(url.pathname.lastIndexOf('/') + 1);
  const isActive = (!lastSegment && type === 'home') || type === lastSegment;

  // mini 가 아닌 메뉴에서의 `나`
  if (type === 'you' && reverse) {
    return (
      <a data-url={type}>
        <span>{title}</span>
        <MdOutlineKeyboardArrowRight size={20} />
      </a>
    );
  }

  // 그 외
  return (
    <a data-url={type}>
      {(() => {
        switch (type) {
          case 'home':
            if (isActive) return <GoHomeFill size={20} />;
            else return <GoHome size={20} />;
          case 'subscriptions':
            if (isActive) return <BsCollectionPlayFill size={20} />;
            else return <BsCollectionPlay size={20} />;
          case 'you':
            if (isActive) return <FeedYouFill />;
            else return <FeedYou />;
          case 'history':
            return <GoHistory size={20} />;
          case 'playlist':
            if (keyCode === 'WL') {
              // playlist?list=WL - 나중에 볼 동영상
              if (isActive) return <MdAccessTimeFilled size={20} />;
              else return <MdAccessTime size={20} />;
            } else if (keyCode === 'LL') {
              // playlist?list=LL - 좋아요 표시한 동영상
              if (isActive) return <AiFillLike size={20} />;
              else return <AiOutlineLike size={20} />;
            }
          case 'guide_builder':
            // 채널 탐색
            return <GoPlusCircle size={20} />;
        }
      })()}
      <span>{title}</span>
    </a>
  );
};

export default SidebarItem;
