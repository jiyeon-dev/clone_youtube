import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import styled from 'styled-components';
import Chips from '../components/Chips';
import VerticalCardList from '../components/Card/VerticalCardList';

const Base = () => {
  const location = useLocation();
  const queryKey = ['video-lists', location.key];

  // unmount 될 때, 검색 쿼리 캐시 제거
  const queryClient = useQueryClient();
  useEffect(() => {
    return () => {
      queryClient.removeQueries({ queryKey });
    };
  }, [location.key]);

  // chip 리스트
  const chipList = [
    { name: '전체', value: '', selected: true },
    { name: '실시간', value: '' },
    { name: '게임', value: '' },
    { name: '음악', value: '' },
    { name: '문화', value: '' },
    { name: '요리프로그램', value: '' },
    { name: '관광', value: '' },
    { name: '공예', value: '' },
    { name: '시각 예술', value: '' },
    { name: '최근에 업로드된 동영상', value: '' },
    { name: '감상한 동영상', value: '' },
    { name: '새로운 맞춤 동영상' },
  ];

  return (
    <Container>
      <Chips chipList={chipList} />
      <VerticalCardList queryKey={queryKey} />
    </Container>
  );
};

export default Base;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
