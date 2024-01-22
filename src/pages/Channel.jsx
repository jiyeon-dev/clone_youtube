import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getChannelId, getChannels } from '../utils/youtubeAxios';
import ChannelHeader from '../components/Channel/Header';
import ChannelHome from '../components/Channel/Home';
import ChannelVideo from '../components/Channel/Video';
import ChannelLive from '../components/Channel/Live';
import { createContext } from 'react';
import { TAB } from '../components/Channel/StickyTab/index';

const ChannelContext = createContext();
export const useChannelContext = () => useContext(ChannelContext);

const Channel = () => {
  const [channel, setChannel] = useState({});
  const [currentTab, setCurrentTab] = useState(TAB[0]?.value);
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

      setChannel(response2?.items[0] || {});
    };

    getChannelInfo(customUrl);
  }, []);

  if (!channel) {
    return <h3>채널 정보를 찾을 수 없습니다.</h3>;
  }

  return (
    <ChannelContext.Provider value={{ channel, currentTab, setCurrentTab }}>
      {Object.keys(channel).length !== 0 && (
        <>
          <ChannelHeader />
          {currentTab === 'home' && <ChannelHome />}
          {currentTab === 'video' && <ChannelVideo />}
          {currentTab === 'live' && <ChannelLive />}
        </>
      )}
    </ChannelContext.Provider>
  );
};
export default Channel;
