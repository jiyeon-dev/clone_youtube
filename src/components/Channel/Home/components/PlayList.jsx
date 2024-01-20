import styled from 'styled-components';
import ArrowButton from './ArrowButton';
import PlayListItem from './PlayListItem';

const PlayList = ({ videoList }) => {
  return (
    <PlayListWrapper>
      <ArrowButton type="left" />

      {/* Scroll */}
      <ScrollContainer>
        <ScrollContainerItems>
          {videoList.map((item) => (
            <PlayListItem key={item.id} item={item} />
          ))}
        </ScrollContainerItems>
      </ScrollContainer>

      <ArrowButton type="right" />
    </PlayListWrapper>
  );
};
export default PlayList;

const PlayListWrapper = styled.div`
  margin-top: 24px;
  margin-bottom: 24px;
  position: relative;
`;

const ScrollContainer = styled.div`
  overflow: hidden;
`;

const ScrollContainerItems = styled.div`
  transition-duration: 0.15s;
  transition-timing-function: cubic-bezier(0.05, 0, 0, 1);
  white-space: nowrap;
  margin-bottom: 24px;
`;
