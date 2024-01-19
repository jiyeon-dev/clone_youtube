import styled from 'styled-components';
import Channel from '../../components/Channels';
import { useLocation } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { Target } from '../../assets/wrappers/Cards';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo, useEffect, useState } from 'react';
import { getChannels, getSubscriptions } from '../../utils/youtubeAxios';

const Channels = () => {
  const [subscribeChannelList, setSubscribeChannelList] = useState([]);
  const location = useLocation();
  const queryKey = ['channel-lists', location.key, subscribeChannelList];

  const { ref, inView } = useInView({
    threshold: 0,
    delay: 100,
    triggerOnce: true,
  });

  // 구독한 채널 리스트 조회
  const getSubscribeChannel = async () => {
    const arr = [];
    const response = await getSubscriptions();
    response.items.forEach((item, i) => {
      const channelId = item?.snippet?.resourceId?.channelId;
      arr.push(channelId);
    });
    setSubscribeChannelList(arr);
  };

  let { data, hasNextPage, isFetching, fetchNextPage } = useInfiniteQuery({
    initialPageParam: undefined,
    queryKey,
    queryFn: async ({ pageParam = undefined }) => {
      if (!subscribeChannelList || subscribeChannelList.length === 0) {
        await getSubscribeChannel();
      }

      const channelId = subscribeChannelList.join(',') || ' ';
      const searchOption = { id: channelId };
      const response = await getChannels(searchOption);
      return response;
    },
    staleTime: 360000, // default : 0 ( 매초마다 fetching 해서 서버로 부터 데이터 업데이트 함 )
    getNextPageParam: (data) => {
      if (data && 'nextPageToken' in data) return data['nextPageToken'];
      else return undefined;
    },
  });

  useEffect(() => {
    // inView가 true 일때만 실행
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView]);

  const channels = useMemo(() => {
    if (data) {
      return data.pages.flatMap(({ items }) => {
        return items;
      });
    } else return [];
  }, [data]);

  return (
    <Contents>
      {channels.map((item, idx) => (
        <Channel key={idx} item={item} />
      ))}
      <Target ref={ref} />
    </Contents>
  );
};
export default Channels;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 24px;
  max-width: 1284px;
  text-align: center;
`;
