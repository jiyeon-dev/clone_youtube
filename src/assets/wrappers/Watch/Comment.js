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
