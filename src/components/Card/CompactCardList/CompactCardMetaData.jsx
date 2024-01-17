import { Badge } from '../../../assets/wrappers/Cards';
import { formatViewCount, formatDate } from '../../../utils/formatter';
import { CiStreamOn } from 'react-icons/ci';

const CompactCardMetaData = ({ isLive, viewCount, publishedAt }) => {
  // 실시간인 경우
  if (isLive) {
    return (
      <>
        <div className="video-views">
          {formatViewCount(viewCount)}명 시청 중
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

  // 그 외
  else {
    return (
      <div className="metadata-line">
        <div className="video-views">조회수 {formatViewCount(viewCount)}회</div>
        <span className="video-upload-date">{formatDate(publishedAt)}</span>
      </div>
    );
  }
};
export default CompactCardMetaData;
