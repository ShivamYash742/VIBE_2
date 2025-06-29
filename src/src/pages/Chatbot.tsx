
import ChatInterface from '@/components/ChatInterface';
import { motion } from 'framer-motion';

export default function Chatbot() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col bg-gradient-to-br from-chat-dark to-chat-light"
    >
      <header className="w-full py-4 px-6 glass-panel border-b border-white/5 mb-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-chat-primary shine-effect"></div>
            <span className="font-bold text-xl bg-gradient-to-r from-chat-blue via-chat-indigo to-chat-violet bg-clip-text text-transparent">
              Eduverse
            </span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-white/60 hover:text-white transition-colors duration-200">Home</a>
            <a href="#" className="text-white/60 hover:text-white transition-colors duration-200">About</a>
            <a href="#" className="text-chat-primary font-medium">Chatbot</a>
            <a href="#" className="text-white/60 hover:text-white transition-colors duration-200">Contact</a>
          </nav>
          
          <div className="hidden sm:block">
            <button className="px-4 py-2 rounded-full bg-chat-primary/10 text-chat-primary border border-chat-primary/20 hover:bg-chat-primary/20 transition-all duration-300">
              Sign In
            </button>
          </div>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto px-4 sm:px-6 md:px-8 pb-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-8 text-center"
        >
          <h1 className="text-3xl font-bold mb-2">
            <span className="bg-gradient-to-r from-chat-blue via-chat-indigo to-chat-violet bg-clip-text text-transparent">
              AI Assistant
            </span>
          </h1>
          <p className="text-white/60 max-w-2xl mx-auto">
            Ask anything and get instant, intelligent responses powered by advanced AI.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="h-[calc(100vh-280px)] min-h-[500px]"
        >
          <ChatInterface />
        </motion.div>
      </main>
      
      <footer className="w-full py-4 text-center text-white/40 text-sm">
        <p>© 2023 Eduverse AI Assistant. Powered by Cohere.</p>
      </footer>
    </motion.div>
  );
}
