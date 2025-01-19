import React from 'react';
import { MessageCircle, Bot } from 'lucide-react';
import { ChatMessage as ChatMessageType } from '../types';

interface Props {
  message: ChatMessageType;
}

export const ChatMessage: React.FC<Props> = ({ message }) => {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex items-start gap-4 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`p-2 rounded-full ${isUser ? 'bg-red-600' : 'bg-gray-700'}`}>
        {isUser ? <MessageCircle className="w-6 h-6 text-white" /> : <Bot className="w-6 h-6 text-white" />}
      </div>
      <div className={`flex-1 px-4 py-2 rounded-lg ${isUser ? 'bg-red-50' : 'bg-gray-50'}`}>
        <p className="text-gray-800">{message.content}</p>
      </div>
    </div>
  );
};