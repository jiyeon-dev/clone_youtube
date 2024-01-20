import styled, { css } from 'styled-components';
import Arrow from '../../../../assets/icons/Arrow.svg?react';

const ArrowButton = ({ type, hide, fn }) => {
  return (
    <ArrowButtonContainer
      data-type={type}
      className={hide && 'none'}
      onClick={(e) => fn(type)}
    >
      <Button>
        {type === 'left' && <Arrow style={{ transform: 'rotate(90deg)' }} />}
        {type === 'right' && <Arrow style={{ transform: 'rotate(-90deg)' }} />}
      </Button>
    </ArrowButtonContainer>
  );
};
export default ArrowButton;

const ArrowButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  height: 118px;
  z-index: 1;
  width: 0;

  &[data-type='left'] {
    top: 0;
    left: 0;
  }

  &[data-type='right'] {
    top: 0;
    right: 4px;
  }
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
