import { useEffect, useRef, useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { ChipsWrapper, ChipsContent, Chip } from '../../assets/wrappers/Chips';

const Chips = () => {
  const ScrollContainer = useRef();
  const ChipsContainer = useRef();
  const LeftArrow = useRef();
  const RightArrow = useRef();

  const handleResize = () => {
    const ScrollContainerWidth = ScrollContainer.current.clientWidth;
    const ChipsContainerWidth = ChipsContainer.current.clientWidth;
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

  // TODO: 화면 Width 변경에 따른 Left, Right 화살표 노출 및 스크롤 이동

  return (
    <ChipsWrapper>
      <ChipsContent>
        <div className="left-arrow none" ref={LeftArrow}>
          <button type="button" id="left-arrow" className="btn">
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
          <button type="button" id="right-arrow" className="btn">
            <FaAngleRight size={20} />
          </button>
        </div>
      </ChipsContent>
    </ChipsWrapper>
  );
};

export default Chips;
