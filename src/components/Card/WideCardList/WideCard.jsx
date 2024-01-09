import {
  WideCard as Card,
  WideCardThumbnail as Thumbnail,
  WideCardInfo as CardInfo,
} from '../../../assets/wrappers/Cards';
import {
  formatDuration,
  formatViewCount,
  formatDate,
} from '../../../utils/formatter';

const WideCard = ({ item }) => {
  const title = item?.snippet?.title;
  const thumbnailUrl = item?.snippet?.thumbnails?.high?.url || '';
  const duration = item?.contentDetails?.duration || '';
  const viewCount = item?.liveStreamingDetails?.concurrentViewers || NaN;
  const publishedAt = item?.snippet?.publishedAt || '';
  const channel = {
    img: item?.channelDetails?.thumbnails?.default?.url || '',
    title: item?.channelDetails?.title || '',
    description: item?.snippet?.description || '',
  };

  return (
    <Card>
      <Thumbnail>
        <img src={thumbnailUrl} alt={title} />
        <div className="overlay"></div>
        <div className="progress-bar none">
          <div className="progress" />
        </div>
        <div className="video-duration">{formatDuration(duration)}</div>
      </Thumbnail>

      <CardInfo>
        <div className="video-title">{title}</div>
        <div className="metadata-line">
          <div className="video-views">
            조회수 {formatViewCount(viewCount)}회
          </div>
          <span className="video-upload-date">{formatDate(publishedAt)}</span>
        </div>
        <div className="channel-info">
          <a className="channel-thumbnail" href="/@이름">
            <img src={channel.img} alt={channel.title} />
          </a>
          <span className="channel-name">{channel.title}</span>
        </div>
        <div className="video-description">{channel.description}</div>
      </CardInfo>
    </Card>
  );
};
export default WideCard;
