import styled from 'styled-components';

export const ThumbnailCardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: var(--header-height); // chips height
  /* justify-content: space-around; */
`;

export const ThumbnailCard = styled.div`
  position: relative;
  width: calc(25% - 20px); /* 33.33% width with 20px margin */
  margin: 10px;
  overflow: hidden;
  cursor: pointer;

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
`;

export const Thumbnail = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 12px; /* 둥글게 만들기 */

  img {
    width: 100%;
    height: auto;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 18px;
    opacity: 0;
    transition: opacity 0.3s;
  }

  &:hover .overlay {
    opacity: 1;
  }

  .progress-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 4px;
    background-color: #909090;
    width: 100%;
    transition: width 0.3s ease-in-out;

    .progress {
      height: 100%;
      width: 20%;
      background-color: red; /* Progress bar background color */
    }
  }

  .video-duration {
    position: absolute;
    bottom: 10px;
    right: 10px;
    background: rgba(0, 0, 0, 0.8);
    color: #fff;
    padding: 5px;
    font-size: 12px;
    border-radius: 5px;
  }
`;

export const CardInfo = styled.div`
  width: 100%;
  padding: 10px;
  position: relative;
  display: flex;
  cursor: pointer;

  .avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    margin-right: 10px;
    background-color: green; // test color

    img {
      width: 100%;
      /* height: 100%; */
      border-radius: 50%;
    }
  }

  .details {
    flex: 1;

    .video-title {
      margin-bottom: 5px;
      text-decoration: none;
      color: #0f0f0f;
      font-size: 16px;
      font-weight: 500;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: normal;
      word-break: break-word;
      // 2줄까지 허용
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .channel-name {
      display: flex;
      align-items: center;
      font-size: 14px;
      color: #606060;
      margin-bottom: 2px;
    }

    .channel-name svg {
      margin-left: 4px;
      margin-right: 8px;
    }

    .metadata-line {
      display: flex;
      color: rgb(96, 96, 96);
      font-size: 14px;
    }

    .metadata-line:has(.video-views) {
      .video-upload-date:before {
        content: '•';
        margin: 0 4px;
      }
    }
  }
`;

export const Badge = styled.div`
  display: flex;
  align-items: center;
  margin: 4px 4px 0 0;

  div {
    display: flex;
    align-items: center;
    background-color: rgba(204, 0, 0, 0.9);
    color: var(--white);
    border-radius: 2px;
    padding: 3px 4px;
    font-size: 11px;
    font-weight: 500;

    span {
      margin-left: 4px;
    }
  }
  /* &:after {
    content: '실시간';
  } */
`;
