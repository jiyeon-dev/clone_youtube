import styled from 'styled-components';
import { DropDown } from './Watch/Comment';

export const ChannelBox = styled.div`
  padding-right: 24px;
  margin-bottom: 16px;
  flex: none;
  display: flex;
  flex-direction: row;
  cursor: pointer;

  .section {
    justify-content: center;
    display: flex;
  }
`;

export const AvatarSection = styled.div`
  display: flex;
  justify-content: center;
  margin-right: 16px;
  max-width: 360px;
  min-width: 240px;
  flex: 1;

  img {
    border-radius: 50%;
    width: 136px;
    height: 136px;
  }
`;

export const InfoSection = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
`;

export const MainInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  padding: 0 16px 16px 16px;
  align-items: flex-start;

  div#channel-name {
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 8px;
    // 2줄 허용
    white-space: pre-wrap;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  div#metadata {
    margin-bottom: 4px;
    font-size: 12px;
    color: rgb(96, 96, 96);
  }

  div#description {
    color: rgb(96, 96, 96);
    font-size: 12px;
    line-height: 18px;
    font-weight: 400;
    text-align: left;
    overflow: hidden;
    display: block;
    max-height: 36px;
    -webkit-line-clamp: 2;
  }
`;

export const SubscribeButton = styled(DropDown)`
  color: #0f0f0f;
  background-color: rgba(0, 0, 0, 0.05);
  border: 0;
  height: 36px;
  padding: 0 16px;
  font-size: 14px;
  border-radius: 18px;

  display: flex;
  align-items: center;

  .dropdown-button {
    svg:first-child {
      margin-left: -6px;
      width: 30px !important;
    }
    svg:last-child {
      margin-right: -6px;
      width: 30px !important;
    }
  }

  .dropdown-content {
    top: 43px;

    div {
      display: flex;
      align-items: center;
      padding: 12px 10px;
      svg {
        margin-right: 10px;
      }
    }
  }
`;
