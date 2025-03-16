import React from 'react';
import { cn } from '@/lib/utils';
import BotAvatar from './BotAvatar';
import UserAvatar from './UserAvatar';

interface ChatBubbleProps {
  message: string;
  isBot: boolean;
  timestamp: string;
}

const ChatBubble = ({ message, isBot, timestamp }: ChatBubbleProps) => {
  return (
    <div 
      className={cn(
        "flex items-start gap-3 mb-4 animate-bounce-in",
        isBot ? "justify-start" : "justify-end"
      )}
    >
      {isBot && <BotAvatar />}
      
      <div className={cn(
        "max-w-[80%] p-4 rounded-2xl shadow-md",
        isBot 
          ? "bg-card text-card-foreground dark:bg-slate-800 rounded-tl-sm" 
          : "bg-cute-primary text-white rounded-tr-sm dark:bg-purple-600"
      )}>
        <p className="text-sm whitespace-pre-line">{message}</p>
        <span className={cn(
          "text-xs mt-1 block", 
          isBot ? "text-muted-foreground" : "text-cute-secondary dark:text-purple-200"
        )}>
          {timestamp}
        </span>
      </div>
      
      {!isBot && <UserAvatar />}
    </div>
  );
};

export default ChatBubble;