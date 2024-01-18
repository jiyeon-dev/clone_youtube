import { useRef } from 'react';
import styled from 'styled-components';

const SubscribeButton = ({ channelId }) => {
  const ref = useRef();

  const handleClick = () => {
    alert(`구독 : ${channelId}`);
  };

  return (
    <Button ref={ref} onClick={() => handleClick()}>
      구독
    </Button>
  );
};
export default SubscribeButton;

const Button = styled.button`
  border: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0f0f0f;
  background-color: rgba(0, 0, 0, 0.05);
  height: 36px;
  cursor: pointer;

  background: #0f0f0f;
  color: var(--white);
  border-radius: 18px;
  padding: 0 16px;
  font-size: 14px;
`;
