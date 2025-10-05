import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './contexts/ThemeContext';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    {/* FIX: Explicitly pass App as the children prop to ThemeProvider. This is functionally identical to the previous code but can help with type inference in some complex scenarios, potentially resolving the reported error. */}
    <ThemeProvider children={<App />} />
  </React.StrictMode>
);
