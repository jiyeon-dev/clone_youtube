import styled, { css } from 'styled-components';

const buttonStyle = css`
  border: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0f0f0f;
  background-color: rgba(0, 0, 0, 0.05);
  height: 36px;
  cursor: pointer;
`;

export const VideoPrimary = styled.div`
  max-width: calc((100vh - 56px - 24px - 136px) * (16 / 9));
  width: calc((100vh - 56px - 24px - 136px) * (16 / 9));
  min-width: calc(360px * (16 / 9));

  padding-top: 24px;
  padding-right: 24px;
  margin-left: 24px;
  flex: 1;

  iframe {
    border-radius: 12px;
    width: 100%;
    aspect-ratio: 16 / 9;
    height: auto;
  }
`;
export const VideoMetaDataContainer = styled.div`
  margin-top: 12px;
  margin-bottom: 24px;
  color: #0f0f0f;

  h1#title {
    font-size: 20px;
    max-height: 5.6rem; // 56px
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    // 2줄까지 허용
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;

export const MetaDataTopRow = styled.div`
  margin-top: -4px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const metaData = styled.div`
  min-width: calc(50% - 6px);
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 12px;
`;
export const Owner = styled(metaData)`
  margin-right: 12px;

  .avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    margin-right: 10px;
    background-color: yellowgreen; // test color

    img {
      width: 100%;
      /* height: 100%; */
      border-radius: 50%;
    }
  }

  .channel-info {
    max-width: fit-content;
    margin-right: 24px;
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;

    #channel-name {
      font-weight: 600;
    }

    #owner-sub-count {
      color: #606060;
      margin-right: 4px;
      font-size: 12px;
      font-weight: 400;
    }
  }
`;

export const Actions = styled(metaData)`
  justify-content: flex-end;

  button {
    ${buttonStyle}
  }

  button.content:has(span) svg {
    margin-right: 6px;
    margin-left: -6px;
  }

  button#like {
    border-radius: 18px 0 0 18px;
    position: relative;
    padding: 0 16px;

    &:after {
      content: '';
      background: rgba(0, 0, 0, 0.1);
      position: absolute;
      right: 0;
      top: 6px;
      height: 24px;
      width: 1px;
    }
  }
  button#dislike {
    border-radius: 0 18px 18px 0;
    position: relative;
    padding: 0 16px;

    svg {
      transform: scale(-1, 1);
    }
  }

  button#share {
    padding: 0 16px;
    font-size: 14px;
    line-height: 36px;
    border-radius: 18px;
    margin-left: 6px;
  }

  button#more {
    border-radius: 50%;
    width: 36px;
    margin-left: 6px;
  }
`;

export const MetaDataBottomRow = styled.div`
  margin-top: 0;
  margin-right: -12px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const Description = styled.div`
  font-size: 14px;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.05);
  margin-right: 12px;
  margin-top: 12px;
  cursor: pointer;
  min-width: max(381px, 50% - 12px);
  flex: 1;
  padding: 12px;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;

export const WatchInfo = styled.div`
  font-weight: 600;
  width: 100%;

  & > *:not(:last-child) {
    margin-right: 10px; // child gap
  }
`;

export const DescriptionExpander = styled.div`
  position: relative;

  span {
    white-space: pre-wrap;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    mask-image: linear-gradient(rgba(0, 0, 0, 1), transparent);
  }

  button {
    border: 0;
    background-color: transparent;
  }

  &.expanded {
    span {
      -webkit-line-clamp: unset;
      mask-image: none;
    }

    button {
      margin-top: 20px;
    }
  }
`;
