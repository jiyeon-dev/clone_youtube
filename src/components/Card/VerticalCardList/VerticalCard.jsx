import {
  VerticalCard as Card,
  Thumbnail,
  VerticalCardInfo as CardInfo,
} from '../../../assets/wrappers/Cards';
import { formatDuration } from '../../../utils/formatter';
import { GoCheckCircleFill } from 'react-icons/go';
import VerticalCardMetaData from './VerticalCardMetaData';
import { bindVideoInfo } from '../../../utils/query';
import { useNavigate } from 'react-router-dom';

const VerticalCard = ({ item }) => {
  const video = bindVideoInfo(item);
  const isLive = video.isLive;

  // Card 클릭 시 Watch 페이지로 이동
  let navigate = useNavigate();
  const handelClickCard = (videoId) => {
    if (videoId) {
      navigate(`/watch?v=${videoId}`);
    } else {
      console.error('can not find video id');
    }
  };

  return (
    <Card onClick={() => handelClickCard(video.id)}>
      <Thumbnail>
        <img src={video.thumbnail.url} alt={video.thumbnail.title} />
        <div className="overlay"></div>
        <div className="progress-bar none">
          <div className="progress" />
        </div>
        {!isLive && (
          <div className="video-duration">{formatDuration(video.duration)}</div>
        )}
      </Thumbnail>

      <CardInfo>
        <a className="avatar">
          <img src={video.channel.img} alt={video.channel.title} />
        </a>
        <div className="details">
          <a className="video-title">{video.title}</a>
          <div className="channel-name">
            <span>{video.channel.title}</span>
            <GoCheckCircleFill className="none" />
          </div>
          <VerticalCardMetaData
            isLive={isLive}
            viewCount={video.viewCount}
            publishedAt={video.publishedAt}
            channel={video.channel}
          />
        </div>
      </CardInfo>
    </Card>
  );
};
export default VerticalCard;
