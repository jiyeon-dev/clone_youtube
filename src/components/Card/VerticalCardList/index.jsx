import { useInView } from 'react-intersection-observer';
import { useEffect, useMemo } from 'react';
import {
  VerticalCardsWrapper as CardsWrapper,
  Target,
} from '../../../assets/wrappers/Cards';
import { useFetchVideoList } from '../../../utils/query';
import VerticalCard from './VerticalCard';
import Skeleton from './Skeleton';
import { useSearchContext } from '../../../context';

const VerticalCardList = ({ queryKey }) => {
  const { searchOption } = useSearchContext();
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
        Array(8)
          .fill(1)
          .map((el, i) => <Skeleton key={i} />)}
      <Target ref={ref}></Target>
    </CardsWrapper>
  );
};
export default VerticalCardList;
