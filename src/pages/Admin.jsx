import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  PieChart, Pie, Cell, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend
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

  const cerrarSesion = () => {
    localStorage.removeItem('adminLogueado');
    navigate('/login');
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2>📊 Panel de Administración</h2>
        <button onClick={cerrarSesion}>Cerrar sesión</button>
      </div>

      <div className="dashboard-section card">
        <h3>Usuarios por Rol</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '40px' }}>
          <PieChart width={400} height={300}>
            <Pie
              data={porRol}
              cx={200}
              cy={150}
              outerRadius={100}
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}`}
              dataKey="value"
            >
              {porRol.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={coloresRol[index % coloresRol.length]} stroke="#fff" strokeWidth={2} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
          <div className="leyenda">
            {porRol.map((entry, index) => (
              <div key={index} className="leyenda-item">
                <span className="leyenda-color" style={{ backgroundColor: coloresRol[index % coloresRol.length] }}></span>
                {entry.name}: {entry.value}
              </div>
            ))}
          </div>
        </div>
      </div>

<div className="dashboard-section card">
  <h3>Nivel de Huella de Carbono</h3>
  <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '10px' }}>
    {Object.entries(coloresNivel).map(([nivel, color]) => (
      <div key={nivel} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ width: '16px', height: '16px', backgroundColor: color, borderRadius: '4px' }} />
        <span>{nivel}</span>
      </div>
    ))}
  </div>

  <BarChart width={500} height={300} data={porNivel}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis allowDecimals={false} />
    <Tooltip />
    <Legend />
    <Bar dataKey="value" barSize={60} label={{ position: 'top', fill: '#333', fontWeight: 'bold' }}>
      {porNivel.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={coloresNivel[entry.name]} />
      ))}
    </Bar>
  </BarChart>
</div>


      <div className="dashboard-section card">
        <h3>Respuestas Registradas</h3>
        <table>
          <thead>
            <tr>
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
