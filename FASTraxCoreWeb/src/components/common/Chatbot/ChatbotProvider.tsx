import React from 'react';
import ChatbotContext from './Chatbot.context';
import {Message, User} from '@progress/kendo-react-conversational-ui';
import directLine from './directLine';
import amsBotDefault from './amsbotdefault.jpg';

type Bot = User;

export interface ChatbotProviderProps {
  bot?: Bot;
}

const ChatbotProvider: React.FC<ChatbotProviderProps> = ({
  children,
  bot = {id: 'AMSChatbotAssistance'},
}) => {
  const [messages, setMessages] = React.useState<Message[]>([]);

  React.useEffect(() => {
    directLine.activity$.subscribe(activity => {
      if (activity.from.id === bot.id)
        switch (activity.type) {
          case 'message':
            setMessages(prevState => [
              ...prevState,
              {
                text: activity.text,
                author: {
                  id: bot.id,
                  name: activity.from.name,
                  avatarUrl: bot.avatarUrl ? bot.avatarUrl : amsBotDefault,
                },
                timestamp: new Date(activity.timestamp ? activity.timestamp : ''),
              },
            ]);

            break;
          case 'typing':
            setMessages(prevState => [
              ...prevState,
              {
                author: {...bot, name: activity.from.name},
                typing: true,
                timestamp: new Date(activity.timestamp ? activity.timestamp : ''),
              },
            ]);

            break;
          default:
            break;
        }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <ChatbotContext.Provider value={{messages, setMessages}}>{children}</ChatbotContext.Provider>
  );
};

export default ChatbotProvider;
