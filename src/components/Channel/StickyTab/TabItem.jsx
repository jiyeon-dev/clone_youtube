import styled from 'styled-components';
import { useChannelContext } from '../../../pages/Channel';

const TabItem = ({ children, value }) => {
  const { currentTab, setCurrentTab } = useChannelContext();

  const handleClick = () => {
    setCurrentTab(value);
    window.scroll({ top: 0, behavior: 'smooth' });
  };

  return (
    <Tab
      onClick={handleClick}
      className={value === currentTab ? 'selected' : ''}
    >
      {children}
      <div className="tab-bar" />
    </Tab>
  );
};
export default TabItem;

const Tab = styled.div`
  cursor: pointer;
  align-items: center;
  display: flex;
  flex-shrink: 0;
  height: 48px;
  justify-content: center;
  margin-right: 24px;
  min-width: 48px;
  padding: 0;
  position: relative;
  color: #606060;
  font-size: 16px;
  font-weight: 500;

  .tab-bar {
    bottom: 0px;
    left: 0;
    position: absolute;
    right: 0;
    z-index: 1;
    border-radius: 1px;
    height: 2px;
  }

  &.selected {
    color: #0f0f0f;

    .tab-bar {
      background-color: rgb(96, 96, 96);
    }
  }

  &:hover .tab-bar {
    background-color: #909090;
  }
`;
