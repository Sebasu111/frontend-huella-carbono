import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  PieChart, Pie, Cell, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer
} from 'recharts';

const coloresRol = ['#3498db', '#9b59b6', '#e67e22', '#2ecc71'];
const coloresNivel = {
  Baja: '#2ecc71',
  Media: '#f1c40f',
  Alta: '#e74c3c'
};

const Admin = () => {
  const navigate = useNavigate();
  const [datos, setDatos] = useState([]);
  const [porRol, setPorRol] = useState([]);
  const [porNivel, setPorNivel] = useState([]);
  const [seccionSeleccionada, setSeccionSeleccionada] = useState('Transporte');
  const [estadisticasSeccion, setEstadisticasSeccion] = useState([]);

  useEffect(() => {
    const logueado = localStorage.getItem('adminLogueado');
    if (!logueado) navigate('/login');

    const obtenerDatos = async () => {
      try {
        const res = await axios.get('https://backend-huella-carbono.onrender.com/api/respuestas');
        setDatos(res.data);
        procesarDatos(res.data);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    obtenerDatos();
  }, [navigate]);

  useEffect(() => {
    if (datos.length > 0) {
      const clave = {
        Transporte: 'transporte',
        Electricidad: 'dispositivos',
        Residuos: 'clasificacion',
        Sostenibilidad: 'concepto'
      }[seccionSeleccionada];
      calcularEstadisticasPorSeccion(clave);
    }
  }, [seccionSeleccionada, datos]);

  const procesarDatos = (data) => {
    const conteoRol = {};
    const conteoNivel = { Baja: 0, Media: 0, Alta: 0 };

    data.forEach(d => {
      conteoRol[d.rol] = (conteoRol[d.rol] || 0) + 1;
      const pt = d.puntajeTotal;
      if (pt < 50) conteoNivel.Baja++;
      else if (pt <= 150) conteoNivel.Media++;
      else conteoNivel.Alta++;
    });

    setPorRol(Object.entries(conteoRol).map(([name, value]) => ({ name, value })));
    setPorNivel(Object.entries(conteoNivel).map(([name, value]) => ({ name, value })));
  };

  const calcularEstadisticasPorSeccion = (seccion) => {
    const conteo = {};
    datos.forEach((d) => {
      if (!d[seccion]) return;
      const respuestas = Array.isArray(d[seccion]) ? d[seccion] : [d[seccion]];
      respuestas.forEach((r) => {
        conteo[r] = (conteo[r] || 0) + 1;
      });
    });
    const resultado = Object.entries(conteo).map(([name, value]) => ({ name, value }));
    setEstadisticasSeccion(resultado);
  };

  const cerrarSesion = () => {
    localStorage.removeItem('adminLogueado');
    navigate('/login');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'Segoe UI' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', marginBottom: '30px' }}>
        <h2>📊 Panel de Administración</h2>
        <button
          onClick={cerrarSesion}
          style={{ background: '#e74c3c', color: '#fff', padding: '10px 16px', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
        >
          Cerrar sesión
        </button>
      </div>

      {/* Usuarios por Rol */}
      <div style={{ background: '#fff', padding: '20px', borderRadius: '16px', marginBottom: '30px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <h3>Usuarios por Rol</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '40px' }}>
          <ResponsiveContainer width={400} height={300}>
            <PieChart>
              <Pie
                data={porRol}
                cx="50%"
                cy="50%"
                outerRadius={100}
                labelLine={false}
                label={false}
                dataKey="value"
              >
                {porRol.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={coloresRol[index % coloresRol.length]} stroke="#fff" strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {porRol.map((entry, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '16px', height: '16px', backgroundColor: coloresRol[index % coloresRol.length], borderRadius: '4px' }} />
                {entry.name}: {entry.value}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Nivel de Huella */}
      <div style={{ background: '#fff', padding: '20px', borderRadius: '16px', marginBottom: '30px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <h3>Nivel de Huella de Carbono</h3>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '10px' }}>
          {Object.entries(coloresNivel).map(([nivel, color]) => (
            <div key={nivel} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '16px', height: '16px', backgroundColor: color, borderRadius: '4px' }} />
              <span>{nivel}</span>
            </div>
          ))}
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={porNivel} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" barSize={60} label={{ position: 'insideTop', fill: '#fff', fontWeight: 'bold' }}>
              {porNivel.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={coloresNivel[entry.name]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Estadísticas por Sección */}
      <div style={{ background: '#fff', padding: '20px', borderRadius: '16px', marginBottom: '30px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <h3>Estadísticas por Sección</h3>
        <label>Selecciona una sección:</label>
        <select
          value={seccionSeleccionada}
          onChange={(e) => setSeccionSeleccionada(e.target.value)}
          style={{ marginBottom: '20px', padding: '6px 12px', borderRadius: '8px', fontSize: '1rem' }}
        >
          <option value="Transporte">Transporte</option>
          <option value="Electricidad">Electricidad</option>
          <option value="Residuos">Reducción de Residuos</option>
          <option value="Sostenibilidad">Conciencia y Sostenibilidad</option>
        </select>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={estadisticasSeccion}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" barSize={50} fill="#3498db" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Tabla de Respuestas */}
      <div style={{ background: '#fff', padding: '20px', borderRadius: '16px', marginBottom: '30px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', overflowX: 'auto' }}>
        <h3>Respuestas Registradas</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th>#</th>
              <th>Rol</th>
              <th>Puntaje</th>
              <th>Nivel</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {datos.map((dato, index) => {
              let nivel = 'Alta';
              if (dato.puntajeTotal < 50) nivel = 'Baja';
              else if (dato.puntajeTotal <= 150) nivel = 'Media';

              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{dato.rol}</td>
                  <td>{dato.puntajeTotal}</td>
                  <td style={{ color: coloresNivel[nivel], fontWeight: 'bold' }}>{nivel}</td>
                  <td>{new Date(dato.createdAt).toLocaleString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
