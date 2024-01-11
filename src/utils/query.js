import { useInfiniteQuery } from '@tanstack/react-query';
import {
  getVideoInfoList,
  getVideoList,
  getChannelDetailList,
} from './youtubeAxios';

/**
 * 비디오 목록 조회
 * react-query useInfiniteQuery
 *
 * @param keyword 검색어
 */
export const useFetchVideoList = (queryKey, keyword) => {
  return useInfiniteQuery({
    initialPageParam: undefined,
    queryKey,
    queryFn: async ({ pageParam = undefined }) => {
      // console.log(`pageParam = ${pageParam} | keyword = ${keyword}`);
      const searchOption = { pageToken: pageParam };
      if (keyword) searchOption.q = keyword;
      const response = await getVideoList(searchOption);

      // 비디오와 채널 상세 정보 조회
      const videoIds = [];
      const channelIds = [];
      response.items.map((item) => {
        if (item?.id?.videoId) videoIds.push(item.id.videoId);
        if (item?.snippet?.channelId) channelIds.push(item.snippet.channelId);
      });
      const videos = await getVideoInfoList({ id: videoIds.join(',') });
      const channels = await getChannelDetailList({
        id: channelIds.join(','),
      });

      // 데이터 바인딩
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
    // retryOnMount: false,
    staleTime: 360000, // default : 0 ( 매초마다 fetching 해서 서버로 부터 데이터 업데이트 함 )
    getNextPageParam: (data) => {
      if (data && 'nextPageToken' in data) return data['nextPageToken'];
      else return undefined;
    },
  });
};

/**
 * 데이터 바인딩
 * @param {*} item
 * @returns
 */
export const bindVideoInfo = (item) => {
  return {
    id: item.id,
    title: item?.snippet?.title,
    thumbnail: {
      title: item?.snippet?.thumbnails?.title,
      url: item?.snippet?.thumbnails?.medium?.url || '',
    },
    duration: item?.contentDetails?.duration || '',
    publishedAt: item?.snippet?.publishedAt || '',
    channel: {
      id: item?.snippet?.channelId,
      title: item?.snippet?.channelTitle || '',
      img: item?.channelDetails?.snippet?.thumbnails?.default?.url || '',
      customUrl: item?.channelDetails?.snippet?.customUrl,
      description: item?.channelDetails?.snippet?.description,
      subscriberCount: item?.channelDetails?.statistics?.subscriberCount || '0',
    },
    description: item?.snippet?.description || '',
    commentCount: item?.statistics?.commentCount,
    favoriteCount: item?.statistics?.favoriteCount,
    likeCount: item?.statistics?.likeCount,
    viewCount: item?.statistics?.viewCount,
    disLikeCount: item?.statistics?.disLikeCount,
  };
};
