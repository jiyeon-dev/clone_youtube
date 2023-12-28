import styled from 'styled-components';

export const Wrapper = styled.header`
  height: 56px;
  padding: 0 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

// start - logo wrapper
export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;

  button.nav-toggle-btn {
    width: 40px;
    height: 40px;
    padding: 8px;

    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
      border-radius: 24px;
    }
  }

  div.logo-container {
    padding: 18px 14px 18px 16px;
    cursor: pointer;

    span#country-code {
      margin: -4px 0 0 2px;
      color: #606060;
      font-size: 9px;
      position: absolute;
      text-transform: uppercase;
    }
  }
`;

// center - search wrapper
export const SearchWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: stretch;
  flex: 0 1 732px;

  form {
    width: 100%;
    display: flex;
    flex: 1; // 이걸 하면 focus 될때 검색 버튼 width가 안바뀜.
    align-items: center;
    border-radius: 40px 0 0 40px;
    border: 1px solid #ccc;
    box-shadow: inset 0 1px 2px #eee;
    padding: 0 4px 0 16px;
    margin-left: 32px;
    position: relative;

    // 검색 input 에 focus 되었을 때 스타일
    &[data-focus='true'] {
      border-color: #065fd4;
      margin-left: 0;
      padding: 2px 4px 2px 48px;

      & > span {
        display: flex;
        padding: 0 14px;
      }
    }

    span {
      display: none;
      position: absolute;
      left: 0;
    }
  }

  // 검색 input
  input#searchTerm {
    border: none;
    outline: none;
    padding: 0;
    margin: 0;
    height: auto;
    width: 100%;
    font-size: 16px;
  }

  // 전체 버튼 스타일
  button {
    width: 24px;
    height: 24px;
  }

  .btn.keyboard-btn {
    margin-top: 2px;
    margin-right: 4px;
  }

  // 검색 돋보기 버튼 스타일
  .btn.search-btn {
    border: 1px solid #ccc;
    border-left: 0;
    background-color: #f8f8f8;
    border-radius: 0 40px 40px 0;
    width: 64px;
    height: 40px;
    margin: 0;
  }
`;

// end - user wrapper
export const NavUserWrapper = styled.div`
  min-width: 225px;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  button:not(.avatar-btn) {
    margin-right: 4px;
    width: 40px;
    height: 40px;
  }

  button.avatar-btn {
    background-color: burlywood; /* sample */
    padding: 1px 6px;
    margin: 0 8px;
    border-radius: 50%;
    height: 32px;
    width: 32px;
    margin: 0 8px;
  }
`;
