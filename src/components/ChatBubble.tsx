import React from 'react';
import { cn } from '@/lib/utils';
import BotAvatar from './BotAvatar';
import UserAvatar from './UserAvatar';

interface ChatBubbleProps {
  message: string;
  isBot: boolean;
  timestamp: string;
  buttons?: { label: string; value: string }[]; // Botões de feedback
  onButtonClick?: (value: string) => void; // Função de callback para botões
}

const ChatBubble = ({ message, isBot, timestamp, buttons, onButtonClick }: ChatBubbleProps) => {
  console.log("Props do ChatBubble:", { message, isBot, timestamp, buttons, onButtonClick }); // Log para depuração

  // Função para transformar URLs em links clicáveis
  const renderMessageWithLinks = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split(urlRegex).map((part, index) =>
      urlRegex.test(part) ? (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cute-primary hover:underline"
        >
          {part}
        </a>
      ) : (
        part
      )
    );
  };

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
        <p className="text-sm whitespace-pre-line">
          {renderMessageWithLinks(message)}
        </p>
        {buttons && (
          <div className="flex gap-2 mt-2">
            {buttons.map((button) => (
              <button
                key={button.value}
                onClick={() => {
                  console.log("Botão clicado:", button.value); // Log para depuração
                  onButtonClick?.(button.value);
                }}
                className="px-3 py-1 text-sm bg-cute-primary text-white rounded-full hover:bg-cute-foreground transition-colors"
              >
                {button.label}
              </button>
            ))}
          </div>
        )}
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