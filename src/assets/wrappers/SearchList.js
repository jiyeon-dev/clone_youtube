import styled from 'styled-components';
import { Thumbnail } from './ThumbnailCard';

export const SearchListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin-top: var(--header-height); // chips height
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
