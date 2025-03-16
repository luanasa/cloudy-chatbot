
import React, { useState, useRef, useEffect } from 'react';
import ChatHeader from './ChatHeader';
import ChatBubble from './ChatBubble';
import ChatInput from './ChatInput';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: string;
}

const initialMessages: Message[] = [
  {
    id: '1',
    text: "Olá! Eu sou o Cloudy, seu assistente virtual. 🌟\nEstou aqui para ajudar você a encontrar tutoriais, documentações e soluções para os seus problemas de tecnologia.\n\n👉 Como posso ajudar hoje?",
    isBot: true,
    timestamp: formatTime(new Date())
  }
];

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (text: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot: false,
      timestamp: formatTime(new Date())
    };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    
    // Show bot is typing
    setIsTyping(true);
    
    // Simulate bot response after a delay
    setTimeout(() => {
      const botResponses = [
        "That's interesting! Tell me more about it! 😊",
        "I understand how you feel. How can I help?",
        "Thanks for sharing that with me! 💕",
        "I'm here for you whenever you need me!",
        "That sounds wonderful! What else is on your mind?",
        "I'm sending you virtual hugs! 🤗",
        "You're doing great! Keep going!"
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        isBot: true,
        timestamp: formatTime(new Date())
      };
      
      setIsTyping(false);
      setMessages(prevMessages => [...prevMessages, botMessage]);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  return (
    <div className="flex flex-col h-[600px] max-w-md mx-auto rounded-xl shadow-lg overflow-hidden border border-cute-secondary/30">
      <ChatHeader />
      
      <div className="flex-1 p-4 overflow-y-auto bg-cute-background">
        {messages.map((message) => (
          <ChatBubble
            key={message.id}
            message={message.text}
            isBot={message.isBot}
            timestamp={message.timestamp}
          />
        ))}
        
        {isTyping && (
          <div className="flex items-center gap-2 text-cute-foreground ml-16 mb-4">
            <div className="w-2 h-2 bg-cute-primary rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-cute-primary rounded-full animate-pulse delay-75"></div>
            <div className="w-2 h-2 bg-cute-primary rounded-full animate-pulse delay-150"></div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatInterface;
