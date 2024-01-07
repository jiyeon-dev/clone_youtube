import styled from 'styled-components';

const CardSkeleton = () => {
  return (
    <SkeletonCard>
      <div className="thumbnail"></div>
      <div className="info">
        <div className="avatar"></div>
        <div className="details">
          <div className="title"></div>
          <div className="channel-name"></div>
          <div className="views"></div>
        </div>
      </div>
    </SkeletonCard>
  );
};
export default CardSkeleton;

const SkeletonCard = styled.div`
  position: relative;
  overflow: hidden;
  margin: 10px;
  width: calc(25% - 20px); /* 33.33% width with 20px margin */
  /* 윈도우 사이즈에 따른 card 수 변경 */
  @media screen and (max-width: 1190px) {
    width: calc(33.33% - 20px); /* 3개 */
  }
  @media screen and (max-width: 900px) {
    width: calc(50% - 20px); /* 2개 */
  }
  @media screen and (max-width: 700px) {
    width: 100%; /* 1개 */
  }

  .thumbnail {
    width: 100%;
    height: 200px;
    border-radius: 5px;
    background-color: #ddd;
  }

  .info {
    padding: 10px;
    flex: 1;
    display: flex;
  }

  .avatar {
    width: 40px;
    height: 40px;
    background-color: #ddd;
    border-radius: 50%;
  }

  .details {
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
  }

  .title {
    width: 70%;
    height: 12px;
    background-color: #ddd;
  }

  .channel-name {
    width: 50%;
    height: 12px;
    background-color: #ddd;
  }
`;
