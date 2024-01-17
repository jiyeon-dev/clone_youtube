import { RelateVideoContainer } from '../../../assets/wrappers/Watch/RelateVideo';
import CompactCardList from '../../Card/CompactCardList';
import Chips from '../../Chips';
import { getISODate } from '../../../utils/formatter';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

const WatchSecondary = ({ videoId, channel }) => {
  const location = useLocation();
  const QUERY_KEY = ['compact-video-lists', location.key];
  const [queryKey, setQueryKey] = useState(QUERY_KEY);

  const chipList = [
    { name: '모두', option: { q: null }, selected: true },
    {
      name: `${channel.title} 제공`,
      option: { channelId: channel.id, type: 'video' },
    },
    // { name: '관련 콘텐츠', option: { } },
    {
      name: '최근에 업로드된 동영상',
      option: { publishedAfter: getISODate(-1), type: 'video' },
    },
    { name: '감상한 동영상', value: '' },
  ];

  // 조회 옵션이 변경된 경우 queryKey 변경
  const updateQueryKey = (newKey) => {
    setQueryKey([...QUERY_KEY, newKey]);
    window.scroll({ top: 0, behavior: 'smooth' });
  };

  return (
    <RelateVideoContainer>
      <Chips
        position="relative"
        width="402px"
        chipList={chipList}
        updateQueryKey={updateQueryKey}
      />
      <CompactCardList queryKey={queryKey} />
    </RelateVideoContainer>
  );
};

export default WatchSecondary;
