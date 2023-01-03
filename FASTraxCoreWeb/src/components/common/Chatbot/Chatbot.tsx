import React from 'react';
import {Chat, ChatMessageSendEvent, User} from '@progress/kendo-react-conversational-ui';
import styles from './Chatbot.module.scss';
import ChatbotContext from './Chatbot.context';
import directLine from './directLine';

export interface ChatbotProps {
  user: User;
}

const Chatbot: React.FC<ChatbotProps> = ({user}) => {
  const chatbot = React.useContext(ChatbotContext);

  const onMessageSend = (event: ChatMessageSendEvent) => {
    directLine.postActivity({from: user, type: 'message', text: event.message.text}).subscribe(
      id => console.log('Posted activity, assigned ID ', id),
      error => console.log('Error posting activity', error),
    );

    chatbot.setMessages(prevState => [
      ...prevState,
      {author: user, text: event.message.text, timestamp: new Date()},
    ]);
  };

  React.useEffect(() => {
    directLine
      .postActivity({from: user, type: 'event', name: 'requestWelcomeDialog', value: ''})
      .subscribe();
  }, [user]);

  return (
    <div className={styles.chatbotContainer}>
      <Chat messages={chatbot.messages} user={user} onMessageSend={onMessageSend} />
    </div>
  );
};

export default Chatbot;
