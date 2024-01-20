import styled from 'styled-components';

const PlayListItem = ({ item }) => {
  return <Item>{item.id}</Item>;
};
export default PlayListItem;

const Item = styled.div`
  background: black;
  min-width: 200px;
  height: 200px;
  margin-right: 1rem;
  display: inline-block;
`;
