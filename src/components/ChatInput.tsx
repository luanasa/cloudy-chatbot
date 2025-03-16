import React, { useState, lazy, Suspense } from 'react';
import { Send, Smile } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const EmojiPicker = lazy(() => import('emoji-picker-react'));

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const ChatInput = ({ onSendMessage }: ChatInputProps) => {
  const [message, setMessage] = useState('');
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleEmojiClick = (emojiObject: { emoji: string }) => {
    setMessage((prevMessage) => prevMessage + emojiObject.emoji);
    setIsEmojiPickerOpen(false); // Fecha o popover após selecionar um emoji
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 p-4 bg-card rounded-xl shadow-md border border-border">
      <Popover open={isEmojiPickerOpen} onOpenChange={setIsEmojiPickerOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground hover:bg-accent/20"
          >
            <Smile className="h-5 w-5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 border-border bg-background shadow-lg">
          <Suspense fallback={<div className="p-4">Carregando emojis...</div>}>
            <EmojiPicker
              onEmojiClick={handleEmojiClick}
              lazyLoadEmojis={true}
              skinTonesDisabled
              searchDisabled={false}
              previewConfig={{ showPreview: false }}
            />
          </Suspense>
        </PopoverContent>
      </Popover>

      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Qual tutorial você deseja hoje?"
        className="flex-1 bg-accent/50 border-0 focus-visible:ring-cute-primary"
      />

      <Button
        type="submit"
        size="icon"
        className="bg-cute-primary hover:bg-cute-foreground text-white rounded-full dark:bg-purple-600 dark:hover:bg-purple-700"
        disabled={!message.trim()}
      >
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
};

export default ChatInput;