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
  params.part = 'snippet';
  params.type = 'video';
  params.maxResults = 20;

  // https://youtube.googleapis.com/youtube/v3/search?key=AIzaSyAsG1v5fy1DKmwBQ9HwnkydJOdmOzP8mbI&pageToken=&part=snippet&type=video&maxResults=20
  const response = await client.get<YVideoDataList>(makeURL('/search'), {
    params,
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
  params.part = 'snippet';

  const response = await client.get(makeURL('/channels'), {
    params,
  });
  return response.data;
};
