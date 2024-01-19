import { Suspense } from 'react';
import FirstSegment from './FirstSegment';
import styled from 'styled-components';

const ChannelHome = ({ channel }) => {
  console.log(channel.id);

  return (
    <Content>
      <Suspense>
        <FirstSegment channelId={channel.id} />
      </Suspense>
    </Content>
  );
};
export default ChannelHome;

const Content = styled.div`
  min-height: calc(100vh - 120px);
  padding-right: calc(50% - 642px);
  padding-left: calc(50% - 642px);

  & > div:not(:last-child) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
`;
