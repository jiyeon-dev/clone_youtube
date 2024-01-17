import { bindVideoInfo } from '../../../utils/query';
import {
  WideCard as Card,
  CompactCardThumbnail as Thumbnail,
  CompactCardInfo as CardInfo,
} from '../../../assets/wrappers/Cards';
import { formatDuration } from '../../../utils/formatter';
import CompactCardMetaData from './CompactCardMetaData';
import { useNavigate } from 'react-router-dom';

const CompactCard = ({ item }) => {
  const video = bindVideoInfo(item);
  const isLive = video.isLive;
  const viewCount = (isLive ? video.concurrentViewers : video.viewCount) || NaN;

  // Card 클릭 시 Watch 페이지로 이동
  let navigate = useNavigate();
  const handelClickCard = (videoId) => {
    if (videoId) {
      navigate({
        pathname: '/watch',
        search: `?v=${videoId}`,
        replace: true,
      });
    } else {
      console.error('can not find video id');
    }
  };

  return (
    <Card onClick={() => handelClickCard(video.id)}>
      <Thumbnail>
        <img src={video.thumbnail.url} alt={video.thumbnail.title} />
        <div className="video-duration">{formatDuration(video.duration)}</div>
      </Thumbnail>
      <CardInfo>
        <div className="video-title">{video.title}</div>
        <div className="channel-name">{video.channel.title}</div>
        <CompactCardMetaData
          isLive={isLive}
          viewCount={viewCount}
          publishedAt={video.publishedAt}
        />
      </CardInfo>
    </Card>
  );
};
export default CompactCard;
