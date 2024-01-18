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
  const handelClickCard = (e) => {
    e.preventDefault();

    if (e.target.tagName === 'A' || e.target.parentElement.tagName === 'A') {
      const url = e.target.href || e.target.parentElement.href;
      window.location.href = url;
    } else {
      const videoId = video.id;
      if (videoId) {
        navigate(`/watch?v=${videoId}`);
      } else {
        console.error('can not find video id');
      }
    }
  };

  return (
    <Card onClick={(e) => handelClickCard(e)}>
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
        <a className="avatar" href={`/${video.channel.customUrl}`}>
          <img
            src={video.channel.img}
            alt={video.channel.title}
            draggable={false}
          />
        </a>
        <div className="details">
          <div className="video-title">{video.title}</div>
          <a className="channel-name" href={`/${video.channel.customUrl}`}>
            <span>{video.channel.title}</span>
            <GoCheckCircleFill className="none" />
          </a>
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
