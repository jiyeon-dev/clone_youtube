import { useEffect, useState } from 'react';
import FirstSegment from './FirstSegment';
import PlayListSegment from './PlayListSegment';
import styled from 'styled-components';
import { getPlayList } from '../../../utils/youtubeAxios';
import { useChannelContext } from '../../../pages/Channel';
import { gridPadding } from '../styles';

const ChannelHome = () => {
  const { channel } = useChannelContext();
  const [playList, setPlayList] = useState([]);

  // 채널에 등록된 playlist 조회
  const getPlayLists = async () => {
    const response = await getPlayList({
      part: 'snippet',
      maxResults: 5,
      channelId: channel.id,
    });
    setPlayList(response?.items || []);
  };

  useEffect(() => {
    getPlayLists();
  }, [channel]);

  return (
    <Content>
      <FirstSegment channelId={channel.id} />
      {playList.map((item) => (
        <PlayListSegment
          key={item?.etag}
          playListId={item?.id}
          playListTitle={item?.snippet?.title}
        />
      ))}
    </Content>
  );
};
export default ChannelHome;

const Content = styled.div`
  min-height: calc(100vh - 120px);
  ${gridPadding}

  & > div:not(:last-child) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
`;
