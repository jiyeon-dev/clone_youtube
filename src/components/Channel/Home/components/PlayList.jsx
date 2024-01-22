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
  const [opt, setOpt] = useState({
    maxX: 0, // 한 번에 보여지는 비디오 수
    totalPage: 0, // 총 페이지 수
  });
  const [, setCount] = useState(0);
  const [windowWidthSize, setWindowWidthSize] = useState(undefined);

  // 스크롤 옵션 설정
  const setScrollOption = async () => {
    let x = 0;
    if (window.innerWidth <= 685) {
      x = 2;
    } else if (window.innerWidth <= 971) {
      x = 3;
    } else if (window.innerWidth <= 1170) {
      x = 4;
    } else if (window.innerWidth < 1440) {
      x = 5;
    } else {
      x = 6;
    }

    setOpt((prevState) => ({
      ...prevState, //
      maxX: x,
      totalPage: Math.ceil(total / x),
    }));
  };

  // videoList 데이터 값 전달 받은 경우
  useEffect(() => {
    if (videoList.length > 0) {
      setScrollOption();
    } else {
      setHideLeftBtn(true);
      setHideRightBtn(true);
    }
  }, [videoList, windowWidthSize]);

  // scroll option 값이 변경된 경우 -> 스크롤 재이동
  useEffect(() => {
    handleScrollItems();
  }, [opt.maxX]);

  // 스크롤 이동
  const handleScrollItems = (type) => {
    const containerWidth = scrollContainer.current.offsetWidth;

    setCount((curCount) => {
      // translateX 변경
      let newCount = opt.totalPage < curCount ? opt.totalPage - 1 : curCount;
      if (type === 'right') newCount = curCount + 1;
      else if (type === 'left') newCount = curCount - 1;
      if (newCount < 0) newCount = 0;

      const offset = containerWidth * newCount;
      scrollItems.current.style.transform = `translateX(-${offset}px)`;

      // 왼쪽 버튼 노출
      if (newCount === 0) setHideLeftBtn(true);
      else setHideLeftBtn(false);

      // 오른쪽 버튼 노출
      if (newCount + 1 === opt.totalPage) setHideRightBtn(true);
      else setHideRightBtn(false);

      return newCount;
    });
  };

  // resize 이벤트 바인딩
  const handleResize = () => {
    setWindowWidthSize(window.innerWidth);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    } else {
      return () => window.removeEventListener('resize', () => null);
    }
  }, []);

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
