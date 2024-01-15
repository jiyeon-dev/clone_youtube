import { useEffect, useRef, useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { ChipsWrapper, ChipsContent, Chip } from '../../assets/wrappers/Chips';

const Chips = ({ position = 'fixed', width }) => {
  const ScrollContainer = useRef();
  const ChipsContainer = useRef();
  const LeftArrow = useRef();
  const RightArrow = useRef();

  let translateX = 0; // chip container translateX 값
  const INTERVAL = 160; // chip translate 이동 간격

  const handleResize = () => {
    const ScrollContainerWidth = ScrollContainer.current.clientWidth;
    const ChipsContainerWidth = ChipsContainer.current.clientWidth;

    // chips 를 맨 왼쪽으로 이동.
    translateX = 0;
    ChipsContainer.current.style.transform = `translateX(${translateX}px)`;
    LeftArrow.current.classList.add('none');

    // chip 길이가 화면보다 길 경우 우측 화살표 생성
    if (ChipsContainerWidth > ScrollContainerWidth) {
      RightArrow.current.classList.remove('none');
    } else {
      RightArrow.current.classList.add('none');
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 우측 화살표 클릭 이벤트
  const handleRightButton = () => {
    const rightEnd = ScrollContainer.current.getBoundingClientRect().right;
    const chipRight = ChipsContainer.current.getBoundingClientRect().right;

    // 만약 chip 컨테이너가 스크롤 가능한 우측경계를 넘어간 경우, 우측 경계선까지만 이동.
    if (chipRight - INTERVAL <= rightEnd) {
      translateX = translateX - (chipRight - rightEnd);
      // 우측으로 갈 수 있는 마지막까지 왔기 때문에, 우측 화살표 비활성화
      RightArrow.current.classList.add('none');
    } else {
      translateX -= INTERVAL;
      LeftArrow.current.classList.remove('none'); // 우측으로 이동했기 때문에, 왼쪽 화살표 활성화
    }
    ChipsContainer.current.style.transform = `translateX(${translateX}px)`;
  };
  // 좌측 화살표 클릭 이벤트
  const handleLeftButton = () => {
    translateX += INTERVAL;

    // 초기 자리까지만 이동
    if (translateX > 0) translateX = 0;
    ChipsContainer.current.style.transform = `translateX(${translateX}px)`;

    // 왼쪽 끝에 도달한 경우, 좌측 화살표 비활성화
    const leftEnd = ScrollContainer.current.getBoundingClientRect().left;
    const chipLeft = ChipsContainer.current.getBoundingClientRect().left;
    if (translateX === 0 || leftEnd === chipLeft)
      LeftArrow.current.classList.add('none');

    // 우측 화살표 활성화
    RightArrow.current.classList.remove('none');
  };

  return (
    <ChipsWrapper position={position}>
      <ChipsContent width={width}>
        <div className="left-arrow none" ref={LeftArrow}>
          <button
            type="button"
            id="left-arrow"
            className="btn"
            onClick={() => handleLeftButton()}
          >
            <FaAngleLeft size={20} />
          </button>
        </div>
        <div className="scroll-container" ref={ScrollContainer}>
          <div className="chips-container" ref={ChipsContainer}>
            <Chip className="first selected">전체</Chip>
            <Chip>실시간</Chip>
            <Chip>게임</Chip>
            <Chip>음악</Chip>
            <Chip>문화</Chip>
            <Chip>요리프로그램</Chip>
            <Chip>관광</Chip>
            <Chip>공예</Chip>
            <Chip>시각 예술</Chip>
            <Chip>최근에 업로드된 동영상</Chip>
            <Chip>감상한 동영상</Chip>
            <Chip>새로운 맞춤 동영상</Chip>
          </div>
        </div>
        <div className="right-arrow none" ref={RightArrow}>
          <button
            type="button"
            id="right-arrow"
            className="btn"
            onClick={() => handleRightButton()}
          >
            <FaAngleRight size={20} />
          </button>
        </div>
      </ChipsContent>
    </ChipsWrapper>
  );
};

export default Chips;
