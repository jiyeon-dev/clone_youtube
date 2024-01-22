import { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../../context';
import TabItem from './TabItem';
import { gridMargin } from '../styles';

export const TAB = [
  { name: '홈', value: 'home' },
  { name: '동영상', value: 'video' },
  { name: '라이브', value: 'live' },
];

const StickyTab = () => {
  const stickyTabRef = useRef();
  const { isNavOpen } = useGlobalContext();

  const handleScroll = (e) => {
    if (scrollY > 386) {
      stickyTabRef.current?.classList.add('fixed');
    } else {
      stickyTabRef.current?.classList.remove('fixed');
    }
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <StickyToolbar ref={stickyTabRef} className={isNavOpen && 'isNavOpen'}>
      <div className="tabs">
        {/* Left button */}
        <div className="tabs-container">
          <div className="tabs-list">
            {TAB.map((item, idx) => (
              <TabItem key={idx} value={item.value}>
                {item.name}
              </TabItem>
            ))}
          </div>
        </div>
        {/* Right button */}
      </div>
    </StickyToolbar>
  );
};
export default StickyTab;

const StickyToolbar = styled.div`
  height: 48px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  .tabs {
    ${gridMargin}
    height: 48px;
    color: rgb(96, 96, 96);
  }

  .tabs-container {
    position: relative;
    height: 100%;
    flex: 1 1 auto;

    .tabs-list {
      display: flex;
      flex-direction: row;
      white-space: nowrap;
    }
  }

  &.fixed {
    position: fixed;
    top: var(--header-height);
    left: 0px;
    bottom: initial;
    width: 100%;
    z-index: 1000;
    background-color: #fff;

    margin-left: calc(var(--mini-nav-width) / 2);
    &.isNavOpen {
      margin-left: calc(var(--nav-width) / 2);
    }
  }
`;
