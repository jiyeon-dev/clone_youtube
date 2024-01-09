import { formatViewCount, formatDate } from '../../../utils/formatter';
import { Badge } from '../../../assets/wrappers/Cards';
import { CiStreamOn } from 'react-icons/ci';

// 조회수, 업로드날짜, 실시간 뱃지 표시 정보
const VerticalCardMetaData = ({ channel, isLive, publishedAt, viewCount }) => {
  const isYoutubeMovie = channel.title === 'YouTube Movies' ? true : false; // 유튜브 무비인 경우

  // 라이브인 경우
  if (isLive) {
    return (
      <>
        <div className="metadata-line">
          <div className="video-views">
            {formatViewCount(viewCount)}명 시청 중
          </div>
        </div>
        <Badge>
          <div>
            <CiStreamOn size={14} />
            <span>실시간</span>
          </div>
        </Badge>
      </>
    );
  }

  // 유튜브 영화인 경우
  if (isYoutubeMovie) {
    return (
      <div className="metadata-line">
        <span className="video-upload-date">{formatDate(publishedAt)}</span>
      </div>
    );
  }

  // 그 외 (기본)
  return (
    <div className="metadata-line">
      <div className="video-views">조회수 {formatViewCount(viewCount)}회</div>
      <span className="video-upload-date">{formatDate(publishedAt)}</span>
    </div>
  );
};
export default VerticalCardMetaData;
