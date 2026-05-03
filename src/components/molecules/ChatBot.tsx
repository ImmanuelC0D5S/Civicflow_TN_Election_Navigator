import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { cn } from '../atoms/Button';
import { getGeminiResponse, type ChatMessage } from '../../lib/gemini';
import FocusLock from 'react-focus-lock';
import toast from 'react-hot-toast';

export const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', parts: [{ text: "Hello! I'm CivicGuide. I can help you with questions about election protocols, voting rights, and procedures in Tamil Nadu. How can I assist you today?" }] }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messageTimestamps, setMessageTimestamps] = useState<number[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    // Rate limiting: max 10 messages per minute
    const now = Date.now();
    const oneMinuteAgo = now - 60000;
    const recentMessages = messageTimestamps.filter(ts => ts > oneMinuteAgo);
    
    if (recentMessages.length >= 10) {
      toast.error("Message limit reached. Please wait a minute.");
      return;
    }

    const userMessage: ChatMessage = { role: 'user', parts: [{ text: input }] };
    setMessages(prev => [...prev, userMessage]);
    setMessageTimestamps(prev => [...prev, now]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages.filter((m, i) => i > 0 || m.role === 'user');
      const response = await getGeminiResponse(input, history);
      setMessages(prev => [...prev, { role: 'model', parts: [{ text: response }] }]);
    } catch (error: any) {
      const detailedError = error?.message || "Unknown connection error";
      toast.error(`Chat Error: ${detailedError}`);
      setMessages(prev => [...prev, { role: 'model', parts: [{ text: `Error: ${detailedError}` }] }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      <AnimatePresence>
        {isOpen && (
          <FocusLock returnFocus>
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20, transformOrigin: 'bottom right' }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="mb-4 w-80 sm:w-96 h-[500px] glass-panel border-primary/20 shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl bg-background/80"
              role="dialog"
              aria-modal="true"
              aria-label="CivicFlow Chat Assistant"
            >
              {/* Header */}
              <div className="p-4 bg-primary/10 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-neon-saffron">
                    <Bot className="w-5 h-5 text-background" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">CivicGuide AI</h3>
                    <span className="text-[10px] text-primary uppercase font-bold">Election Protocols Expert</span>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/10 rounded-full transition-colors"
                  aria-label="Close Chat"
                >
                  <X className="w-5 h-5 text-text-muted" />
                </button>
              </div>

              {/* Messages */}
              <div 
                className="flex-grow overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10"
                aria-live="polite"
              >
                {messages.map((msg, idx) => (
                  <div key={idx} className={cn(
                    "flex gap-3",
                    msg.role === 'user' ? "flex-row-reverse" : "flex-row"
                  )}>
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                      msg.role === 'user' ? "bg-secondary shadow-neon-teal" : "bg-primary/20 border border-primary/30"
                    )}>
                      {msg.role === 'user' ? <User className="w-4 h-4 text-background" /> : <Bot className="w-4 h-4 text-primary" />}
                    </div>
                    <div className={cn(
                      "max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed",
                      msg.role === 'user' 
                        ? "bg-secondary/10 border border-secondary/20 text-white rounded-tr-none" 
                        : "bg-surface-high border border-white/5 text-text-secondary rounded-tl-none shadow-sm"
                    )}>
                      {msg.parts[0].text}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0">
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                    <div className="bg-surface-high border border-white/5 p-3 rounded-2xl rounded-tl-none">
                      <Loader2 className="w-4 h-4 text-primary animate-spin" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 bg-surface-high/50 border-t border-white/5">
                <div className="relative">
                  <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask about election protocols..."
                    className="w-full bg-background/50 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-xs text-white placeholder:text-text-muted focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
                  />
                  <button 
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-primary hover:text-white disabled:text-text-muted transition-colors"
                  aria-label="Send Message"
                >
                  <Send className="w-4 h-4" />
                </button>
                </div>
                <p className="text-[8px] text-text-muted mt-2 text-center uppercase tracking-[0.2em] font-bold">
                  Secured Civic AI • Gemini 3 Flash Preview
                </p>
              </div>
            </motion.div>
          </FocusLock>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-500 group relative overflow-hidden",
          isOpen ? "bg-background border-2 border-primary" : "bg-primary"
        )}
      >
        {isOpen ? (
          <X className="w-8 h-8 text-primary" />
        ) : (
          <>
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <MessageSquare className="w-8 h-8 text-background" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-secondary rounded-full border-2 border-background animate-pulse" />
          </>
        )}
      </motion.button>
    </div>
  );
};
