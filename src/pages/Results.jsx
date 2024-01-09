import { useSearchParams, useLocation } from 'react-router-dom';
import WideCardList from '../components/Card/WideCardList';
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

const Results = () => {
  const [params] = useSearchParams();
  const searchQuery = params.get('search_query');

  const location = useLocation();
  const queryKey = ['video-lists', location.key, searchQuery];

  // unmount 될 때, 검색 쿼리 캐시 제거
  const queryClient = useQueryClient();
  useEffect(() => {
    return () => {
      queryClient.removeQueries({ queryKey });
    };
  }, [location.key]);

  return <WideCardList searchQuery={searchQuery} queryKey={queryKey} />;
};
export default Results;
