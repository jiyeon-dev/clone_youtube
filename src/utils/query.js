import { useInfiniteQuery } from '@tanstack/react-query';
import {
  getVideoInfoList,
  getVideoList,
  getChannelDetailList,
} from './youtubeAxios';

// 비디오 목록 조회
export const searchVideo = async (option) => {
  const response = await getVideoList(option);

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
    item.channelDetails = channelInfo;
  });

  return response;
};

/**
 * 비디오 목록 조회
 * react-query useInfiniteQuery
 *
 * @param keyword 검색어
 */
export const useFetchVideoList = (queryKey, searchOption) => {
  return useInfiniteQuery({
    initialPageParam: undefined,
    queryKey,
    queryFn: async ({ pageParam = undefined }) => {
      const option = Object.assign({ pageToken: pageParam }, searchOption);
      return await searchVideo(option);
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
  const videoId =
    Object.keys(item).length > 0
      ? typeof item.id === 'string'
        ? item.id
        : item.id?.videoId
      : undefined;
  return {
    id: videoId,
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
    isLive: item?.snippet?.liveBroadcastContent === 'live' ? true : false, // 실시간 동영상 여부
    concurrentViewers: item?.liveStreamingDetails?.concurrentViewers || 0, // 실시간 시청자 수
    caption: item?.contentDetails?.caption || false, // 자막 여부
  };
};

/**
 * 댓글 데이터 바인딩
 * @param {} item
 */
export const bindCommentInfo = (item) => {
  return {
    id: item?.id,
    videoId: item?.snippet.videoId,
    textDisplay: item?.snippet?.topLevelComment?.snippet.textDisplay,
    textOriginal: item?.snippet?.topLevelComment?.snippet.textOriginal,

    channel: {
      id: item?.snippet.channelId,
    },
    author: {
      id: item?.snippet?.topLevelComment.snippet.authorChannelId.value,
      name: item?.snippet?.topLevelComment.snippet.authorDisplayName,
      img: item?.snippet?.topLevelComment.snippet.authorProfileImageUrl,
      url: item?.snippet?.topLevelComment.snippet.authorChannelUrl,
    },

    likeCount: item?.snippet?.topLevelComment.snippet.likeCount,
    dislikeCount: item?.snippet?.topLevelComment.snippet.dislikeCount,

    publishedAt: item?.snippet?.topLevelComment.snippet.publishedAt,
    updatedAt: item?.snippet?.topLevelComment.snippet.updatedAt,
    totalReplyCount: item?.snippet.totalReplyCount,
  };
};

/**
 * 답글 데이터 바인딩
 * @param {} item
 */
export const bindReplyInfo = (item) => {
  return {
    id: item?.id,
    parentId: item?.snippet?.parentId,
    videoId: item?.snippet.videoId,
    textDisplay: item?.snippet?.textDisplay,
    textOriginal: item?.snippet?.textOriginal,

    channel: {
      id: item?.snippet.channelId,
    },
    author: {
      id: item?.snippet?.authorChannelId.value,
      name: item?.snippet?.authorDisplayName,
      img: item?.snippet?.authorProfileImageUrl,
      url: item?.snippet?.authorChannelUrl,
    },

    likeCount: item?.snippet?.likeCount,
    dislikeCount: item?.snippet?.dislikeCount,

    publishedAt: item?.snippet?.publishedAt,
    updatedAt: item?.snippet?.updatedAt,
  };
};

/**
 * 구독 채널 데이터 바인딩
 * @param {} item
 */
export const bindSubscriptionChannelInfo = (item) => {
  return {
    id: item?.snippet?.resourceId?.channelId,
    title: item?.snippet?.title || '',
    img: item?.snippet?.thumbnails?.default?.url || '',
    // customUrl: item?.channelDetails?.snippet?.customUrl,
    description: item?.snippet?.description,
    subscriberCount: item?.channelDetails?.statistics?.subscriberCount || '0',
  };
};

/**
 * 채널 데이터 바인딩
 * @param {} item
 * @returns
 */
export const bindChannelInfo = (item) => {
  return {
    id: item?.id,
    title: item?.snippet?.title || '',
    customUrl: item?.snippet?.customUrl,
    description: item?.snippet?.description,
    img: item?.snippet?.thumbnails?.default?.url || '',
    subscriberCount: item?.statistics?.subscriberCount || '0',
  };
};
