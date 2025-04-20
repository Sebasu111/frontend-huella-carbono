import React, { useState } from 'react';
import Seccion1 from '../components/Seccion1';
import Seccion2 from '../components/Seccion2';
import Seccion3 from '../components/Seccion3';
import Seccion4 from '../components/Seccion4';
import Seccion5 from '../components/Seccion5';
import Resultado from './Resultado';
import axios from 'axios';
import { toast } from 'react-toastify';

const Cuestionario = () => {
  const [seccion, setSeccion] = useState(1);
  const [respuestas, setRespuestas] = useState({});
  const [puntajeTotal, setPuntajeTotal] = useState(null);
  const [cargando, setCargando] = useState(false);

  const erroresMostrados = {};

  const handleChange = (campo, valor) => {
    setRespuestas((prev) => ({ ...prev, [campo]: valor }));
  };

  const mostrarErrorUnico = (mensaje, id) => {
    if (!toast.isActive(id)) {
      toast.error(mensaje, { toastId: id });
    }
  };

  const siguiente = () => {
    if (seccion === 1 && !respuestas.rol) {
      mostrarErrorUnico("Por favor selecciona tu rol.", "rol-error");
      return;
    }

    if (seccion === 2) {
      if (!respuestas.frecuencia || !respuestas.transporte || !respuestas.distancia) {
        mostrarErrorUnico("Completa todas las preguntas de transporte y movilidad.", "transporte-error");
        return;
      }
      if ((respuestas.transporte === "Motocicleta" || respuestas.transporte === "Vehículo particular") && !respuestas.combustible) {
        mostrarErrorUnico("Debes indicar el tipo de combustible.", "combustible-error");
        return;
      }
      if (respuestas.transporte === "Vehículo particular" && !respuestas.acompañantes) {
        mostrarErrorUnico("Indica cuántas personas viajan contigo.", "acompañantes-error");
        return;
      }
      if (respuestas.transporte === "Transporte público" && !respuestas.viajesPublico) {
        mostrarErrorUnico("Indica los viajes en transporte público.", "publico-error");
        return;
      }
    }

    if (seccion === 3) {
      if (!respuestas.dispositivos || respuestas.dispositivos.length === 0 || !respuestas.horasPC || !respuestas.celular) {
        mostrarErrorUnico("Completa toda la sección de consumo eléctrico.", "electricidad-error");
        return;
      }
    }

    if (seccion === 4) {
      if (!respuestas.clasificacion || !respuestas.botellas || !respuestas.envases) {
        mostrarErrorUnico("Responde todas las preguntas sobre residuos.", "residuos-error");
        return;
      }
    }

    if (seccion === 5) {
      if (!respuestas.concepto || !respuestas.participacion) {
        mostrarErrorUnico("Faltan respuestas en la sección de conciencia.", "conciencia-error");
        return;
      }
    }

    setSeccion(seccion + 1);
  };

  const anterior = () => setSeccion(seccion - 1);

  const volver = () => {
    setPuntajeTotal(null);
    setSeccion(1);
    setRespuestas({});
  };

  const calcular = async () => {

    if (!respuestas.concepto || !respuestas.participacion) {
      toast.error("Por favor completa todas las preguntas de conciencia ambiental.");
      return;
    }

    let puntaje = 0;

    switch (respuestas.frecuencia) {
      case 'Todos los días': puntaje += 30; break;
      case '3-4 veces': puntaje += 20; break;
      case '1-2 veces': puntaje += 10; break;
      case 'Ocasional': puntaje += 5; break;
    }

    switch (respuestas.transporte) {
      case 'A pie':
      case 'Bicicleta': puntaje += 0; break;
      case 'Motocicleta': puntaje += 20; break;
      case 'Vehículo particular': puntaje += 30; break;
      case 'Transporte público': puntaje += 15; break;
      case 'Taxi/Uber': puntaje += 25; break;
      case 'Compartido': puntaje += 10; break;
      case 'Combinación': puntaje += 20; break;
    }

    switch (respuestas.distancia) {
      case '0-2': puntaje += 0; break;
      case '2-5': puntaje += 5; break;
      case '6-10': puntaje += 10; break;
      case '11-20': puntaje += 20; break;
      case '20+': puntaje += 30; break;
    }

    if (respuestas.combustible === 'Gasolina') puntaje += 30;
    else if (respuestas.combustible === 'Diésel') puntaje += 25;
    else if (respuestas.combustible === 'Híbrido') puntaje += 10;
    else if (respuestas.combustible === 'Eléctrico') puntaje += 5;

    if (respuestas.acompañantes === 'Solo') puntaje += 30;
    else if (respuestas.acompañantes === '1') puntaje += 15;
    else if (respuestas.acompañantes === '2+') puntaje += 5;

    if (respuestas.viajesPublico) puntaje += parseInt(respuestas.viajesPublico || 0);

    if (Array.isArray(respuestas.dispositivos)) puntaje += respuestas.dispositivos.length * 5;

    switch (respuestas.horasPC) {
      case 'menor1': puntaje += 5; break;
      case '1-3': puntaje += 10; break;
      case '4-6': puntaje += 15; break;
      case '6+': puntaje += 20; break;
    }

    switch (respuestas.celular) {
      case 'Diario': puntaje += 10; break;
      case 'Varias': puntaje += 15; break;
      case 'A veces': puntaje += 5; break;
      case 'No': puntaje += 0; break;
    }

    switch (respuestas.clasificacion) {
      case 'Siempre': puntaje += 0; break;
      case 'A veces': puntaje += 10; break;
      case 'No': puntaje += 20; break;
    }

    switch (respuestas.botellas) {
      case 'No': puntaje += 0; break;
      case 'Reutilizo': puntaje += 5; break;
      case 'Siempre nuevas': puntaje += 15; break;
    }

    switch (respuestas.envases) {
      case 'Siempre': puntaje += 20; break;
      case 'A veces': puntaje += 10; break;
      case 'Nunca': puntaje += 0; break;
    }

    switch (respuestas.concepto) {
      case 'Sí': puntaje += 0; break;
      case 'He oído': puntaje += 5; break;
      case 'No': puntaje += 10; break;
    }

    switch (respuestas.participacion) {
      case 'Sí': puntaje += 0; break;
      case 'Depende': puntaje += 10; break;
      case 'No': puntaje += 20; break;
    }

    if (Array.isArray(respuestas.accionesEco)) {
      puntaje -= respuestas.accionesEco.length * 5;
    }

    setCargando(true);

    setTimeout(async () => {
      setPuntajeTotal(puntaje);
      setCargando(false);

      try {
        await axios.post('http://localhost:5000/api/guardar', {
          ...respuestas,
          puntajeTotal: puntaje,
        });
        toast.success("✅ Resultado guardado correctamente.");
      } catch (err) {
        toast.error("❌ Hubo un error al guardar los datos.");
        console.error("Error al guardar los datos", err);
      }
    }, 1500);
  };

  return (
    <div className="App">
      {cargando ? (
        <div className="calculando-box">
          <div className="spinner"></div>
          <p>Calculando tu huella de carbono...</p>
        </div>
      ) : puntajeTotal !== null ? (
        <Resultado puntaje={puntajeTotal} onVolver={volver} />
      ) : (
        <>
          {seccion === 1 && <Seccion1 onChange={handleChange} siguiente={siguiente} />}
          {seccion === 2 && <Seccion2 onChange={handleChange} siguiente={siguiente} anterior={anterior} />}
          {seccion === 3 && <Seccion3 onChange={handleChange} siguiente={siguiente} anterior={anterior} />}
          {seccion === 4 && <Seccion4 onChange={handleChange} siguiente={siguiente} anterior={anterior} />}
          {seccion === 5 && <Seccion5 onChange={handleChange} calcular={calcular} anterior={anterior} />}
        </>
      )}
    </div>
  );
};

export default Cuestionario;
