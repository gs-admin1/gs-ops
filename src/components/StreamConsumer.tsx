import { useEffect, useState } from 'react';
import { StreamHandler } from '../utils/streamHandler';

export function StreamConsumer() {
  const [messages, setMessages] = useState<string[]>([]);
  const streamHandler = new StreamHandler();

  useEffect(() => {
    async function consumeStream() {
      try {
        const response = await fetch('/api/stream');
        if (!response.body) return;

        await streamHandler.processStreamData(
          response.body,
          (chunk) => {
            setMessages(prev => [...prev, chunk]);
          }
        );
      } catch (error) {
        console.error('Stream error:', error);
      }
    }

    consumeStream();
  }, []);

  return (
    <div className="stream-container">
      {messages.map((message, index) => (
        <div key={index} className="stream-message">
          {message}
        </div>
      ))}
    </div>
  );
}