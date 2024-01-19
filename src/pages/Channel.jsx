import { Suspense, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getChannelId, getChannels } from '../utils/youtubeAxios';
import styled from 'styled-components';
import ChannelHeader from '../components/Channel/Header';

const Channel = () => {
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

  if (!channel) {
    return <h3>채널 정보를 찾을 수 없습니다.</h3>;
  }

  return (
    <>
      <ChannelHeader channel={channel} />
      <Content>
        <div className="section section-2">Section 2</div>
        <div className="section section-3">Section 3</div>
        <div className="section section-4">Section 4</div>
      </Content>
    </>
  );
};
export default Channel;

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
