import React from 'react';

const Resultado = ({ puntaje }) => {
  let nivel = '';
  if (puntaje < 50) nivel = 'Baja huella de carbono';
  else if (puntaje <= 150) nivel = 'Media huella de carbono';
  else nivel = 'Alta huella de carbono';

  return (
    <div>
      <h2>Resultado</h2>
      <p>Puntaje total: <strong>{puntaje}</strong></p>
      <p>Tu huella de carbono es: <strong>{nivel}</strong></p>
    </div>
  );
};

export default Resultado;
