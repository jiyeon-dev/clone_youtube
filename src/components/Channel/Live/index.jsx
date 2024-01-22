import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { gridPadding } from '../styles';
import VerticalCardGrid from '../../Card/VerticalCardList/grid';
import { useChannelContext } from '../../../pages/Channel';
import { SearchProvider } from '../../../context';
import Chips from '../../Chips';
import { useQueryClient } from '@tanstack/react-query';

const ChannelLive = () => {
  const { channel } = useChannelContext();

  // chip 리스트
  const chipList = [
    {
      name: '최신순',
      option: {
        order: 'date',
        channelId: channel.id,
        eventType: 'completed',
      },
      selected: true,
    },
    {
      name: '인기순',
      option: {
        order: 'viewCount',
        channelId: channel.id,
        eventType: 'completed',
      },
    },
  ];

  const QUERY_KEY = ['channel-live-lists', 'tab-live', channel.id];
  const [queryKey, setQueryKey] = useState(QUERY_KEY);
  const [searchOption, setSearchOption] = useState({
    part: 'snippet', // id,snippet,replies
    type: 'video',
    maxResults: 40,
    ...chipList[0]?.option,
  });

  // 조회 옵션이 변경된 경우 queryKey 변경
  const queryClient = useQueryClient();
  const updateQueryKey = (newKey) => {
    queryClient.removeQueries({ queryKey }); // 기존 캐시 제거
    setQueryKey([...QUERY_KEY, newKey]);
    setSearchOption((prevState) => ({
      ...prevState,
      ...newKey,
    }));
  };

  return (
    <SearchProvider>
      <Content>
        <Chips
          position="relative"
          chipList={chipList}
          updateQueryKey={updateQueryKey}
        />
        <VerticalCardGrid queryKey={queryKey} searchOption={searchOption} />
      </Content>
    </SearchProvider>
  );
};

export default ChannelLive;

const Content = styled.div`
  ${gridPadding}
`;
