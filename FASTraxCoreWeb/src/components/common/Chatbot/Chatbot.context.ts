import React from 'react';
import {Message} from '@progress/kendo-react-conversational-ui';

interface ChatbotContext {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

const ChatbotContext = React.createContext<ChatbotContext>({
  messages: [],
  setMessages: () => {},
});

export default ChatbotContext;
