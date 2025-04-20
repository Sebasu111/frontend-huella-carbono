import React from 'react';

const Seccion4 = ({ onChange, siguiente, anterior }) => {
  return (
    <div>
      <h2>Sección 4: Reducción de Residuos</h2>

      <label>¿Clasifica sus residuos?</label>
      <select onChange={(e) => onChange('clasificacion', e.target.value)}>
        <option value="">Seleccione</option>
        <option value="Siempre">Sí, siempre</option>
        <option value="A veces">A veces</option>
        <option value="No">No</option>
      </select>

      <label>¿Utiliza botellas desechables?</label>
      <select onChange={(e) => onChange('botellas', e.target.value)}>
        <option value="">Seleccione</option>
        <option value="No">No</option>
        <option value="Reutilizo">Sí, pero las reutilizo</option>
        <option value="Siempre nuevas">Uso una nueva cada vez</option>
      </select>

      <label>¿Compra alimentos en envases desechables?</label>
      <select onChange={(e) => onChange('envases', e.target.value)}>
        <option value="">Seleccione</option>
        <option value="Siempre">Siempre</option>
        <option value="A veces">A veces</option>
        <option value="Nunca">Nunca</option>
      </select>

      <div className="botones-navegacion">
        <button onClick={anterior}>Anterior</button>
        <button onClick={siguiente}>Siguiente</button>
      </div>
    </div>
  );
};

export default Seccion4;
