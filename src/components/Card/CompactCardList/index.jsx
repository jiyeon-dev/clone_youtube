import { useInView } from 'react-intersection-observer';
import { useEffect, useMemo } from 'react';
import { Target } from '../../../assets/wrappers/Cards';
import { useFetchVideoList } from '../../../utils/query';
import CompactCard from './CompactCard';
import Loader from '../../Loader';
import { useSearchContext } from '../../../context';

const CompactCardList = ({ queryKey }) => {
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
    <>
      {videos.map((item, idx) => (
        <CompactCard key={idx} item={item} />
      ))}
      {isFetching && <Loader />}
      <Target ref={ref}></Target>
    </>
  );
};
export default CompactCardList;
