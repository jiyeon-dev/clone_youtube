import styled from 'styled-components';
import { IoMdPlay } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const SubHeader = ({ children, videoId, playListId }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate({
      pathname: '/watch',
      search: `?v=${videoId}&list=${playListId}`,
      replace: true,
    });
  };
  return (
    <TitleContainer>
      <h2>
        <a href={`/playlist?list=${playListId}`}>{children}</a>
      </h2>

      <PlayButton onClick={() => handleClick()}>
        <IoMdPlay size={16} />
        모두 재생
      </PlayButton>
    </TitleContainer>
  );
};
export default SubHeader;

const TitleContainer = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: row;
  align-items: center;

  height: 20px;
  color: #0f0f0f;

  h2 {
    margin-right: 8px;
    font-size: 20px;
  }
`;

const PlayButton = styled.button`
  border: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0f0f0f;
  background-color: var(--white);
  height: 36px;
  cursor: pointer;

  color: #0f0f0f;
  padding: 0 16px;
  font-size: 14px;
  line-height: 36px;
  border-radius: 18px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    border-color: transparent;
  }

  svg {
    margin-right: 6px;
    margin-left: -6px;
  }
`;
