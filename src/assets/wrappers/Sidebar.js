import styled, { css } from 'styled-components';

const wrapperStyle = css`
  position: fixed;
  left: 0;
  top: var(--header-height);
  height: 100%;
  padding: 0 4px;
  display: flex;
  flex-direction: column;
  background-color: var(--white);
  z-index: 2001; // chips 보다 1 위
`;

const aStyle = css`
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 10px;
  }

  /* &.reverse {
    flex-direction: row-reverse;
    justify-content: flex-end;
  } */
`;

export const SidebarWrapper = styled.aside`
  ${wrapperStyle}
  width: var(--nav-width);
  height: calc(100vh - var(--header-height));

  &:hover {
    overflow-y: auto;
  }

  a {
    ${aStyle}
    min-height: 40px;
  }

  section {
    display: flex;
    flex-direction: column;
    padding: 12px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);

    & > a,
    & > p {
      padding: 0 12px;
      font-size: 14px;
    }

    svg {
      margin-right: 24px;
    }

    span {
      /* font-size: 1.4rem; */
      line-height: 2rem;
      font-weight: 400;
      padding-right: 8px;
    }

    p {
      font-weight: 600;
    }
  }
`;

export const MiniSidebarWrapper = styled.aside`
  ${wrapperStyle}
  width: var(--mini-nav-width);

  a {
    ${aStyle}
    flex-direction: column;
    padding: 16px 0 14px 0;
    width: 64px;
  }

  svg {
    margin-bottom: 6px;
    height: 24px;
  }

  span {
    font-size: 11px;
  }
`;
