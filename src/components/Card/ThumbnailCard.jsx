import {
  ThumbnailCardsWrapper as CardsWrapper,
  ThumbnailCard as Card,
  Thumbnail,
  CardInfo,
} from '../../assets/wrappers/ThumbnailCard';
import { GoCheckCircleFill } from 'react-icons/go';

const ThumbnailCard = () => {
  return (
    <Card data-video-id="YOUTUBE_VIDEO_ID_1">
      <Thumbnail>
        <img
          src="https://i4.ytimg.com/vi/x_i9GBnyxA4/0.jpg"
          alt="Video Thumbnail 1"
        />
        <div className="overlay"></div>
        <div className="progress-bar">
          <div className="progress" />
        </div>
        <div className="video-duration">23:00</div>
      </Thumbnail>
      <CardInfo>
        <a className="avatar">
          {/* <img src="channel_avatar1.jpg" alt="Channel Avatar 1" /> */}
        </a>
        <div className="details">
          <a className="video-title">
            ASMR | Build Disney+ with React JS (Firebase + Styled Components +
            Redux)
          </a>
          <div className="channel-name">
            <span>Channel Name</span>
            <GoCheckCircleFill />
          </div>
          <div className="metadata-line">
            <div className="video-views">조회수 37만회</div>
            <span className="video-upload-date">2년 전</span>
          </div>
        </div>
      </CardInfo>
    </Card>
  );
};

export default ThumbnailCard;
