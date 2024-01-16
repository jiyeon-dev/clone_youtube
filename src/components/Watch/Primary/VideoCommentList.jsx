import { useInView } from 'react-intersection-observer';
import { useEffect, useMemo } from 'react';
import { Target } from '../../../assets/wrappers/Cards';
import { CommentsWrapper } from '../../../assets/wrappers/Watch/Comment';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getCommentList } from '../../../utils/youtubeAxios';

const VideoCommentList = ({ videoId }) => {
  const { ref, inView } = useInView({
    threshold: 0,
    delay: 100,
  });

  useInfiniteQuery({
    initialPageParam: undefined,
    queryKey: [videoId, 'comment-list'],
    queryFn: async ({ pageParam = undefined }) => {
      const response = await getCommentList();
      console.log(response);
      return response;
    },
    staleTime: 360000, // default : 0 ( 매초마다 fetching 해서 서버로 부터 데이터 업데이트 함 )
    getNextPageParam: (data) => {
      if (data && 'nextPageToken' in data) return data['nextPageToken'];
      else return undefined;
    },
  });

  return (
    <CommentsWrapper>
      <Target ref={ref}></Target>
    </CommentsWrapper>
  );
};
export default VideoCommentList;
