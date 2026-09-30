
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// O site tem uma aparência só (a vitrine escura): liga as variantes "dark" do Tailwind
// mesmo quando a página é embutida sem o <html class="dark"> original.
document.documentElement.classList.add('dark');

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);