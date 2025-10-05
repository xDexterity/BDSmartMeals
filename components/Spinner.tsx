import React, { useState, useEffect } from 'react';

interface SpinnerProps {
  messages?: string[];
}

export const Spinner: React.FC<SpinnerProps> = ({ messages }) => {
  const [currentMessage, setCurrentMessage] = useState('Generating your plan...');

  useEffect(() => {
    if (messages && messages.length > 0) {
      setCurrentMessage(messages[0]);
      let messageIndex = 0;
      const intervalId = setInterval(() => {
        messageIndex = (messageIndex + 1) % messages.length;
        setCurrentMessage(messages[messageIndex]);
      }, 3000); // Change message every 3 seconds

      return () => clearInterval(intervalId);
    }
  }, [messages]);

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      <p className="text-muted-foreground text-center transition-opacity duration-500">{currentMessage}</p>
    </div>
  );
};