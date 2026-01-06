import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Clinic/Registration-page/Register.jsx';
import Doc from './Clinic/Doctor-Page/Doc.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/doctor" element={<Doc />} />
      </Routes>
    </Router>
  );
};

export default App;