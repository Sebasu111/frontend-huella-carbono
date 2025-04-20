import React from 'react';

const Seccion1 = ({ onChange, siguiente }) => (
  <div>
    <h2>Sección 1: Identificación del Rol</h2>
    <label>
      ¿Cuál es su rol en la universidad?
      <select onChange={(e) => onChange('rol', e.target.value)}>
        <option value="">Seleccione</option>
        <option value="Administrador">Administrador</option>
        <option value="Docente">Docente</option>
        <option value="Estudiante">Estudiante</option>
      </select>
    </label>
    <br />
    <button onClick={siguiente}>Siguiente</button>
  </div>
);

export default Seccion1;
