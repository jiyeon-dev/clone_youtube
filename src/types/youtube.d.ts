interface Result {
  etag: string;
  kind: string;
}

// export const enum SearchType {
//   video, // 동영상
//   playlist, // 재생목록
//   channel, // 채널
// }

export interface SearchOption {
  part: string;
  pageToken?: string; // 다음 페이지 키 값
  q?: String; // keyword 검색어
  type?: string;
  maxResults?: number; // 페이지 당 개수
  chart?: string; // 비디오 검색 차트
  regionCode: 'kr';
}

export interface YVideoDataList extends Result {
  id: {
    kind: string;
    videoId: string;
  };
  snippet: Snippet;
}

export interface YSnippet {
  channelId: string;
  channelTitle: string;
  description: string;
  liveBroadcastContent: string;
  publishTime: Date;
  publishedAt: Date;
  thumbnails: YThumbnail;
}

export interface YThumbnail {
  title: string;
  default: {
    url: string;
    height: number;
    width: number; // 120
  };
  medium: {
    url: string;
    height: number;
    width: number; // 320
  };
  high: {
    url: string;
    height: number;
    width: number; // 480
  };
}

export interface LiveStreamingDetails {
  activeLiveChatId: string;
  actualStartTime: Date;
  concurrentViewers: string;
  scheduledStartTime: Date;
}
