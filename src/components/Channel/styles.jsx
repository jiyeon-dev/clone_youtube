import { css } from 'styled-components';

// grid 개수에 따라 header margin 변경 필요
// 2 개 : 50% - 214px <= 685px
// 3 개 : 50% - 321px <= 971px
// 4 개 : 50% - 428px <= 1170px
// 5 개 : 50% - 535px < 1140px
// 6 개 : 50% - 642px

export const gridPadding = css`
  padding-left: calc(50% - 642px);
  padding-right: calc(50% - 642px);

  @media screen and (max-width: 1440px) {
    padding-left: calc(50% - 535px);
    padding-right: calc(50% - 535px);
  }
  @media screen and (max-width: 1170px) {
    padding-left: calc(50% - 428px);
    padding-right: calc(50% - 428px);
  }
  @media screen and (max-width: 971px) {
    padding-left: calc(50% - 321px);
    padding-right: calc(50% - 321px);
  }
  @media screen and (max-width: 685px) {
    padding-left: calc(50% - 214px);
    padding-right: calc(50% - 214px);
  }
`;

export const gridMargin = css`
  margin-left: calc(50% - 642px);
  margin-right: calc(50% - 642px);

  @media screen and (max-width: 1440px) {
    margin-left: calc(50% - 535px);
    margin-right: calc(50% - 535px);
  }
  @media screen and (max-width: 1170px) {
    margin-left: calc(50% - 428px);
    margin-right: calc(50% - 428px);
  }
  @media screen and (max-width: 971px) {
    margin-left: calc(50% - 321px);
    margin-right: calc(50% - 321px);
  }
  @media screen and (max-width: 685px) {
    margin-left: calc(50% - 214px);
    margin-right: calc(50% - 214px);
  }
`;
