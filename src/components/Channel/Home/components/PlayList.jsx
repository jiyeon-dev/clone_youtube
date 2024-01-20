import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import ArrowButton from './ArrowButton';
import PlayListItem from './PlayListItem';

const PlayList = ({ videoList }) => {
  const [hideLeftBtn, setHideLeftBtn] = useState(true);
  const [hideRightBtn, setHideRightBtn] = useState(true);
  const scrollContainer = useRef();
  const scrollItems = useRef();

  const total = videoList.length; // 비디오 총 개수
  const [maxX, setMaxX] = useState(0); // 한 번에 보여지는 비디오 수
  const [, setCount] = useState(1);
  const [totalPage, setTotalPage] = useState(0); // 총 페이지 수

  useEffect(() => {
    setMaxX(6);
    if (total > maxX) {
      setHideRightBtn(false);
    }
    setTotalPage(Math.ceil(total / maxX));
  }, [videoList]); // window width 크기 변경되면 maxX 변경되야 함

  // 스크롤 이동
  const handleScrollItems = (type) => {
    const containerWidth = scrollContainer.current.offsetWidth;

    setCount((curCount) => {
      // translateX 변경
      const newCount = type === 'right' ? curCount + 1 : curCount - 1;
      const offset = containerWidth * newCount;
      scrollItems.current.style.transform = `translateX(-${offset}px)`;

      // 왼쪽 버튼 노출
      if (newCount === 0) setHideLeftBtn(true);
      else setHideLeftBtn(false);

      // 오른쪽 버튼 노출
      if (newCount + 1 === totalPage) setHideRightBtn(true);
      else setHideRightBtn(false);

      return newCount;
    });
  };

  return (
    <PlayListWrapper>
      <ArrowButton type="left" hide={hideLeftBtn} fn={handleScrollItems} />

      {/* Scroll */}
      <ScrollContainer ref={scrollContainer}>
        <ScrollContainerItems ref={scrollItems}>
          {videoList.map((item) => (
            <PlayListItem key={item.id} item={item} />
          ))}
        </ScrollContainerItems>
      </ScrollContainer>

      <ArrowButton type="right" hide={hideRightBtn} fn={handleScrollItems} />
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
