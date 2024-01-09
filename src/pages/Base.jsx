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

  return (
    <Container>
      <Chips />
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
