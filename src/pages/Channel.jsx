import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getChannelId, getChannels } from '../utils/youtubeAxios';
import ChannelHeader from '../components/Channel/Header';
import ChannelHome from '../components/Channel/Home';
import { createContext } from 'react';
const ChannelContext = createContext();
export const useChannelContext = () => useContext(ChannelContext);

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

      setChannel(response2?.items[0] || {});
    };

    getChannelInfo(customUrl);
  }, []);

  if (!channel) {
    return <h3>채널 정보를 찾을 수 없습니다.</h3>;
  }

  return (
    <ChannelContext.Provider value={channel}>
      {Object.keys(channel).length !== 0 && (
        <>
          <ChannelHeader />
          <ChannelHome />
        </>
      )}
    </ChannelContext.Provider>
  );
};
export default Channel;
