import styled from 'styled-components';

/**
 * Common
 */
// IntersectionObserver Target
export const Target = styled.div`
  margin: 20px 0 40px 0;
`;

// Card 안의 Thumbnail
export const Thumbnail = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 12px;

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 12px;
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

  &:hover {
    border-radius: 0 !important;
    .overlay {
      opacity: 1;
    }

    .video-duration {
      display: none;
    }
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
`;

/**
 * VerticalCard
 */
export const VerticalCardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: var(--header-height); // chips height
  /* justify-content: space-around; */
`;

export const VerticalCard = styled.div`
  position: relative;
  width: calc(20% - 20px); /* 5개 */
  margin: 10px;
  overflow: hidden;
  cursor: pointer;

  /* 윈도우 사이즈에 따른 card 수 변경 */
  @media screen and (max-width: 1750px) {
    width: calc(25% - 20px); /* 4개 */
  }
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

export const VerticalCardInfo = styled.div`
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

/**
 * WideCard
 */
export const WideCardsWrapper = styled(VerticalCardsWrapper)`
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  max-width: 1096px;
`;

export const WideCard = styled.div`
  position: relative;
  display: grid;
  /* grid-template-columns: 1fr 2fr;
  grid-gap: 16px; */
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  cursor: pointer;

  &:not(:first-child) {
    margin-top: 16px;
  }
`;

export const WideCardThumbnail = styled(Thumbnail)`
  max-width: 360px;
  min-width: 240px;
  margin-right: 16px;
  position: relative;
  overflow: hidden;

  img {
    aspect-ratio: 180/101;
  }
`;

export const WideCardInfo = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  flex: 1;
  flex-basis: 1e-9px;

  .video-title {
    margin-right: 80px;
    overflow: hidden;
    font-weight: 400;
    font-size: 18px;
    line-height: 1.6rem;
    color: #0f0f0f;
    text-overflow: ellipsis;
    white-space: normal;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .metadata-line {
    display: flex;
    color: rgb(96, 96, 96);
    font-size: 12px;
  }

  .metadata-line:has(.video-views) {
    .video-upload-date:before {
      content: '•';
      margin: 0 4px;
    }
  }

  .channel-info {
    padding: 12px 0;
    display: flex;
    align-items: center;

    a.channel-thumbnail {
      padding-right: 8px;
      display: flex;

      img {
        width: 24px;
        border-radius: 50%;
      }
    }

    .channel-name {
      color: #606060;
      font-size: 12px;
    }
  }

  .video-description {
    margin-bottom: 8px;
    white-space: nowrap;
    font-size: 12px;
    font-weight: 400;
    overflow: hidden;
    display: block;
    color: #606060;
    text-overflow: ellipsis;
    white-space: normal;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
`;

/**
 * Compact Card
 */
export const CompactCardThumbnail = styled.div`
  position: relative;
  overflow: hidden;
  margin-right: 8px;
  height: 94px;
  width: 168px;

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 12px;
  }
  .video-duration {
    position: absolute;
    bottom: 4px;
    right: 4px;
    background: rgba(0, 0, 0, 0.8);
    color: #fff;
    padding: 3px 4px;
    font-size: 10px;
    border-radius: 5px;
  }
`;

export const CompactCardInfo = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  flex: 1;
  flex-basis: 1e-9px;

  .video-title {
    margin: 0 0 4px 0;
    font-size: 14px;
    font-weight: 500;
    /* line-height: 1.6rem; */
    color: #0f0f0f;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .metadata-line,
  .channel-name {
    display: flex;
  }

  .channel-name,
  .video-views,
  .video-upload-date {
    color: rgb(96, 96, 96);
    font-size: 12px;
  }

  .metadata-line:has(.video-views) {
    .video-upload-date:before {
      content: '•';
      margin: 0 4px;
    }
  }
`;
