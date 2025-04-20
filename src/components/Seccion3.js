import React from 'react';

const Seccion3 = ({ onChange, siguiente, anterior }) => {
  return (
    <div>
      <h2>Sección 3: Consumo de Electricidad</h2>

      <label>
        ¿Cuáles dispositivos usa con frecuencia?
        <span style={{ fontStyle: 'italic', fontSize: '14px', display: 'block', color: '#555' }}>
          (Mantenga presionado Ctrl o Cmd para seleccionar múltiples)
        </span>
      </label>
      <select
        multiple
        onChange={(e) => {
          const opciones = Array.from(e.target.selectedOptions).map((o) => o.value);
          onChange('dispositivos', opciones);
        }}
      >
        <option value="Computadora">Computadora</option>
        <option value="Proyector">Proyector</option>
        <option value="Ventilador">Ventilador</option>
        <option value="Cargador">Cargador</option>
        <option value="Otros">Otros</option>
      </select>

      <label>¿Cuántas horas al día usa su computadora?</label>
      <select onChange={(e) => onChange('horasPC', e.target.value)}>
        <option value="">Seleccione</option>
        <option value="menor1">Menos de 1 hora</option>
        <option value="1-3">1-3 horas</option>
        <option value="4-6">4-6 horas</option>
        <option value="6+">Más de 6 horas</option>
      </select>

      <label>¿Carga su celular en la universidad?</label>
      <select onChange={(e) => onChange('celular', e.target.value)}>
        <option value="">Seleccione</option>
        <option value="No">No</option>
        <option value="A veces">A veces</option>
        <option value="Diario">Sí, diariamente</option>
        <option value="Varias">Sí, varias veces al día</option>
      </select>

      <div className="botones-navegacion">
        <button onClick={anterior}>Anterior</button>
        <button onClick={siguiente}>Siguiente</button>
      </div>
    </div>
  );
};

export default Seccion3;
