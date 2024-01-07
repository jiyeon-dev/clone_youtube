import Chips from '../components/Chips';
import Cards from '../components/Card/Cards';
import styled from 'styled-components';

const Base = () => {
  return (
    <Container>
      <Chips />
      <Cards />
    </Container>
  );
};

export default Base;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
