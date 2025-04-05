import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

// Output environment info for debugging
console.log("Environment variables:");
console.log("API URL:", process.env.REACT_APP_API_URL || 'Not set');
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("User Agent:", navigator.userAgent);
console.log("Platform:", navigator.platform);
console.log("React starting initialization...");
console.log("Root element:", document.getElementById('root'));

// Function to detect mobile browsers
const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

console.log("Is mobile device:", isMobile());

try {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
  console.log("React initialization successful");
} catch (error) {
  console.error("Error initializing React:", error);
  // Display error on page
  const rootElement = document.getElementById('root');
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="color: red; padding: 20px; text-align: center;">
        <h1>React Error</h1>
        <p>${error.message}</p>
        <pre>${error.stack}</pre>
        <p>Environment: ${process.env.NODE_ENV}</p>
        <p>API URL: ${process.env.REACT_APP_API_URL || 'Not set'}</p>
        <p>Mobile: ${isMobile() ? 'Yes' : 'No'}</p>
      </div>
    `;
  }
} 