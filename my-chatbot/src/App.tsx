import React, { useState, useRef } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Send, Trash2 } from 'lucide-react';
import { ChatMessage } from './components/ChatMessage';
import { ApiKeyInput } from './components/ApiKeyInput';
import type { ChatMessage as ChatMessageType, ChatState } from './types';

function App() {
  const [state, setState] = useState<ChatState>({
    messages: [],
    apiKey: '',
    isLoading: false,
  });
  
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputRef.current || !state.apiKey) return;
  
    const message = inputRef.current.value.trim();
    if (!message) return;
  
    const newMessage: ChatMessageType = { role: 'user', content: message };
    setState(prev => ({
      ...prev,
      messages: [...prev.messages, newMessage],
      isLoading: true,
    }));
    inputRef.current.value = '';

    try {
      const genAI = new GoogleGenerativeAI(state.apiKey);
      const model = genAI.getGenerativeModel({
        model: "gemini-pro",
        generationConfig: {
          temperature: 1,
          topP: 0.95,
          topK: 64,
          maxOutputTokens: 8192,
        },
      });

      const chat = model.startChat({
        history: state.messages.map(msg => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }], // `parts` için doğru yapıyı sağladık.
        })),
      });
      
      

      const result = await chat.sendMessage(message);
      const response = await result.response;
      const botMessage: ChatMessageType = { role: 'bot', content: response.text() };
      
      setState(prev => ({
        ...prev,
        messages: [...prev.messages, botMessage],
        isLoading: false,
      }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      console.error('Error:', errorMessage);
      setState(prev => ({ ...prev, isLoading: false }));
      alert(`Error: ${errorMessage}. Please check your API key and try again.`);
    }
  };

  const clearChat = () => {
    setState(prev => ({ ...prev, messages: [] }));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-red-600 mb-2">Fırat University AI Chatbot</h1>
          <p className="text-gray-600">Powered by Gemini AI</p>
        </div>

        <ApiKeyInput apiKey={state.apiKey} setApiKey={(key) => setState(prev => ({ ...prev, apiKey: key }))} />

        <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
          <div className="space-y-4 mb-4 max-h-[500px] overflow-y-auto">
            {state.messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}
            {state.isLoading && (
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2">
            <textarea
              ref={inputRef}
              className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="Type your message..."
              rows={1}
            />
            <button
              type="submit"
              disabled={!state.apiKey || state.isLoading}
              className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={clearChat}
              className="p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </form>
        </div>

        <footer className="text-center text-gray-600">
          Created by Sinan Balıbey
        </footer>
      </div>
    </div>
  );
}

export default App;