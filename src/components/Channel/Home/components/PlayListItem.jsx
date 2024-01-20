import styled from 'styled-components';
import { bindVideoInfo } from '../../../../utils/query';
import {
  formatDuration,
  formatViewCount,
  formatDate,
} from '../../../../utils/formatter';
import { useChannelContext } from '../../../../pages/Channel';
import { useNavigate } from 'react-router-dom';

const PlayListItem = ({ item }) => {
  const navigate = useNavigate();
  const channel = useChannelContext();
  const video = bindVideoInfo(item);

  const handleClick = (e) => {
    e.preventDefault();
    if (e.target.tagName === 'A' || e.target.parentElement.tagName === 'A') {
      const url = e.target.href || e.target.parentElement.href;
      navigate(url);
      // window.location.href = url;
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
    <Item onClick={(e) => handleClick(e)}>
      <Thumbnail>
        <img
          id="thumbnail"
          src={video.thumbnail.url}
          alt={video.title}
          draggable={false}
        />
        <div className="video-duration">{formatDuration(video.duration)}</div>
      </Thumbnail>

      <MetaData>
        <h3 id="title">{video.title}</h3>

        <a id="channel-name" href={`/${channel?.snippet?.customUrl}`}>
          {video.channel.title}
        </a>
        <div className="metadata-line">
          <div className="video-views">
            조회수 {formatViewCount(video.viewCount)}회
          </div>
          <span className="video-upload-date">
            {formatDate(video.publishedAt)}
          </span>
        </div>

        <div className="video-badges">
          {video.caption && <span className="status">자막</span>}
        </div>
      </MetaData>
    </Item>
  );
};
export default PlayListItem;

const Item = styled.div`
  margin-right: 4px;
  display: inline-block;

  width: 210px;
  cursor: pointer;
`;

const Thumbnail = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 8px;

  img#thumbnail {
    width: 210px;
    height: 118px;
    border-radius: 8px;
    border: 0;
  }

  .video-duration {
    position: absolute;
    bottom: 10px;
    right: 10px;
    background: rgba(0, 0, 0, 0.8);
    color: #fff;
    padding: 3px 4px;
    font-size: 12px;
    border-radius: 5px;
  }
`;

const MetaData = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  color: #606060;
  font-size: 12px;
  line-height: 18px;

  h3#title {
    margin: 8px 0;
    color: #0f0f0f;
    font-size: 14px;
    line-height: 20px;
    max-height: 40px;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    word-break: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  #channel-name {
    &:hover {
      color: #0f0f0f;
    }
  }

  .metadata-line {
    display: flex;
    font-size: 12px;

    &:has(.video-views) {
      .video-upload-date:before {
        content: '•';
        margin: 0 4px;
      }
    }
  }

  .video-badges {
    margin-top: 4px;
    margin-right: 8px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .status {
    background: rgba(0, 0, 0, 0.05);
    padding: 3px 4px;
    border-radius: 2px;
    line-height: 12px;
  }
`;
