import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import logo from '../assets/logo.png';

const Header = () => {
  return (
    <header className="main-header">
      <div className="logo-nombre">
        <img src={logo} alt="Logo Universidad" className="logo-img" />
        <div className="nombre-textos">
          <h1>Calculadora Ambiental</h1>
          <p className="subtitulo">Universidad Mesoamericana - Quetzaltenango</p>
        </div>
      </div>
      <nav className="nav-links">
        <Link to="/">INICIO</Link>
        <Link to="/admin">ACCEDER</Link>
      </nav>
    </header>
  );
};

export default Header;
