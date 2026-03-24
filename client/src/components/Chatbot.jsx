import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, Bot, Sparkles } from 'lucide-react';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([
        { role: 'bot', content: "Hi! I'm Palak's AI assistant. How can I help you today?" }
    ]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        const newHistory = [...chatHistory, { role: 'user', content: message }];
        setChatHistory(newHistory);
        setMessage('');

        // Simulated bot response
        setTimeout(() => {
            setChatHistory(prev => [...prev, { 
                role: 'bot', 
                content: "That's a great question! I'm a demo chatbot for now, but you can reach out to Palak directly via the Contact section for detailed queries." 
            }]);
        }, 1000);
    };

    return (
        <div className="fixed bottom-6 right-6 z-[200]">
            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: 'bottom right' }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="absolute bottom-20 right-0 w-[350px] md:w-[400px] h-[500px] bg-white dark:bg-card-bg border border-gray-100 dark:border-white/10 rounded-[2rem] shadow-2xl flex flex-col overflow-hidden backdrop-blur-2xl"
                    >
                        {/* Header */}
                        <div className="p-6 bg-primary text-white flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white/20 rounded-xl">
                                    <Bot size={20} />
                                </div>
                                <div>
                                    <h3 className="font-black uppercase tracking-widest text-xs">AI Assistant</h3>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
                                        <span className="text-[10px] font-bold opacity-80 uppercase tracking-tighter">Online</span>
                                    </div>
                                </div>
                            </div>
                            <button 
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Chat Messages */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
                            {chatHistory.map((msg, idx) => (
                                <div 
                                    key={idx} 
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[80%] p-4 rounded-2xl text-sm font-medium ${
                                        msg.role === 'user' 
                                            ? 'bg-primary text-white rounded-tr-none' 
                                            : 'bg-gray-50 dark:bg-white/5 text-text-main dark:text-white rounded-tl-none border border-gray-100 dark:border-white/5'
                                    }`}>
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSend} className="p-6 border-t border-gray-100 dark:border-white/10 bg-gray-50/50 dark:bg-white/5">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Type your query..."
                                    className="w-full py-4 pl-6 pr-14 rounded-xl bg-white dark:bg-card-bg border border-gray-200 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                                />
                                <button
                                    type="submit"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-primary text-white rounded-lg hover:scale-105 transition-all shadow-lg shadow-primary/20"
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Pulsing Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`relative w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-500 overflow-hidden bg-primary text-white ${
                    isOpen ? 'rotate-90' : ''
                }`}
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ opacity: 0, rotate: -90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: 90 }}
                        >
                            <X size={24} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="chat"
                            initial={{ opacity: 0, rotate: 90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: -90 }}
                            className="relative"
                        >
                            <MessageSquare size={24} />
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full flex items-center justify-center shadow-sm">
                                <Sparkles size={8} className="text-primary" />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                {!isOpen && (
                    <motion.div
                        animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 bg-white/40 rounded-2xl"
                    />
                )}
            </motion.button>

            {/* Tooltip */}
            {!isOpen && (
                <div className="absolute right-20 top-1/2 -translate-y-1/2 pointer-events-none">
                    <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="px-4 py-2 bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest rounded-lg shadow-2xl whitespace-nowrap border border-white/10"
                    >
                        Ask a Query
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
