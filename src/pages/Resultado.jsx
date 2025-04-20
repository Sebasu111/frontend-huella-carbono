import React from 'react';
import '../styles/Resultado.css';
import { FaLeaf, FaExclamationTriangle, FaFireAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Resultado = ({ puntaje }) => {
  const navigate = useNavigate();

  let nivel = '';
  let recomendacion = '';
  let color = '';
  let icono = null;

  if (puntaje < 50) {
    nivel = 'Baja huella de carbono';
    recomendacion = '🌱 ¡Excelente! Continúa con tus hábitos sostenibles.';
    color = '#2ecc71';
    icono = <FaLeaf size={36} color={color} />;
  } else if (puntaje <= 150) {
    nivel = 'Media huella de carbono';
    recomendacion = '⚠️ Puedes mejorar usando transporte ecológico, reduciendo tu consumo eléctrico y clasificando mejor tus residuos.';
    color = '#f1c40f';
    icono = <FaExclamationTriangle size={36} color={color} />;
  } else {
    nivel = 'Alta huella de carbono';
    recomendacion = '🔥 Tu impacto ambiental es alto. Intenta caminar más, evitar plásticos desechables y apagar dispositivos innecesarios.';
    color = '#e74c3c';
    icono = <FaFireAlt size={36} color={color} />;
  }

  const porcentaje = Math.min((puntaje / 200) * 100, 100);

  return (
    <div className="resultado-card fade-in">
      <h2>🌿 Resultado del Cálculo</h2>
      <div className="resultado-icon">{icono}</div>
      <p className="puntaje">Puntaje Total: <strong>{puntaje}</strong></p>
      <p className="nivel">Huella de Carbono: <strong style={{ color }}>{nivel}</strong></p>

      <div className="barra-container">
        <div className="barra-fondo">
          <div className="barra-color" style={{ width: `${porcentaje}%`, backgroundColor: color }}></div>
        </div>
      </div>

      <p className="recomendacion">{recomendacion}</p>

      <a
  href="https://view.genially.com/67fdea68ebcf68ac025ff54d"
  target="_blank"
  rel="noopener noreferrer"
  className="ver-mas-btn"
>
  👀 Ver más consejos
</a>

<br />

<button className="salir-btn" onClick={() => navigate('/')}>
  Salir
</button>

    </div>
  );
};

export default Resultado;
