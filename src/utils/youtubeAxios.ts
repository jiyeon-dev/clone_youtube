import axios, { AxiosError } from 'axios';
import { SearchOption, YVideoDataList } from '../types/youtube';

const isTestMode = import.meta.env.VITE_TEST_MODE || true;

const BaseURL = isTestMode
  ? 'http://localhost:5173/data'
  : 'https://youtube.googleapis.com/youtube/v3';
const makeURL = (url: string) => {
  return isTestMode ? `${url}.json` : url;
};

const client = axios.create({
  baseURL: BaseURL,
  params: { key: import.meta.env.VITE_YOUTUBE_API_KEY },
});

/**
 * 비디오 목록 조회
 *
 * @param params 검색 조건
 * @returns 비디오 목록
 */
export const getVideoList = async <YVideoDataList>(
  params: SearchOption,
): Promise<YVideoDataList | AxiosError> => {
  const defaultParams: SearchOption = {
    part: 'snippet', // id,snippet,replies
    type: 'video',
    maxResults: 20,
    regionCode: 'kr',
    videoSyndicated: true,
  };

  const newParams: SearchOption = Object.assign(defaultParams, params);
  console.log(newParams);
  const response = await client.get<YVideoDataList>(makeURL('/search'), {
    params: newParams,
  });

  return response.data;
};

/**
 * 비디오 상세 검색
 *
 * @param params 검색 조건
 * @returns 비디오 목록
 */
export const getVideoInfoList = async (params: SearchOption) => {
  params.part = 'snippet,contentDetails,statistics';

  const response = await client.get(makeURL('/videos'), {
    params,
  });
  return response.data;
};

/**
 * 채널 상세 검색
 *
 * @param params 검색 조건
 * @returns 비디오 목록
 */
export const getChannelDetailList = async (params: SearchOption) => {
  params.part = 'snippet,contentDetails,statistics';

  const response = await client.get(makeURL('/channels'), {
    params,
  });
  return response.data;
};

/**
 * 비디오 댓글 검색
 *
 * @param params 검색 조건
 * @returns 댓글 목록
 */
export const getCommentList = async (params: SearchOption) => {
  const defaultParams: SearchOption = {
    part: 'snippet', // id,snippet,replies
    order: 'relevance', // relevance, time
    maxResults: 50,
  };
  const newParams: SearchOption = Object.assign(defaultParams, params);
  const response = await client.get(makeURL('/commentThreads'), {
    params: newParams,
  });
  return response.data;
};

/**
 * 비디오 댓글의 답글 목록 검색
 *
 * @param params 검색 조건
 * @returns 답글 목록
 */
export const getReplyList = async (params: SearchOption) => {
  const defaultParams: SearchOption = {
    part: 'replies', // id,snippet,replies
    maxResults: 50,
  };

  const url = isTestMode ? makeURL('/replies') : makeURL('/commentThreads');
  const newParams: SearchOption = Object.assign(defaultParams, params);
  const response = await client.get(url, {
    params: newParams,
  });
  return response.data;
};

/**
 * 구독 채널 리스트 조회
 *
 * @param params 검색 조건
 * @returns 채널 목록
 */
export const getSubscriptions = async (params: SearchOption) => {
  const defaultParams: SearchOption = {
    part: 'snippet',
    maxResults: 20,
    mine: true,
  };

  const newParams: SearchOption = Object.assign(defaultParams, params);
  const response = await client.get(makeURL('/subscriptions'), {
    params: newParams,
  });
  return response.data;
};
