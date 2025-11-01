import React from 'react';
import ReactDOM from 'react-dom/client';

// component
import App from './App.tsx';

// style
import './style.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
