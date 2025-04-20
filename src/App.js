import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from './pages/Inicio';
import Cuestionario from './pages/Cuestionario';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Header from './pages/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <Header />
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
      <div className="App">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/cuestionario" element={<Cuestionario />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
