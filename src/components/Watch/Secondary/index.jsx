import { RelateVideoContainer } from '../../../assets/wrappers/Watch/RelateVideo';
import CompactCard from '../../Card/CompactCard';
import Chips from '../../Chips';

const WatchSecondary = ({ videoId, channel }) => {
  console.log(videoId, channel);
  const chipList = [
    { name: '모두', value: '', selected: true },
    {
      name: `${channel.title} 제공`,
      searchType: 'channel',
      value: channel.customUrl,
    },
    { name: '관련 콘텐츠', value: '' },
    { name: '최근에 업로드된 동영상', value: '' },
    { name: '감상한 동영상', value: '' },
  ];

  return (
    <RelateVideoContainer>
      <Chips position="relative" width="402px" chipList={chipList} />
      {/* <CompactCard item={item} /> */}
    </RelateVideoContainer>
  );
};

export default WatchSecondary;
