import { useInView } from 'react-intersection-observer';
import { useEffect, useMemo } from 'react';
import {
  WideCardsWrapper as CardsWrapper,
  Target,
} from '../../../assets/wrappers/Cards';
import { useFetchVideoList } from '../../../utils/query';
import WideCard from './WideCard';
import { useGlobalContext } from '../../../context';

const WideCardList = ({ searchQuery, queryKey }) => {
  const { ref, inView } = useInView({
    threshold: 0,
    delay: 100,
  });

  const { data, hasNextPage, isFetching, fetchNextPage } = useFetchVideoList(
    queryKey,
    searchQuery,
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

  // youtube api 초기화
  const { initializeYouTubeApi } = useGlobalContext();
  useEffect(() => {
    const youtubeApi = async () => {
      await initializeYouTubeApi();
    };
    youtubeApi();
  }, []);

  return (
    <CardsWrapper>
      {videos.map((item, idx) => (
        <WideCard key={idx} item={item} />
      ))}
      <Target ref={ref}></Target>
    </CardsWrapper>
  );
};
export default WideCardList;
