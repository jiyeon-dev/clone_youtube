import {
  VerticalCard as Card,
  Thumbnail,
  VerticalCardInfo as CardInfo,
} from '../../../assets/wrappers/Cards';
import { formatDuration } from '../../../utils/formatter';
import { GoCheckCircleFill } from 'react-icons/go';
import VerticalCardMetaData from './VerticalCardMetaData';

const VerticalCard = ({ item }) => {
  const title = item?.snippet?.title;
  const thumbnailUrl = item?.snippet?.thumbnails?.medium?.url || '';
  const duration = item?.contentDetails?.duration || '';
  const publishedAt = item?.snippet?.publishedAt || '';
  const channel = {
    img: item?.channelDetails?.thumbnails?.default?.url || '',
    title: item?.channelDetails?.title || '',
    description: item?.snippet?.description || '',
  };
  const isLive = item?.snippet?.liveBroadcastContent === 'live' ? true : false; // 실시간 라이브 여부
  const viewCount =
    (isLive
      ? item?.liveStreamingDetails?.concurrentViewers
      : item?.statistics?.viewCount) || NaN;

  return (
    <Card>
      <Thumbnail>
        <img src={thumbnailUrl} alt={title} />
        <div className="overlay"></div>
        <div className="progress-bar none">
          <div className="progress" />
        </div>
        {!isLive && (
          <div className="video-duration">{formatDuration(duration)}</div>
        )}
      </Thumbnail>

      <CardInfo>
        <a className="avatar">
          <img src={channel.img} alt={channel?.title} />
        </a>
        <div className="details">
          <a className="video-title">{title}</a>
          <div className="channel-name">
            <span>{channel?.title}</span>
            <GoCheckCircleFill className="none" />
          </div>
          <VerticalCardMetaData
            isLive={isLive}
            viewCount={viewCount}
            publishedAt={publishedAt}
            channel={channel}
          />
        </div>
      </CardInfo>
    </Card>
  );
};
export default VerticalCard;
