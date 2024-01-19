import { useEffect, useState } from 'react';
import {
  getISODate,
  formatViewCount,
  formatDate,
} from '../../../utils/formatter';
import { getVideoList, getVideoInfoList } from '../../../utils/youtubeAxios';
import styled from 'styled-components';

const FirstSegment = ({ channelId }) => {
  const [video, setVideo] = useState({});

  // 해당 채널의 인기 동영상 조회
  const getVideoInfo = async () => {
    const response1 = await getVideoList({
      channelId,
      maxResults: 1,
      publishedAfter: getISODate(-7), // 7일 이내 최신 동영상
      type: 'video',
      order: 'viewCount',
    });

    if (response1 && response1.items.length > 0) {
      // 비디오 상세 정보 조회
      const videoId = response1.items[0].id.videoId;
      const response2 = await getVideoInfoList({
        id: videoId,
        maxResults: 1,
      });
      setVideo(response2.items[0]);
    }
  };

  useEffect(() => {
    getVideoInfo();
  }, []);

  return (
    <Content>
      <PlayerContainer>
        <iframe
          className="overlay"
          frameBorder={0}
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; "
          src={`https://www.youtube.com/embed/${video.id}?controls=0&fs=0&origin=http://localhost:5173&enablejsapi=1&widgetid=1&mute=1`}
        />
      </PlayerContainer>
      <ContentContainer>
        <div className="metadata-container">
          <div id="title">{video?.snippet?.title}</div>
          <div className="metadata-line">
            <div className="video-views">
              조회수 {formatViewCount(video?.statistics?.viewCount)}회
            </div>
            <span className="video-upload-date">
              {formatDate(video?.snippet?.publishedAt)}
            </span>
          </div>
          <div id="description">{video?.snippet?.description}</div>
          <a href={`/watch?v=${video.id}`}>자세히 알아보기</a>
        </div>
      </ContentContainer>
    </Content>
  );
};
export default FirstSegment;

const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /* flex-direction: row; */
  padding: 24px 0;
`;

const PlayerContainer = styled.div`
  margin: 0 24px 0 0;
  width: 424px;
  height: 238px;

  iframe {
    border-radius: 12px;
    width: 100%;
    aspect-ratio: 16 / 9;
    height: auto;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  max-width: 400px;

  .metadata-container {
    margin: 0 0 16px 0;
    flex: 1;
    color: rgb(15, 15, 15);

    #title {
      margin-bottom: 16px;
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: normal;
      word-break: break-word;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }

    .metadata-line {
      margin-bottom: 16px;
      display: flex;
      color: rgb(96, 96, 96);
      font-size: 12px;

      &:has(.video-views) {
        .video-upload-date:before {
          content: '•';
          margin: 0 4px;
        }
      }
    }

    #description {
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: normal;
      word-break: break-word;
      display: -webkit-box;
      -webkit-line-clamp: 7;
      -webkit-box-orient: vertical;
    }

    a {
      line-height: 18px;
      font-weight: 500;
      font-size: 12px;
    }
  }
`;
