export interface ChatMessage {
    role: 'user' | 'bot';
    content: string;
  }
  
  export interface ChatState {
    messages: ChatMessage[];
    apiKey: string;
    isLoading: boolean;
  }