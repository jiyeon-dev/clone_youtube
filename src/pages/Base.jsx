import { ThumbnailCardsWrapper as CardsWrapper } from '../assets/wrappers/ThumbnailCard';
import ThumbnailCard from '../components/Card/ThumbnailCard';
import Chips from '../components/Chips';
import { useState } from 'react';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import {
  getVideoInfoList,
  getVideoList,
  getChannelDetailList,
} from '../utils/youtubeAxios';
import { useInfiniteQuery } from '@tanstack/react-query';

const Base = () => {
  const [videoList, setVideoList] = useState([]);
  const [nextPageToken, setNextPageToken] = useState('');

  // infinite query 선언
  const { data, isFetching, isError, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ['videoList'],
      queryFn: async () => {
        const response = await getVideoList({ pageToken: nextPageToken });

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

        setVideoList([...videoList, ...response.items]); // 비디오 리스트 저장
        setNextPageToken(response.nextPageToken); // 다음 페이지 아이디 저장

        return response;
      },
      getNextPageParam: (data) => {
        // 다음페이지가 있는지만 확인하면 되기 때문에, 저장되어 있는 nextPageToken 값을 넘겨줌.
        return data.nextPageToken;
      },
    });

  // infinite scroll 선언
  const root = useInfiniteScroll(
    async (entry, observer) => {
      observer.unobserve(entry.target);
      if (hasNextPage && !isFetching) {
        fetchNextPage();
      }
    },
    {
      targetArray: videoList,
      threshold: 0.2,
      endPoint: 1,
    },
  );

  if (isFetching) {
    // todo: Suspense + skeleton
    console.log('isFetching');
  }

  if (isError) {
    // todo: error message
    console.log('error');
  }

  return (
    <>
      <Chips />
      <CardsWrapper ref={root}>
        {videoList.map((item, idx) => (
          <ThumbnailCard key={idx} item={item} />
        ))}
      </CardsWrapper>
    </>
  );
};

export default Base;
