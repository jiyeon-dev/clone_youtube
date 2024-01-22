import { useInView } from 'react-intersection-observer';
import { useEffect, useMemo } from 'react';
import { Target } from '../../../assets/wrappers/Cards';
import { useFetchVideoList } from '../../../utils/query';
import VerticalCard from './VerticalCard';
import Skeleton from './Skeleton';
import styled from 'styled-components';

const SEARCH_OPTION = {
  part: 'snippet', // id,snippet,replies
  type: 'video',
  maxResults: 40,
  // // 실제 youtube api 에서는 channelIds 를 리스트로 받을 수 없어서 가장 처음 채널만 검색하도록 함.
  // channelId: channelIds.split(',')[0],
};

const VerticalCardGrid = ({
  channelIds,
  queryKey,
  searchOption = SEARCH_OPTION,
}) => {
  const { ref, inView } = useInView({
    threshold: 0,
    delay: 100,
  });

  const { data, hasNextPage, isFetching, fetchNextPage } = useFetchVideoList(
    queryKey,
    searchOption,
  );

  useEffect(() => {
    // inView가 true 일때만 실행
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView]);

  const videos = useMemo(() => {
    if (data) {
      return data.pages.flatMap(({ items }) => {
        return items;
      });
    } else return [];
  }, [data]);

  return (
    <CardsWrapper>
      {videos.map((item, idx) => (
        <VerticalCard key={idx} item={item} />
      ))}
      {isFetching &&
        Array(10)
          .fill(1)
          .map((el, i) => <Skeleton key={i} />)}
      <Target ref={ref}></Target>
    </CardsWrapper>
  );
};
export default VerticalCardGrid;

const CardsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  // grid-template-rows: auto auto; /* 2 rows */
  // grid-auto-rows: 0px; /* next rows equal to 0 */
  overflow: hidden; /* hide the overflow */
  gap: 15px;
  margin: 0 16px;

  & > div {
    width: 100%;
    margin: 0;
  }

  /* 윈도우 사이즈에 따른 card 수 변경 */
  @media screen and (max-width: 1750px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media screen and (max-width: 1190px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 700px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
