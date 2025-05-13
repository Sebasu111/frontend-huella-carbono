import React from 'react';
import '../styles/Resultado.css';
import { FaLeaf, FaExclamationTriangle, FaFireAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Resultado = ({ puntaje, respuestas }) => {
  const navigate = useNavigate();

  let nivel = '';
  let color = '';
  let icono = null;

  if (puntaje < 50) {
    nivel = 'Baja huella de carbono';
    color = '#2ecc71';
    icono = <FaLeaf size={36} color={color} />;
  } else if (puntaje <= 150) {
    nivel = 'Media huella de carbono';
    color = '#f1c40f';
    icono = <FaExclamationTriangle size={36} color={color} />;
  } else {
    nivel = 'Alta huella de carbono';
    color = '#e74c3c';
    icono = <FaFireAlt size={36} color={color} />;
  }

  // 👉 Recomendaciones personalizadas
  const recomendaciones = [];

  // Sección 2: Transporte
  if (respuestas.transporte === 'Vehículo particular' || respuestas.transporte === 'Motocicleta') {
    recomendaciones.push('Considera reducir el uso de vehículo particular o compartir viajes.');
  } else if (respuestas.transporte === 'Transporte público') {
    recomendaciones.push('¡Bien! El transporte público reduce la huella individual.');
  } else if (respuestas.transporte === 'A pie' || respuestas.transporte === 'Bicicleta') {
    recomendaciones.push('Excelente elección al usar medios de transporte sostenibles.');
  }

  // Sección 3: Electricidad
  if (!respuestas.dispositivos || respuestas.dispositivos.length === 0) {
    recomendaciones.push('Parece que no usas muchos dispositivos eléctricos, ¡muy bien!');
  } else if (respuestas.dispositivos.includes('Computadora') && respuestas.horasPC === '6+') {
    recomendaciones.push('Intenta reducir las horas de uso de tu computadora si es posible.');
  }

  if (respuestas.celular === 'Diario' || respuestas.celular === 'Varias') {
    recomendaciones.push('Evita cargar el celular constantemente para reducir el consumo energético.');
  }

  // Sección 4: Residuos
  if (respuestas.clasificacion === 'No') {
    recomendaciones.push('Empieza a clasificar tus residuos para facilitar el reciclaje.');
  }

  if (respuestas.botellas === 'Siempre nuevas') {
    recomendaciones.push('Evita el uso de botellas desechables, lleva tu propia botella reutilizable.');
  }

  if (respuestas.envases === 'Siempre') {
    recomendaciones.push('Reduce la compra de alimentos en envases desechables.');
  }

  if (recomendaciones.length === 0) {
    recomendaciones.push('🌱 ¡Excelente! Continúa con tus hábitos sostenibles.');
  }

  const porcentaje = Math.min((puntaje / 200) * 100, 100);

  return (
<div className="resultado-card fade-in">
  <h2 className="resultado-titulo">Resultado del cálculo</h2>

  <div className="resultado-icono">
    {icono}
  </div>

  <p className="puntaje">
    <strong>Puntaje total:</strong> {puntaje}
  </p>

  <p className="nivel">
    <strong>Huella de carbono:</strong>{' '}
    <span style={{ color, fontWeight: 'bold' }}>{nivel}</span>
  </p>

  <div className="barra-container">
    <div className="barra-fondo">
      <div
        className="barra-color"
        style={{ width: `${porcentaje}%`, backgroundColor: color }}
      ></div>
    </div>
  </div>

  <div className="consejos">
    <h3 style={{ marginTop: '1.5rem', fontWeight: '600' }}>
      Consejos personalizados
    </h3>
    <ul style={{ paddingLeft: '1.2rem', marginTop: '0.8rem' }}>
      {recomendaciones.map((rec, i) => (
        <li key={i} style={{ marginBottom: '0.6rem', lineHeight: '1.4' }}>
          {rec}
        </li>
      ))}
    </ul>
  </div>

  <a
    href="https://view.genially.com/67fdea68ebcf68ac025ff54d"
    target="_blank"
    rel="noopener noreferrer"
    className="ver-mas-btn"
    style={{
      display: 'inline-block',
      marginTop: '1rem',
      padding: '0.6rem 1.2rem',
      backgroundColor: '#3498db',
      color: '#fff',
      textDecoration: 'none',
      borderRadius: '6px',
      fontWeight: '500'
    }}
  >
    Ver más consejos
  </a>

  <br />
  <button
    className="salir-btn"
    onClick={() => navigate('/')}
    style={{
      marginTop: '1rem',
      padding: '0.6rem 1.4rem',
      backgroundColor: '#e74c3c',
      color: '#fff',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontWeight: '500'
    }}
  >
    Salir
  </button>
</div>
  );
};

export default Resultado;
