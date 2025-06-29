
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Check, Bot, User } from 'lucide-react';

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
  isLatest: boolean;
}

export default function ChatMessage({ message, isLatest }: ChatMessageProps) {
  const [isVisible, setIsVisible] = useState(false);
  const messageRef = useRef<HTMLDivElement>(null);
  const isUser = message.role === 'user';

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLatest && messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isLatest, message.content]);

  return (
    <div
      ref={messageRef}
      className={cn(
        'chat-message-container w-full max-w-4xl mx-auto py-3 px-4',
        isVisible ? 'opacity-100' : 'opacity-0',
        isUser ? 'message-user' : 'message-ai'
      )}
    >
      <div className={cn(
        'flex items-start gap-3',
        isUser ? 'flex-row-reverse' : 'flex-row'
      )}>
        <div className={cn(
          'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center', 
          isUser ? 'bg-chat-blue/20' : 'bg-chat-primary/20'
        )}>
          {isUser ? (
            <User className="w-4 h-4 text-chat-blue" />
          ) : (
            <Bot className="w-4 h-4 text-chat-primary" />
          )}
        </div>
        
        <div className={cn(
          'glass-panel p-4 max-w-[80%] sm:max-w-[70%] relative overflow-hidden group',
          isUser ? 'bg-chat-blue/10' : 'bg-chat-primary/10',
          isUser ? 'border-chat-blue/20' : 'border-chat-primary/20'
        )}>
          <div className="text-sm sm:text-base whitespace-pre-wrap break-words">{message.content}</div>
          
          <div className={cn(
            'absolute bottom-1 right-1 opacity-0 transition-opacity duration-200 text-xs text-gray-400',
            isUser ? 'group-hover:opacity-100' : ''
          )}>
            <Check className="w-3 h-3 inline-block" />
          </div>
        </div>
      </div>
    </div>
  );
}
