import { useEffect, useState } from 'react';
import styled from 'styled-components';
import VerticalCardGrid from '../../components/Card/VerticalCardList/grid';
import { getSubscriptions } from '../../utils/youtubeAxios';
const Subscriptions = () => {
  const [channelIds, setChannelIds] = useState('');

  useEffect(() => {
    const searchSubscriptions = async () => {
      const channels = [];
      const response = await getSubscriptions();
      response.items.forEach((item, i) => {
        const channelId = item?.snippet?.resourceId?.channelId;
        channels.push(channelId);
      });

      setChannelIds(channels.join(','));
    };
    searchSubscriptions();
  }, []);

  return (
    <Container>
      <Contents>
        <h3>최신순</h3>
        <a href="/feed/channels">관리</a>
      </Contents>
      {channelIds && <VerticalCardGrid channelIds={channelIds} />}
    </Container>
  );
};
export default Subscriptions;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 24px;
`;

const Contents = styled.div`
  /* width: 100%; */
  margin: 0 24px;
  height: 68px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    color: #065fd4;
    padding: 0 16px;
    font-size: 14px;
    line-height: 36px;
    border-radius: 18px;
    text-decoration: none;

    &:hover {
      background-color: #def1ff;
      border-color: transparent;
    }
  }
`;
