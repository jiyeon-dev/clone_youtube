import { useEffect, useRef } from 'react';
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
import { useGlobalContext } from '../../../context';
import { bindVideoInfo } from '../../../utils/query';
import { useNavigate } from 'react-router-dom';

const WideCard = ({ item }) => {
  const video = bindVideoInfo(item);

  // thumbnail hover 시 영상 실행되도록 youtube-api iframe 사용
  const { isYouTubeApiReady } = useGlobalContext();
  const videoRef = useRef();
  let player;
  useEffect(() => {
    if (isYouTubeApiReady && videoRef.current)
      player = new window.YT.Player(videoRef.current, {
        videoId: video.id,
        events: {
          onStateChange: (event) => {
            // 재생, 정지, 버퍼링등 영상 상태가 변경되면 호출됨.
            // console.log(event.data);
          },
        },
      });
  }, [videoRef, isYouTubeApiReady]);
  function handleMouseOver() {
    try {
      if (player) player.playVideo();
    } catch (error) {}
  }
  const handleMouseOut = () => {
    if (player) player.pauseVideo();
  };

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
        {/* <div className="overlay" ref={videoRef} /> */}
        <iframe
          ref={videoRef}
          className="overlay"
          frameBorder={0}
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; "
          src={`https://www.youtube.com/embed/${video.id}?controls=0&fs=0&origin=http://localhost:5173&enablejsapi=1&widgetid=1&mute=1`}
          onMouseOver={() => handleMouseOver()}
          onMouseOut={() => handleMouseOut()}
        />
        <div className="progress-bar none">
          <div className="progress" />
        </div>
        <div className="video-duration">{formatDuration(video.duration)}</div>
      </Thumbnail>

      <CardInfo>
        <div className="video-title">{video.title}</div>
        <div className="metadata-line">
          <div className="video-views">
            조회수 {formatViewCount(video.viewCount)}회
          </div>
          <span className="video-upload-date">
            {formatDate(video.publishedAt)}
          </span>
        </div>
        <div className="channel-info">
          <a className="channel-thumbnail" href={`/${video.channel.customUrl}`}>
            <img
              src={video.channel.img}
              alt={video.channel.title}
              draggable={false}
            />
          </a>
          <a className="channel-name" href={`/${video.channel.customUrl}`}>
            {video.channel.title}
          </a>
        </div>
        <div className="video-description">{video.channel.description}</div>
      </CardInfo>
    </Card>
  );
};
export default WideCard;
