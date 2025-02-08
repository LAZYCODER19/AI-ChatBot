import React, { useState } from 'react';
import { Sparkles, Send, Image, Settings, Menu, MessageSquare, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { getGeminiResponse } from './lib/gemini';

interface Message {
  type: 'user' | 'ai';
  content: string;
  loading?: boolean;
}

function App() {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;
    
    const userMessage = { type: 'user' as const, content: prompt };
    const loadingMessage = { type: 'ai' as const, content: '...', loading: true };
    
    setMessages(prev => [...prev, userMessage, loadingMessage]);
    setPrompt('');
    setIsLoading(true);

    try {
      const response = await getGeminiResponse(prompt);
      setMessages(prev => [
        ...prev.slice(0, -1),
        { type: 'ai', content: response }
      ]);
    } catch (error) {
      setMessages(prev => [
        ...prev.slice(0, -1),
        { type: 'ai', content: 'Sorry, I encountered an error. Please try again.' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setPrompt('');
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-[#f8fafb] relative">
      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 w-80 bg-white border-r border-gray-200 p-4 flex flex-col
        transform transition-transform duration-300 ease-in-out z-30
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-[#8e44ef]" />
            <span className="text-xl font-semibold">Gemini</span>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <button 
          onClick={handleNewChat}
          className="mt-4 flex items-center gap-2 w-full px-4 py-3 rounded-xl bg-[#f0e8ff] text-[#8e44ef] hover:bg-[#e8ddff] transition-colors"
        >
          <MessageSquare className="w-5 h-5" />
          <span>New chat</span>
        </button>

        <div className="mt-auto">
          <button className="flex items-center gap-2 w-full px-4 py-3 hover:bg-gray-100 rounded-lg transition-colors">
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full lg:w-auto">
        {/* Header */}
        <header className="h-16 border-b border-gray-200 flex items-center px-4 lg:px-6">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="ml-4 text-xl font-semibold">Gemini</h1>
        </header>

        {/* Chat Area */}
        <div className="flex-1 overflow-auto px-4 py-6">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
              <Sparkles className="w-12 h-12 text-[#8e44ef] mb-6" />
              <h2 className="text-2xl lg:text-3xl font-semibold mb-4">How can I help you today?</h2>
              <p className="text-gray-600 max-w-md">
                Gemini can help you with writing, analysis, coding, math, and more
              </p>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto space-y-6">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-4 ${
                    message.type === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[85%] lg:max-w-[80%] p-4 rounded-2xl ${
                      message.type === 'user'
                        ? 'bg-[#8e44ef] text-white'
                        : 'bg-white border border-gray-200'
                    } ${message.loading ? 'animate-pulse' : ''}`}
                  >
                    {message.type === 'ai' ? (
                      <ReactMarkdown 
                        className="prose prose-sm lg:prose-base max-w-none dark:prose-invert break-words"
                      >
                        {message.content}
                      </ReactMarkdown>
                    ) : (
                      <div className="break-words">
                        {message.content}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 p-4">
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
            <div className="relative flex items-center">
              <button
                type="button"
                className="absolute left-4 text-gray-400 hover:text-gray-600"
              >
                <Image className="w-5 h-5" />
              </button>
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Message Gemini..."
                disabled={isLoading}
                className="w-full pl-12 pr-12 py-3 rounded-2xl border border-gray-200 focus:border-[#8e44ef] focus:ring-1 focus:ring-[#8e44ef] outline-none disabled:bg-gray-50 disabled:cursor-not-allowed text-base"
              />
              <button
                type="submit"
                disabled={!prompt.trim() || isLoading}
                className="absolute right-4 text-gray-400 hover:text-[#8e44ef] disabled:hover:text-gray-400 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;