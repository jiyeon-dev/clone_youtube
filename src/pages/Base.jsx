import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import styled from 'styled-components';
import Chips from '../components/Chips';
import VerticalCardList from '../components/Card/VerticalCardList';
import { SearchProvider } from '../context';
import { getISODate } from '../utils/formatter';

const Base = () => {
  const location = useLocation();
  const QUERY_KEY = ['video-lists', location.key];
  const [queryKey, setQueryKey] = useState(QUERY_KEY);

  // unmount 될 때, 검색 쿼리 캐시 제거
  const queryClient = useQueryClient();
  useEffect(() => {
    return () => {
      queryClient.removeQueries({ queryKey });
    };
  }, [location.key]);

  // chip 리스트
  const chipList = [
    { name: '전체', option: { q: null }, selected: true },
    { name: '실시간', option: { eventType: 'live', type: 'video' } },
    { name: '게임', option: { topicId: '/m/0bzvm2', type: 'video' } },
    { name: '음악', option: { topicId: '/m/04rlf', type: 'video' } },
    { name: '엔터테이먼트', option: { topicId: '/m/02jjt', type: 'video' } },
    { name: '요리 프로그램', option: { topicId: '/m/02wbm', type: 'video' } },
    {
      name: '최근에 업로드된 동영상',
      option: { publishedAfter: getISODate(-1), type: 'video' },
    },
    { name: '감상한 동영상', value: '' },
    // { name: '새로운 맞춤 동영상', option: { q: null } },
  ];

  // 조회 옵션이 변경된 경우 queryKey 변경
  const updateQueryKey = (newKey) => {
    setQueryKey([...QUERY_KEY, newKey]);
    window.scroll({ top: 0, behavior: 'smooth' });
  };

  return (
    <SearchProvider>
      <Container>
        <Chips chipList={chipList} updateQueryKey={updateQueryKey} />
        <VerticalCardList queryKey={queryKey} />
      </Container>
    </SearchProvider>
  );
};

export default Base;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
