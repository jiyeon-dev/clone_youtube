import styled from 'styled-components';
import SubHeader from './components/SubHeader';
import {
  getPlayListItems,
  getVideoInfoList,
} from '../../../utils/youtubeAxios';
import { useEffect, useState } from 'react';

const PlayListSegment = ({ playListId, playListTitle }) => {
  const [firstVideoId, setFirstVideoId] = useState(null);
  const [videoList, setVideoList] = useState([]);

  // playlist에 속한 비디오 리스트 조회
  const getPlayListItem = async () => {
    const response = await getPlayListItems({
      part: 'contentDetails,snippet',
      maxResults: 10,
      playlistId: playListId,
    });

    setFirstVideoId(response?.items[0].contentDetails.videoId);

    // 비디오 상세 정보 조회
    const videoIds = response?.items.map((v) => v.contentDetails.videoId);
    const response2 = await getVideoInfoList({ id: videoIds.join(',') });
    setVideoList(response2?.items);
  };

  useEffect(() => {
    getPlayListItem();
  }, [playListId]);

  return (
    <Content>
      <SubHeader videoId={firstVideoId} playListId={playListId}>
        {playListTitle}
      </SubHeader>
      <PlayListContent>
        {videoList.map((item) => (
          <p>{item.id}</p>
        ))}
      </PlayListContent>
    </Content>
  );
};
export default PlayListSegment;

const Content = styled.div``;
const PlayListContent = styled.div`
  margin-top: 24px;
  margin-bottom: 24px;
`;
