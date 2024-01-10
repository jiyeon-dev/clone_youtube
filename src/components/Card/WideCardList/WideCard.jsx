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

  // thumbnail hover 시 영상 실행되도록 youtube-api iframe 사용
  const { isYouTubeApiReady } = useGlobalContext();
  const videoRef = useRef();
  const videoId = item.id.videoId;
  let player;
  useEffect(() => {
    if (isYouTubeApiReady && videoRef.current)
      player = new window.YT.Player(videoRef.current, {
        videoId,
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

  return (
    <Card>
      <Thumbnail>
        <img src={thumbnailUrl} alt={title} />
        {/* <div className="overlay" ref={videoRef} /> */}
        <iframe
          ref={videoRef}
          className="overlay"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; "
          src={`https://www.youtube.com/embed/${videoId}?controls=0&fs=0&origin=http://localhost:5173&enablejsapi=1&widgetid=1&mute=1`}
          onMouseOver={() => handleMouseOver()}
          onMouseOut={() => handleMouseOut()}
        />
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
