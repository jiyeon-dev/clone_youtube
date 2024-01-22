import { useRef } from 'react';
import { useGlobalContext } from '../../context';
import styled from 'styled-components';
import SubscribeButton from '../SubscribeButton';
import { formatViewCount } from '../../utils/formatter';
import { useChannelContext } from '../../pages/Channel';
import { gridMargin, gridPadding } from './styles';

const Header = () => {
  const channel = useChannelContext();
  const stickyTab = useRef();
  const { isNavOpen } = useGlobalContext();

  window.addEventListener('scroll', function () {
    if (scrollY > 386) {
      stickyTab.current.classList.add('fixed');
    } else {
      stickyTab.current.classList.remove('fixed');
    }
  });

  return (
    <ChannelHeader>
      <ChannelBanner
        backgroundImage={`${channel?.brandingSettings?.image?.bannerExternalUrl}=w2120-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj`}
      >
        <div className="banner"></div>
      </ChannelBanner>
      <ChannelInfo>
        <Avatar
          draggable={false}
          src={channel?.snippet?.thumbnails?.default?.url}
        ></Avatar>
        <ChannelMetaData>
          <div id="title">{channel?.snippet?.title}</div>
          <div className="meta-item-container">
            <div className="meta-item">{channel?.snippet?.customUrl}</div>
            <div className="meta-item">
              구독자 {formatViewCount(channel?.statistics?.subscriberCount)}명
            </div>
            <div className="meta-item">
              동영상 {formatViewCount(channel?.statistics?.videoCount)}개
            </div>
          </div>
          <span className="channel-description">
            {channel?.snippet?.description}
          </span>
          <SubscribeButton channelId={channel?.id} />
        </ChannelMetaData>
      </ChannelInfo>

      <StickyToolbar ref={stickyTab} isnavopen={isNavOpen.toString()}>
        <div className="tabs">
          {/* Left button */}
          <div className="tabs-container">
            <div className="tabs-list">
              <div className="tab selected">
                홈
                <div className="tab-bar" />
              </div>
              <div className="tab">
                동영상
                <div className="tab-bar" />
              </div>
              <div className="tab">
                라이브
                <div className="tab-bar" />
              </div>
            </div>
          </div>
          {/* Right button */}
        </div>
      </StickyToolbar>
    </ChannelHeader>
  );
};
export default Header;

const ChannelHeader = styled.div`
  position: relative;
  width: 100%;
`;

const ChannelBanner = styled.div`
  border-radius: 12px;
  background-image: url(${(props) => props.backgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  ${gridMargin}

  .banner {
    padding-top: 16.12%;
  }
`;

const ChannelInfo = styled.div`
  padding-top: 16px;
  padding-bottom: 4px;
  width: 100%;
  position: relative;

  display: flex;
  flex-direction: row;
  align-items: center;
  ${gridPadding}
`;

const Avatar = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 50%;
  background-color: green;

  flex: none;
  margin: 0 24px 0 0;
`;

const ChannelMetaData = styled.div`
  min-width: 150px;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  div#title {
    width: 100%;
    font-size: 36px;
    font-weight: 700;
    line-height: 50px;
    color: rgb(15, 15, 15);
    margin-bottom: 4px;
  }

  .meta-item-container {
    display: flex;
    flex-direction: row;
  }
  .meta-item {
    /* display: inline-flex; */
    /* white-space: nowrap; */
    color: rgb(96, 96, 96);
    font-size: 14px;
    font-weight: 400;

    &:not(:last-child)::after {
      margin: 0 4px;
      content: '‧';
    }
  }

  .channel-description {
    max-width: 600px;
    padding: 10px 0;

    color: rgb(96, 96, 96);
    font-size: 14px;
    font-weight: 400;
    display: block;

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

const StickyToolbar = styled.div`
  height: 48px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  .tabs {
    margin-left: calc(50vw - 682px);
    margin-right: calc(50vw - 682px);

    height: 48px;
    color: rgb(96, 96, 96);
  }

  .tabs-container {
    position: relative;
    height: 100%;
    flex: 1 1 auto;

    .tabs-list {
      display: flex;
      flex-direction: row;
      white-space: nowrap;
    }
  }

  .tab {
    cursor: pointer;
    align-items: center;
    display: flex;
    flex-shrink: 0;
    height: 48px;
    justify-content: center;
    margin-right: 24px;
    min-width: 48px;
    padding: 0;
    position: relative;
    color: #606060;
    font-size: 16px;
    font-weight: 500;

    .tab-bar {
      bottom: 0px;
      left: 0;
      position: absolute;
      right: 0;
      z-index: 1;
      border-radius: 1px;
      height: 2px;
    }

    &.selected {
      color: #0f0f0f;

      .tab-bar {
        background-color: rgb(96, 96, 96);
      }
    }

    &:hover .tab-bar {
      background-color: #909090;
    }
  }

  &.fixed {
    position: fixed;
    top: var(--header-height);
    left: 0px;
    bottom: initial;
    width: 100%;
    z-index: 1000;
    background-color: #fff;
    margin-left: ${(props) =>
      props.isNavOpen === 'true'
        ? 'var(--nav-width)'
        : 'var(--mini-nav-width)'};
    /* margin-left: var(--nav-width); */
  }
`;
