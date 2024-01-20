import styled, { css } from 'styled-components';
import { SlArrowLeft } from 'react-icons/sl';
import Arrow from '../../../../assets/icons/Arrow.svg?react';

const ArrowButton = ({ type }) => {
  if (type === 'left') {
    return (
      <LeftArrowButton>
        <Button>
          <Arrow style={{ transform: 'rotate(90deg)' }} />
        </Button>
      </LeftArrowButton>
    );
  }

  return (
    <RightArrowButton>
      <Button>
        <Arrow style={{ transform: 'rotate(-90deg)' }} />
      </Button>
    </RightArrowButton>
  );
};
export default ArrowButton;

const ArrowButtonStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  height: 118px;
  z-index: 1;
  width: 0;
`;

const LeftArrowButton = styled.div`
  ${ArrowButtonStyle}
  top: 0;
  left: 0;
`;

const RightArrowButton = styled.div`
  ${ArrowButtonStyle}
  top: 0;
  right: 4px;
`;

const Button = styled.button`
  cursor: pointer;
  border: 0;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  padding: 0;
  font-size: 14px;
  line-height: 36px;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: var(--white);
  color: #0f0f0f;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.3), 0 0 4px rgba(0, 0, 0, 0.2);

  svg {
    width: 24px !important;
  }
`;
