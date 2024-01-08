import { useSearchParams } from 'react-router-dom';
import {
  SearchListWrapper,
  WideCard,
  WideCardThumbnail,
  WideCardInfo,
} from '../assets/wrappers/SearchList';
import {
  formatDuration,
  formatViewCount,
  formatDate,
} from '../utils/formatter';
import { useState, useMemo } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import {
  getVideoInfoList,
  getVideoList,
  getChannelDetailList,
} from '../utils/youtubeAxios';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import Loader from '../components/Loader';
import styled from 'styled-components';

const useFetchVideoList = (nextPageToken, keyword) =>
  useInfiniteQuery({
    initialPageParam: 0,
    queryKey: ['videoLists', keyword],
    queryFn: async () => {
      const response = await getVideoList({
        pageToken: nextPageToken,
        q: keyword,
      });

      // 비디오와 채널 상세 정보 표시
      const videoIds = [];
      const channelIds = [];
      response.items.map((item) => {
        if (item?.id?.videoId) videoIds.push(item.id.videoId);
        if (item?.snippet?.channelId) channelIds.push(item.snippet.channelId);
      });

      // console.log(videoIds.join(','));
      // console.log(channelIds.join(','));
      const videos = await getVideoInfoList({ id: videoIds.join(',') });
      const channels = await getChannelDetailList({
        id: channelIds.join(','),
      });

      response.items.forEach((item) => {
        const videoInfo = videos.items.find((v) => v.id === item.id.videoId);
        item.contentDetails = videoInfo?.contentDetails;
        item.statistics = videoInfo?.statistics;
        item.liveStreamingDetails = videoInfo.liveStreamingDetails || {};

        const channelInfo = channels.items.find(
          (c) => c.id === item.snippet.channelId,
        );
        item.channelDetails = channelInfo?.snippet;
      });

      return response;
    },
    getNextPageParam: (data) => {
      // 다음페이지가 있는지만 확인하면 되기 때문에, 저장되어 있는 nextPageToken 값을 넘겨줌.
      return !!data.nextPageToken;
    },
  });

const Results = () => {
  const [params] = useSearchParams();
  const searchQuery = params.get('search_query');
  const [nextPageToken, setNextPageToken] = useState(null);
  const { data, hasNextPage, isError, isFetching, fetchNextPage } =
    useFetchVideoList(nextPageToken, searchQuery);

  const ref = useInfiniteScroll(async (entry, observer) => {
    observer.unobserve(entry.target);
    if (hasNextPage && !isFetching) {
      await fetchNextPage();
    }
  });

  const results = useMemo(() => {
    if (data) {
      setNextPageToken(data.pages[data.pages.length - 1].nextPageToken);
      return data.pages.flatMap(({ items }) => {
        return items;
      });
    } else return [];
  }, [data]);

  return (
    <SearchListWrapper>
      {results.map((item, idx) => (
        <WideCard key={idx}>
          <WideCardThumbnail>
            <img
              src={item.snippet.thumbnails.high.url}
              alt={item.snippet.thumbnails.title}
            />
            <div className="overlay"></div>
            <div className="progress-bar none">
              <div className="progress" />
            </div>
            <div className="video-duration">
              {formatDuration(item?.contentDetails.duration)}
            </div>
          </WideCardThumbnail>
          <WideCardInfo>
            <div className="video-title">{item.snippet.title}</div>
            <div className="metadata-line">
              <div className="video-views">
                조회수 {formatViewCount(41000)}회
              </div>
              <span className="video-upload-date">
                {formatDate(item.snippet.publishedAt)}
              </span>
            </div>
            <div className="channel-info">
              <a className="channel-thumbnail" href="/@이름">
                <img
                  src={item?.channelDetails.thumbnails.default.url}
                  alt={item?.channelDetails.title}
                />
              </a>
              <span className="channel-name">{item?.channelDetails.title}</span>
            </div>
            <div className="video-description">{item.snippet.description}</div>
          </WideCardInfo>
        </WideCard>
      ))}
      <Target ref={ref}>{isFetching && <Loader />}</Target>
    </SearchListWrapper>
  );
};
export default Results;

const Target = styled.div`
  margin: 20px 0 40px 0;
`;
