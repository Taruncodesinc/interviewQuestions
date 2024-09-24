import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './index.css';
import Navbar from './Components/navbar';
import Homepage from './pages/HomePage.jsx';
import CsvTable from './pages/questionsPage.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/questions" element={<CsvTable />} />
    </Routes>
  </Router>
);
