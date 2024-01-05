import {
  ThumbnailCard as Card,
  Thumbnail,
  CardInfo,
} from '../../assets/wrappers/ThumbnailCard';
import { GoCheckCircleFill } from 'react-icons/go';
import { formatDuration } from '../../utils/formatter';
import ThumbnailCardMetaData from './ThumbnailCardMetaData';

const ThumbnailCard = ({ item }) => {
  const snippet = item.snippet;
  const thumbnail = snippet.thumbnails;
  const details = item?.contentDetails;
  const statistics = item?.statistics;
  const channel = item?.channelDetails;
  const isLive = snippet?.liveBroadcastContent === 'live' ? true : false; // 실시간 라이브 여부

  return (
    <Card data-video-id={item.etag}>
      <Thumbnail>
        <img src={thumbnail.medium.url} alt={thumbnail.title} />
        <div className="overlay"></div>
        <div className="progress-bar none">
          <div className="progress" />
        </div>
        {!isLive && (
          <div className="video-duration">
            {formatDuration(details?.duration)}
          </div>
        )}
      </Thumbnail>
      <CardInfo>
        <a className="avatar">
          <img src={channel?.thumbnails.default.url} alt={channel?.title} />
        </a>
        <div className="details">
          <a className="video-title">{snippet.title}</a>
          <div className="channel-name">
            <span>{snippet.channelTitle}</span>
            <GoCheckCircleFill className="none" />
          </div>
          <ThumbnailCardMetaData
            snippet={snippet}
            statistics={statistics}
            isLive={isLive}
            liveStreamingDetails={item.liveStreamingDetails}
          />
        </div>
      </CardInfo>
    </Card>
  );
};

export default ThumbnailCard;
