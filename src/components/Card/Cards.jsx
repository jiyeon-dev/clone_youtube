import { ThumbnailCardsWrapper as CardsWrapper } from '../../assets/wrappers/ThumbnailCard';
import ThumbnailCard from '../../components/Card/ThumbnailCard';
import { useMemo, useState } from 'react';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import {
  getVideoInfoList,
  getVideoList,
  getChannelDetailList,
} from '../../utils/youtubeAxios';
import { useInfiniteQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import Loader from '../../components/Loader';
import CardSkeleton from './CardSkeleton';

const useFetchVideoList = (nextPageToken) =>
  useInfiniteQuery({
    initialPageParam: 0,
    queryKey: ['base-videoList'],
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

      return response;
    },
    getNextPageParam: (data) => {
      // 다음페이지가 있는지만 확인하면 되기 때문에, 저장되어 있는 nextPageToken 값을 넘겨줌.
      return !!data.nextPageToken;
    },
  });

const Cards = () => {
  const [nextPageToken, setNextPageToken] = useState(null);
  const { data, hasNextPage, isError, isFetching, fetchNextPage } =
    useFetchVideoList(nextPageToken);

  const ref = useInfiniteScroll(async (entry, observer) => {
    observer.unobserve(entry.target);
    if (hasNextPage && !isFetching) {
      await fetchNextPage();
    }
  });

  const videos = useMemo(() => {
    if (data) {
      setNextPageToken(data.pages[data.pages.length - 1].nextPageToken);
      return data.pages.flatMap(({ items }) => {
        return items;
      });
    } else return [];
  }, [data]);

  if (isError) {
    // todo: error message
    return (
      <CardsWrapper>
        <h2>ERROR</h2>
      </CardsWrapper>
    );
  }

  return (
    <>
      <CardsWrapper>
        {videos.map((item, idx) => (
          <ThumbnailCard key={idx} item={item} />
        ))}

        {isFetching &&
          Array(8)
            .fill(1)
            .map((el, i) => <CardSkeleton key={i} />)}
      </CardsWrapper>
      <Target ref={ref}>{isFetching && <Loader />}</Target>
    </>
  );
};
export default Cards;

const Target = styled.div`
  margin: 20px 0 40px 0;
`;
