import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import '../styles/Inicio.css';

const Inicio = () => {
  const navigate = useNavigate();

  return (
    <div className="inicio-container">
      <div className="inicio-box">
        <img src={logo} alt="Logo UMES" className="inicio-logo" />
        <h1 className="inicio-titulo">Calculadora de Huella de Carbono</h1>
        <p className="inicio-slogan">
          ¡Conoce tu impacto en el planeta y actúa con responsabilidad! 🌱
        </p>
        <button className="inicio-btn" onClick={() => navigate('/cuestionario')}>
          Iniciar Cuestionario
        </button>
      </div>
    </div>
  );
};

export default Inicio;
