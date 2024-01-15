import { RelateVideoContainer } from '../../../assets/wrappers/Watch/RelateVideo';
import CompactCard from '../../Card/CompactCard';
import Chips from '../../Chips';

const WatchSecondary = ({ videoId }) => {
  return (
    <RelateVideoContainer>
      <Chips position="relative" width="402px" />
      {/* <CompactCard item={item} /> */}
    </RelateVideoContainer>
  );
};

export default WatchSecondary;
