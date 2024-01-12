import { RelateVideoContainer } from '../../../assets/wrappers/Watch/RelateVideo';
import CompactCard from '../../Card/CompactCard';

const WatchSecondary = ({ videoId, item }) => {
  return (
    <RelateVideoContainer>
      <CompactCard item={item} />
    </RelateVideoContainer>
  );
};

export default WatchSecondary;
