import styled, { css } from 'styled-components';

export const CommentsWrapper = styled.div``;

export const CommentHeader = styled.div`
  margin-top: 24px;
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;

  .title {
    display: flex;
    align-items: center;
    margin-bottom: 24px;

    h2 {
      font-size: 20px;
      margin-right: 32px;
    }
  }
`;

export const ToolTip = styled.div`
  top: 30px;
  border-radius: 4px;
  text-transform: none;
  word-break: normal;
  font-size: 12px;
  font-weight: 400;
  visibility: hidden;
  position: absolute;
  z-index: 1002;

  background-color: rgb(97, 97, 97);
  color: #fff;
  padding: 8px;
`;

export const DropDown = styled.div`
  position: relative;
  display: inline-block;

  .dropdown-button {
    font-weight: 400;
    width: 100px;
    text-align: left;
    cursor: pointer;
    font-size: 14px;

    display: flex;
    align-items: center;

    svg {
      margin-right: 6px;
    }

    &:hover .tooltip {
      visibility: visible;
      left: 20px;
    }
  }
  .dropdown-content {
    z-index: 1;
    top: 30px;
    position: absolute;
    display: none;
    font-weight: 400;
    background-color: #fcfcfc;
    min-width: 100px;
    border-radius: 8px;
    /* height: 160px; */
    /* overflow: scroll; */
    box-shadow: 0px 0px 10px 3px rgba(190, 190, 190, 0.6);

    &.show {
      display: block;
    }
  }

  /* .dropdown-content::-webkit-scrollbar {
    width: 5px;
    height: 10px;
  }
  .dropdown-content::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background-color: rgb(194, 194, 194);
  } */

  .dropdown-content div {
    display: block;
    text-decoration: none;
    color: rgb(37, 37, 37);
    font-size: 12px;
    padding: 12px 20px;
    cursor: pointer;

    &.selected {
      background-color: rgb(236 236 236);
    }

    &:first-child {
      border-top-right-radius: 8px;
      border-top-left-radius: 8px;
    }
    &:last-child {
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
    }

    &:hover {
      background-color: rgb(226, 226, 226) !important;
    }
  }
`;

export const AddCommentContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  margin-right: 16px;

  img.avatar {
    background-color: #a849b6;
    width: 40px;
    height: 40px;
    margin-right: 16px;
    flex: none;
    border-radius: 50%;
    overflow: hidden;
  }

  div.comment {
    padding-bottom: 8px;
    outline: none;
    white-space: pre-wrap;
    border-bottom: 1px solid black;
    flex: 1 1 auto;
    position: relative;
    max-width: 100%;

    &:empty::before {
      color: #606060;
      content: '댓글 추가...';
      cursor: text;
    }

    &.open {
      padding-top: 16px;
      width: 100%;
    }
  }
`;

export const CommentBoxButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;

  button {
    display: flex;
    border: 0;
    align-items: center;
    padding: 0 16px;
    font-size: 14px;
    height: 36px;
    border-radius: 18px;

    &:disabled {
      cursor: default;
      color: #909090 !important;
      background-color: rgba(0, 0, 0, 0.05) !important;
    }
  }

  button + button {
    margin-left: 8px;
  }

  button.cancel {
    color: #0f0f0f;
    background-color: transparent;

    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
      border-color: transparent;
    }
  }

  button.submit {
    color: #fff;
    background-color: rgb(6, 95, 212);

    &:hover {
      background-color: #0556bf;
      border-color: transparent;
    }
  }
`;

export const CommentBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  margin-bottom: 16px;

  img.avatar {
    background-color: #5c6ac0;
    width: 40px;
    height: 40px;
    margin-right: 16px;
    flex: none;
    border-radius: 50%;
    overflow: hidden;
  }
`;

export const CommentMain = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  flex-basis: 0.000000001px;

  .header-author {
    display: flex;

    h3 {
      font-size: 13px;
      margin-right: 4px;
      padding-bottom: 2px;
    }

    span.published-time-text {
      font-size: 12px;
      color: rgb(96, 96, 96);
    }
  }

  .content {
    font-size: 14px;
    margin-bottom: 16px;

    div {
      width: 100%;
      // 4줄 허용
      white-space: pre-wrap;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      overflow: hidden;

      &.expand {
        -webkit-line-clamp: inherit;
      }
    }

    span {
      margin-top: 4px;
      font-weight: 500;
      color: #606060;
      text-transform: none;
      cursor: pointer;
    }
  }

  div.toolbar {
    display: flex;
    align-items: center;

    button {
      background-color: transparent;
      border: 0;
      cursor: pointer;
      display: flex;
      font-size: 12px;
      line-height: 32px;
      align-items: center;

      &:hover {
        background-color: rgba(0, 0, 0, 0.05);
      }
    }

    button:not(#reply-button) {
      border-radius: 50%;
      padding: 4px;

      &#dislike svg {
        transform: scale(-1, 1);
      }
    }

    span {
      margin-left: 4px;
      margin-right: 16px;
      font-size: 12px;
      font-weight: 500;
      text-transform: uppercase;
      color: rgb(96, 96, 96);
    }

    button#reply-button {
      padding: 0 12px;
      height: 32px;
      border-radius: 5px;
    }
  }
`;

export const RepliesContainer = styled.div`
  /* margin-left: 56px; */

  button#more-replies {
    background-color: transparent;
    border: 0;
    color: #065fd4;
    height: 36px;
    padding: 0 16px;
    font-size: 14px;
    line-height: 36px;
    border-radius: 18px;
    display: flex;
    align-items: center;
    cursor: pointer;

    svg {
      margin-right: 4px;
    }

    &:hover {
      background-color: #def1ff;
      border-color: transparent;
    }
    &.expand svg {
      transform: rotateX(180deg);
    }
  }
`;
