
import React from 'react';
import { Sparkles } from 'lucide-react';

const BotAvatar = () => {
  return (
    <div className="relative w-12 h-12 rounded-full bg-cute-primary flex items-center justify-center shadow-md animate-float">
      <Sparkles className="w-6 h-6 text-white" />
      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
    </div>
  );
};

export default BotAvatar;
