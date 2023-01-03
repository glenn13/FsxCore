import {DirectLine} from 'botframework-directlinejs';

// Bot Framework
const directLine = new DirectLine({
  secret: 'HkkaZJifdEs.xjtUeRKH21YgxNhJRqYIei16F9KCc1cxHuTtw_rsXzI',
  conversationStartProperties: {
    locale: 'en-US',
  },
});

export default directLine;
