import styled from 'styled-components';
import SubscribeButton from '../SubscribeButton';
import { formatViewCount } from '../../utils/formatter';
import { useChannelContext } from '../../pages/Channel';
import { gridMargin, gridPadding } from './styles';
import StickyTab from './StickyTab';

const Header = () => {
  const { channel } = useChannelContext();
  const banner =
    channel?.brandingSettings?.image?.bannerExternalUrl +
    '=w2120-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj';

  return (
    <ChannelHeader>
      <ChannelBanner theme={{ banner }}>
        <div className="banner"></div>
      </ChannelBanner>
      <ChannelInfo>
        <Avatar
          draggable={false}
          src={channel?.snippet?.thumbnails?.default?.url}
        ></Avatar>
        <ChannelMetaData>
          <div id="title">{channel?.snippet?.title}</div>
          <div className="meta-item-container">
            <div className="meta-item">{channel?.snippet?.customUrl}</div>
            <div className="meta-item">
              구독자 {formatViewCount(channel?.statistics?.subscriberCount)}명
            </div>
            <div className="meta-item">
              동영상 {formatViewCount(channel?.statistics?.videoCount)}개
            </div>
          </div>
          <span className="channel-description">
            {channel?.snippet?.description}
          </span>
          <SubscribeButton channelId={channel?.id} />
        </ChannelMetaData>
      </ChannelInfo>

      <StickyTab />
    </ChannelHeader>
  );
};
export default Header;

const ChannelHeader = styled.div`
  position: relative;
  width: 100%;
`;

const ChannelBanner = styled.div`
  border-radius: 12px;
  background-image: url(${(props) => props.theme.banner});
  /* background-image: url(${(props) => props.image}); */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  ${gridMargin}

  .banner {
    padding-top: 16.12%;
  }
`;

const ChannelInfo = styled.div`
  padding-top: 16px;
  padding-bottom: 4px;
  width: 100%;
  position: relative;

  display: flex;
  flex-direction: row;
  align-items: center;
  ${gridPadding}
`;

const Avatar = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 50%;
  background-color: green;

  flex: none;
  margin: 0 24px 0 0;
`;

const ChannelMetaData = styled.div`
  min-width: 150px;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  div#title {
    width: 100%;
    font-size: 36px;
    font-weight: 700;
    line-height: 50px;
    color: rgb(15, 15, 15);
    margin-bottom: 4px;
  }

  .meta-item-container {
    display: flex;
    flex-direction: row;
  }
  .meta-item {
    /* display: inline-flex; */
    /* white-space: nowrap; */
    color: rgb(96, 96, 96);
    font-size: 14px;
    font-weight: 400;

    &:not(:last-child)::after {
      margin: 0 4px;
      content: '‧';
    }
  }

  .channel-description {
    max-width: 600px;
    padding: 10px 0;

    color: rgb(96, 96, 96);
    font-size: 14px;
    font-weight: 400;
    display: block;

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;
