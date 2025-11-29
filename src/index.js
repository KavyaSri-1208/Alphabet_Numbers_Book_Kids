// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import BookContainer from './BookContainer';
// Assume styles.css is imported or linked in index.html for a standard setup

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BookContainer />
  </React.StrictMode>
);