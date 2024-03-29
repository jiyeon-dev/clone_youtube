import styled from 'styled-components';
import { Navigate, useSearchParams } from 'react-router-dom';
import { useGlobalContext } from '../context';
import { useEffect, useState } from 'react';
import { getChannelDetailList, getVideoInfoList } from '../utils/youtubeAxios';
import WatchPrimary from '../components/Watch/Primary';
import WatchSecondary from '../components/Watch/Secondary';
import { bindVideoInfo } from '../utils/query';
import { SearchProvider } from '../context';

const Watch = () => {
  const [video, setVideo] = useState({});
  const [params] = useSearchParams();
  const videoId = params.get('v');

  // -- 비디오 아이디 값이 없는 경우 메인 화면으로 이동
  if (!videoId) {
    return <Navigate replace to="/" />;
  }

  // -- 비디오 정보 조회
  const getVideoInfo = async () => {
    const response = await getVideoInfoList({ id: videoId });
    if (response) {
      if (response.items.length === 0) {
      } else {
        const item = response.items[0];

        // 채널 상세 정보 조회 후 item 에 추가
        const channelId = item.snippet.channelId;
        const channel = await getChannelDetailList({ id: channelId });
        item.channelDetails = channel.items[0];

        setVideo(bindVideoInfo(item));
      }
    }
  };

  // -- youtube api 초기화
  const { initializeYouTubeApi } = useGlobalContext();
  useEffect(() => {
    const youtubeApi = async () => {
      await initializeYouTubeApi();
    };
    youtubeApi();
    getVideoInfo();
  }, [videoId]);

  return (
    <SearchProvider>
      <Container data-video-id={videoId}>
        {Object.keys(video).length > 0 && (
          <>
            <WatchPrimary video={video} />
            <WatchSecondary videoId={videoId} channel={video.channel} />
          </>
        )}
      </Container>
    </SearchProvider>
  );
};
export default Watch;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  min-width: 1012px;
  max-width: 1754px;
`;
