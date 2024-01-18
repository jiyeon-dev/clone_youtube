import { useState } from 'react';
import {
  VideoPrimary,
  VideoMetaDataContainer,
  MetaDataTopRow,
  Owner,
  Actions,
  MetaDataBottomRow,
  Description,
  WatchInfo,
  DescriptionExpander,
} from '../../../assets/wrappers/Watch/VideoMetaData';
import { TbDots } from 'react-icons/tb';
import { PiShareFatLight } from 'react-icons/pi';
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai'; // 좋아요
import {
  formatViewCount,
  formatComma,
  formatDate2,
} from '../../../utils/formatter';
import VideoCommentList from './VideoCommentList';
import VideoCommentHeader from './VideoCommentHeader';
import SubscribeButton from '../../SubscribeButton';

const WatchPrimary = ({ video }) => {
  // -- description 더보기
  const [isExpanded, setIsExpanded] = useState(false);
  const handleButton = (event) => {
    setIsExpanded(() => {
      event.target.innerText = !!!isExpanded ? '간략히' : '...더보기';
      return !isExpanded;
    });
  };

  return (
    <VideoPrimary data-video-id={video.id}>
      <iframe
        frameBorder={0}
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; "
        src={`https://www.youtube.com/embed/${video.id}?origin=http://localhost:5173`}
      />
      <VideoMetaDataContainer>
        <h1 id="title">{video.title}</h1>
        <MetaDataTopRow>
          <Owner>
            <a className="avatar" href={`/${video.channel.customUrl}`}>
              <img
                src={video.channel.img}
                alt={video.channel.title}
                draggable={false}
              />
            </a>
            <div className="channel-info">
              <a id="channel-name" href={`/${video.channel.customUrl}`}>
                {video.channel.title}
              </a>
              <span id="owner-sub-count">
                구독자 {formatViewCount(video.channel.subscriberCount)}만명
              </span>
            </div>
            <SubscribeButton channelId={video.channel.id} />
          </Owner>
          <Actions>
            <button id="like" className="content">
              <AiOutlineLike size={24} />
              {video.likeCount && <span>{video.likeCount}</span>}
            </button>
            <button id="dislike" className="content">
              <AiOutlineDislike size={24} />
              {video.disLikeCount && <span>{video.disLikeCount}</span>}
            </button>
            <button id="share" className="content">
              <PiShareFatLight size={24} />
              <span>공유</span>
            </button>
            <button id="more">
              <TbDots size={24} />
            </button>
          </Actions>
        </MetaDataTopRow>
        <MetaDataBottomRow>
          <Description>
            <WatchInfo>
              <span id="view-count">
                조회수 {formatComma(video.viewCount)}회
              </span>
              <span id="date-time">{formatDate2(video.publishedAt)}</span>
            </WatchInfo>
            <DescriptionExpander className={isExpanded ? 'expanded' : ''}>
              <span>{video.description}</span>
              <button onClick={(event) => handleButton(event)}>
                ...더 보기
              </button>
            </DescriptionExpander>
          </Description>
        </MetaDataBottomRow>
      </VideoMetaDataContainer>

      {/* 댓글 */}
      <VideoCommentHeader
        commentCount={video.commentCount}
      ></VideoCommentHeader>
      <VideoCommentList videoId={video.id}></VideoCommentList>
    </VideoPrimary>
  );
};
export default WatchPrimary;
