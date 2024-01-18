import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getChannelId, getChannels } from '../utils/youtubeAxios';
import styled from 'styled-components';
import SubscribeButton from '../components/SubscribeButton';
import { useGlobalContext } from '../context';

const Channel = () => {
  const stickyTab = useRef();
  const { isNavOpen } = useGlobalContext();

  const [channel, setChannel] = useState({});
  const customUrl = useParams().customUrl;
  if (!customUrl || !customUrl.startsWith('@')) {
    return <h3>채널 이름을 찾을 수 없습니다.</h3>;
  }

  useEffect(() => {
    const getChannelInfo = async (customUrl) => {
      // 1. get channelId
      const response1 = await getChannelId(customUrl);
      const item = response1.items[0];
      if (!item) return false;

      const channelId = item.snippet.channelId;
      console.log(channelId);

      // 2. get channel info
      const response2 = await getChannels({
        part: 'snippet,contentDetails,statistics,brandingSettings,topicDetails',
        maxResults: 1,
        id: channelId,
      });

      setChannel(response2.items[0]);
    };

    getChannelInfo(customUrl);
  }, []);

  window.addEventListener('scroll', function () {
    if (scrollY > 386) {
      stickyTab.current.classList.add('fixed');
    } else {
      stickyTab.current.classList.remove('fixed');
    }
  });

  if (!channel) {
    return <h3>채널 정보를 찾을 수 없습니다.</h3>;
  }

  console.log(channel);
  return (
    <>
      <ChannelHeader>
        <ChannelBanner
          backgroundimage={`${channel?.brandingSettings?.image?.bannerExternalUrl}=w2120-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj`}
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
              <div className="meta-item">@ddeunddeun</div>
              <div className="meta-item">구독자 167만명</div>
              <div className="meta-item">동영상 185개</div>
            </div>
            <span className="channel-description">
              KBS WORLD TV is a television channel for international audiences
              provided by the Korean Broadcasting System (KBS). It's your
              premier window on Korean contents with a nonstop, 24-hour a day,
              7-day a week stream of Korea's latest and most popular programs.
            </span>
            <SubscribeButton channelId={channel?.id} />
          </ChannelMetaData>
        </ChannelInfo>
        <StickyToolbar ref={stickyTab} isNavOpen={isNavOpen}>
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
                  실시간
                  <div className="tab-bar" />
                </div>
              </div>
            </div>
            {/* Right button */}
          </div>
        </StickyToolbar>
      </ChannelHeader>
      <Content>
        <div className="section section-2">Section 2</div>
        <div className="section section-3">Section 3</div>
        <div className="section section-4">Section 4</div>
      </Content>
    </>
  );
};
export default Channel;

const ChannelHeader = styled.div`
  position: relative;
  width: 100%;
  /* position: fixed;
  top: 0; */
  /* margin-top: var(--header-height); */
  /* 
  #contentContainer {
    padding-top: 561px;
    position: relative;
    z-index: 0;
  } */
`;

const ChannelBanner = styled.div`
  border-radius: 12px;
  background-image: url(${(props) => props.backgroundimage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  margin-left: calc(50% - 642px);
  margin-right: calc(50% - 642px);

  .banner {
    padding-top: 16.12%;
  }
`;

const ChannelInfo = styled.div`
  padding-right: calc(50% - 642px);
  padding-left: calc(50% - 642px);
  padding-top: 16px;
  padding-bottom: 4px;
  width: 100%;
  position: relative;

  display: flex;
  flex-direction: row;
  align-items: center;
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
    z-index: 1;
    background-color: #fff;
    margin-left: ${(props) =>
      props.isNavOpen ? 'var(--nav-width)' : 'var(--mini-nav-width)'};
    /* margin-left: var(--nav-width); */
  }
`;

const Content = styled.div`
  .section {
    width: 100%;
    height: 100vh;
    font-size: 20px;
    text-align: center;
    line-height: 100vh;
    color: #f5f5f5;
  }
  .section.section-1 {
    position: relative;
    background: #00acee;
  }
  .section.section-2 {
    background: #d9b200;
  }
  .section.section-3 {
    background: #222;
  }
  .section.section-4 {
    background: orangered;
  }
`;
