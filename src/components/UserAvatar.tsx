
import React from 'react';
import { User } from 'lucide-react';

const UserAvatar = () => {
  return (
    <div className="w-12 h-12 rounded-full bg-cute-secondary flex items-center justify-center shadow-md">
      <User className="w-6 h-6 text-cute-foreground" />
    </div>
  );
};

export default UserAvatar;
