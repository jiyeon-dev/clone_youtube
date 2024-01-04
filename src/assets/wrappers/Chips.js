import styled from 'styled-components';

export const ChipsWrapper = styled.div`
  z-index: 2000;
  display: flex;
  position: fixed;
  justify-content: center;
  background-color: var(--white);
  /* height: 56px; */
`;

export const ChipsContent = styled.div`
  display: flex;
  align-items: center;
  padding: 0 24px;
  width: calc(100vw - var(--mini-nav-width));

  .left-arrow,
  .right-arrow {
    position: absolute;
    height: 100%;
    display: flex;
    align-items: center;
    z-index: 2001;
  }

  .left-arrow {
    top: 0;
    left: 0;

    &::after {
      background: linear-gradient(
        to right,
        #fff 20%,
        rgba(255, 255, 255, 0) 80%
      );

      height: 100%;
      width: 50px;
      content: '';
      pointer-events: none;
    }
  }

  .right-arrow {
    top: 0;
    right: 0;

    &::before {
      background: linear-gradient(
        to left,
        #fff 20%,
        rgba(255, 255, 255, 0) 80%
      );
      height: 100%;
      width: 50px;
      content: '';
      pointer-events: none;
    }
  }

  button {
    padding: 0 12px;
    height: 100%;
    display: flex;
    align-items: center;
    background-color: white;
  }

  .scroll-container {
    position: relative;
    white-space: nowrap;
    overflow: hidden;
    height: 56px;

    .chips-container {
      transition-duration: 0.15s;
      transition-timing-function: cubic-bezier(0.05, 0, 0, 1);
      display: inline-block;
    }
  }
`;

export const Chip = styled.span`
  padding: 0 12px;
  font-size: 14px;
  font-weight: 500;
  line-height: 2rem;
  margin: 12px;
  margin-left: 0;
  height: 32px;
  min-width: 12px;
  border-radius: 8px;
  cursor: pointer;
  user-select: none;
  position: relative;
  display: inline-flex;
  align-items: center;

  background-color: rgba(0, 0, 0, 0.05);
  color: #0f0f0f;

  &:first-child {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }

  &.selected {
    background-color: #0f0f0f;
    color: #fff;

    &:hover {
      background-color: #030303;
    }
  }

  &:not(.selected):hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
