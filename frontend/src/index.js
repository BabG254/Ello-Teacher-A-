import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import ReadingListPage from './components/ReadingListPage';
import './index.css';

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/reading-list" element={<ReadingListPage />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);
