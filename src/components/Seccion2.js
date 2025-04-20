import React, { useState } from 'react';

const Seccion2 = ({ onChange, siguiente, anterior }) => {
  const [transporte, setTransporte] = useState('');

  const handleChange = (campo, valor) => {
    onChange(campo, valor);
  };

  return (
    <div>
      <h2>Sección 2: Transporte y Movilidad</h2>

      <label>¿Con qué frecuencia asiste presencialmente?</label>
      <select onChange={(e) => handleChange('frecuencia', e.target.value)}>
        <option value="">Seleccione</option>
        <option value="Todos los días">Todos los días</option>
        <option value="3-4 veces">3-4 veces por semana</option>
        <option value="1-2 veces">1-2 veces por semana</option>
        <option value="Ocasional">Solo en ocasiones</option>
      </select>

      <label>¿Cuál es su principal medio de transporte?</label>
      <select
        onChange={(e) => {
          setTransporte(e.target.value);
          handleChange('transporte', e.target.value);
        }}
      >
        <option value="">Seleccione</option>
        <option value="A pie">A pie</option>
        <option value="Bicicleta">Bicicleta</option>
        <option value="Motocicleta">Motocicleta</option>
        <option value="Vehículo particular">Vehículo particular</option>
        <option value="Transporte público">Transporte público</option>
        <option value="Taxi/Uber">Taxi/Uber</option>
        <option value="Compartido">Compartido con otros</option>
        <option value="Combinación">Combinación de medios</option>
      </select>

      <label>¿Cuántos km recorre aproximadamente?</label>
      <select onChange={(e) => handleChange('distancia', e.target.value)}>
        <option value="">Seleccione</option>
        <option value="0-2">Menos de 2 km</option>
        <option value="2-5">2 - 5 km</option>
        <option value="6-10">6 - 10 km</option>
        <option value="11-20">11 - 20 km</option>
        <option value="20+">Más de 20 km</option>
      </select>

      {transporte === 'Vehículo particular' || transporte === 'Motocicleta' ? (
        <>
          <label>¿Qué tipo de combustible usa?</label>
          <select onChange={(e) => handleChange('combustible', e.target.value)}>
            <option value="">Seleccione</option>
            <option value="Gasolina">Gasolina</option>
            <option value="Diésel">Diésel</option>
            <option value="Híbrido">Híbrido</option>
            <option value="Eléctrico">Eléctrico</option>
          </select>

          <label>¿Cuántas personas viajan con usted?</label>
          <select onChange={(e) => handleChange('acompañantes', e.target.value)}>
            <option value="">Seleccione</option>
            <option value="Solo">Solo yo</option>
            <option value="1">1 persona más</option>
            <option value="2+">2 o más personas</option>
          </select>
        </>
      ) : null}

      {transporte === 'Transporte público' && (
        <>
          <label>¿Cuántos viajes hace al mes?</label>
          <input
            type="number"
            onChange={(e) => handleChange('viajesPublico', e.target.value)}
            placeholder="Ingrese número de viajes"
          />
        </>
      )}

      <div className="botones-navegacion">
        <button onClick={anterior}>Anterior</button>
        <button onClick={siguiente}>Siguiente</button>
      </div>
    </div>
  );
};

export default Seccion2;
