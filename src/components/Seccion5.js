import React from 'react';

const Seccion5 = ({ onChange, calcular, anterior }) => {
  return (
    <div>
      <h2>Sección 5: Conciencia y Sostenibilidad</h2>

      <label>¿Conoce el concepto de huella de carbono?</label>
      <select onChange={(e) => onChange('concepto', e.target.value)}>
        <option value="">Seleccione</option>
        <option value="Sí">Sí</option>
        <option value="He oído">He oído hablar</option>
        <option value="No">No</option>
      </select>

      <br /><br />

      <label>¿Participaría en iniciativas ambientales?</label>
      <select onChange={(e) => onChange('participacion', e.target.value)}>
        <option value="">Seleccione</option>
        <option value="Sí">Sí</option>
        <option value="No">No</option>
        <option value="Depende">Depende de la actividad</option>
      </select>

      <br /><br />

      <label>¿Realiza acciones ecológicas (reciclar, compostar, etc)? (Marca varias si aplica)</label>
      <select multiple onChange={(e) => {
        const acciones = Array.from(e.target.selectedOptions).map(o => o.value);
        onChange('accionesEco', acciones);
      }}>
        <option value="Reciclar">Reciclar</option>
        <option value="Apagar luces">Apagar luces</option>
        <option value="Evitar plásticos">Evitar plásticos</option>
        <option value="Otra">Otra</option>
      </select>

      <br /><br />

      <div className="botones-navegacion">
        <button onClick={anterior}>Anterior</button>
        <button onClick={calcular}>Calcular Huella de Carbono</button>
      </div>
    </div>
  );
};

export default Seccion5;
