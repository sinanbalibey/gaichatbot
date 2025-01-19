import React, { useState } from 'react';
import { Key, Eye, EyeOff } from 'lucide-react';

interface Props {
  apiKey: string;
  setApiKey: (key: string) => void;
}

export const ApiKeyInput: React.FC<Props> = ({ apiKey, setApiKey }) => {
  const [showApiKey, setShowApiKey] = useState(false);

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <div className="flex items-center gap-2 p-4 bg-white rounded-lg shadow-md">
        <Key className="w-5 h-5 text-red-600" />
        <input
          type={showApiKey ? "text" : "password"}
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter your Gemini API key"
          className="flex-1 bg-transparent border-none focus:outline-none text-gray-800"
        />
        <button
          type="button"
          onClick={() => setShowApiKey(!showApiKey)}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          aria-label={showApiKey ? "Hide API key" : "Show API key"}
        >
          {showApiKey ? (
            <EyeOff className="w-5 h-5 text-gray-600" />
          ) : (
            <Eye className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>
    </div>
  );
};