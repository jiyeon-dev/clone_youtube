import styled from 'styled-components';

const Loader = () => {
  return (
    <Spinner>
      <span className="loader-spinner"></span>
    </Spinner>
  );
};
export default Loader;

const Spinner = styled.div`
  display: flex;
  justify-content: center;

  .loader-spinner {
    width: 30px;
    height: 30px;
    border: 3px solid #717171;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;

    @keyframes rotation {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
`;
