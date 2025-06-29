
import { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import { getCohereResponse } from '@/services/cohereService';
import ChatMessage, { Message } from '@/components/ChatMessage';
import ChatInput from '@/components/ChatInput';
import { Bot, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

const WELCOME_MESSAGE = "Hi there! I'm your AI assistant powered by Cohere. Ask me anything, and I'll do my best to help you.";

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: uuidv4(),
      content: WELCOME_MESSAGE,
      role: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: uuidv4(),
      content,
      role: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Get response from Cohere API
      const aiResponse = await getCohereResponse(content);
      
      // Add AI response
      const aiMessage: Message = {
        id: uuidv4(),
        content: aiResponse,
        role: 'assistant',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error getting response:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetChat = () => {
    setMessages([
      {
        id: uuidv4(),
        content: WELCOME_MESSAGE,
        role: 'assistant',
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <div className="flex flex-col h-full w-full max-w-5xl mx-auto">
      <div className="flex items-center justify-between px-4 py-4 glass-panel mb-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-chat-primary/20 flex items-center justify-center">
            <Bot className="h-4 w-4 text-chat-primary" />
          </div>
          <h2 className="text-lg font-medium">AI Assistant</h2>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={resetChat}
          className="text-xs bg-transparent border border-white/10 hover:bg-chat-primary/10 transition-all duration-300"
        >
          <RefreshCw className="h-3 w-3 mr-1" /> New Chat
        </Button>
      </div>
      
      <div 
        ref={containerRef}
        className="flex-1 overflow-y-auto py-4 px-2 sm:px-4"
      >
        <div className="space-y-2 pb-20">
          {messages.map((message, index) => (
            <ChatMessage 
              key={message.id} 
              message={message} 
              isLatest={index === messages.length - 1}
            />
          ))}
          
          {isLoading && (
            <div className="chat-message-container message-ai w-full max-w-4xl mx-auto py-3 px-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-chat-primary/20 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-chat-primary" />
                </div>
                <div className="glass-panel p-4 bg-chat-primary/10 border-chat-primary/20">
                  <div className="typing-indicator text-sm sm:text-base">Thinking</div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 py-4 px-4 sm:px-6 bg-gradient-to-t from-chat-dark via-chat-dark to-transparent">
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
}
