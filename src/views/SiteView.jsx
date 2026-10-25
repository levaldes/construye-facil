import React, { useState } from 'react';
import { useProjects } from '../context/ProjectContext';

export const SiteView = () => {
  const { projects, addProgress } = useProjects();
  const [selectedProject, setSelectedProject] = useState('');
  const [advance, setAdvance] = useState('');
  const [resource, setResource] = useState('');
  const [quantity, setQuantity] = useState('');
  const [comments, setComments] = useState('');
  const [bitacora, setBitacora] = useState([
    {
      fecha: '24/10/2026, 10:30:00',
      usuario: 'Juan Capataz',
      proyecto: 'PR001',
      avance: 5,
      recurso: 'RE003 - Cemento 25kg (Saco)',
      cantidad: 10,
      observaciones: 'Nivelación de terreno y vaciado de hormigón inicial.'
    }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = addProgress(selectedProject, parseInt(advance, 10));

    alert(result.message);

    if (result.success) {
      const nuevoRegistro = {
        fecha: new Date().toLocaleString(),
        usuario: 'Juan Capataz',
        proyecto: selectedProject,
        avance: parseInt(advance, 10),
        recurso: resource,
        cantidad: quantity,
        observaciones: comments || 'Sin observaciones'
      };

      setBitacora([nuevoRegistro, ...bitacora]);
      setAdvance('');
      setResource('');
      setQuantity('');
      setComments('');
    }
  };

  return (
    <div className="container-fluid p-0">
      <div className="card shadow-sm p-3 p-md-4 border-0 mb-4">
        <h4 className="text-warning fw-bold mb-4 fs-3">
          Registro Diario de Terreno (Capataz / Jefe de Obra)
        </h4>

        <div className="row g-4">
          <div className="col-12 col-md-7">
            <form onSubmit={handleSubmit}>
              
              <div className="mb-3">
                <label className="form-label fw-bold fs-5">Proyecto:</label>
                <select 
                  className="form-select form-select-lg py-3 fs-5" 
                  value={selectedProject} 
                  onChange={(e) => setSelectedProject(e.target.value)} 
                  required
                >
                  <option value="">-- Seleccionar --</option>
                  {projects.map(p => (
                    <option key={p.id} value={p.id}>{p.id} - {p.name}</option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold fs-5">Avance Físico del Día (%):</label>
                <input 
                  type="number" 
                  className="form-control form-control-lg py-3 fs-5" 
                  min="1" 
                  max="100" 
                  value={advance} 
                  onChange={(e) => setAdvance(e.target.value)} 
                  placeholder="Ej: 5" 
                  required 
                />
                <div className="d-flex gap-2 mt-2 align-items-center">
                  <small className="text-muted fw-bold me-1">Atajos táctiles:</small>
                  {[5, 10, 15, 20].map((num) => (
                    <button
                      key={num}
                      type="button"
                      className="btn btn-outline-warning btn-sm px-3 fw-bold rounded-pill"
                      onClick={() => setAdvance(num.toString())}
                    >
                      +{num}%
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold fs-5">Recurso Consumido:</label>
                <select 
                  className="form-select form-select-lg py-3 fs-5" 
                  value={resource} 
                  onChange={(e) => setResource(e.target.value)} 
                  required
                >
                  <option value="">-- Seleccionar Recurso --</option>
                  <option value="RE001">RE001 - Maestro de obra (Jornada)</option>
                  <option value="RE002">RE002 - Ayudante (Jornada)</option>
                  <option value="RE003">RE003 - Cemento 25kg (Saco)</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold fs-5">Cantidad Consumida:</label>
                <input 
                  type="number" 
                  className="form-control form-control-lg py-3 fs-5" 
                  min="1" 
                  value={quantity} 
                  onChange={(e) => setQuantity(e.target.value)} 
                  placeholder="Ej: 10" 
                  required 
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-bold fs-5">Observaciones de la Jornada:</label>
                <textarea 
                  className="form-control form-control-lg p-3 fs-6" 
                  rows="3" 
                  maxLength="150" 
                  value={comments} 
                  onChange={(e) => setComments(e.target.value)} 
                  placeholder="Avances, clima o incidencias de terreno..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="btn btn-warning text-white w-100 fw-bold py-3 fs-5 shadow-sm"
              >
                GUARDAR REGISTRO DIARIO
              </button>
            </form>
          </div>

          <div className="col-12 col-md-5">
            <img 
              src="https://almozara2000.es/wp-content/uploads/2019/05/Portada_Almozara2000.jpg" 
              alt="Terreno" 
              className="img-fluid rounded h-100 object-fit-cover shadow-sm" 
              style={{ minHeight: '250px' }}
            />
          </div>
        </div>
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center py-3">
          <h5 className="mb-0 fw-bold fs-5">
            Bitácora Digital de Eventos (Historial de Trazabilidad)
          </h5>
          <span className="badge bg-warning text-dark fs-6">
            {bitacora.length} Registros
          </span>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th scope="col" className="ps-3">Fecha / Hora</th>
                  <th scope="col">Usuario / Rol</th>
                  <th scope="col">Proyecto</th>
                  <th scope="col">Avance</th>
                  <th scope="col">Recursos Consumidos</th>
                  <th scope="col" className="pe-3">Observaciones</th>
                </tr>
              </thead>
              <tbody>
                {bitacora.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-muted">
                      No hay registros en la bitácora aún.
                    </td>
                  </tr>
                ) : (
                  bitacora.map((item, index) => (
                    <tr key={index}>
                      <td className="ps-3 text-nowrap"><small>{item.fecha}</small></td>
                      <td>
                        <span className="badge bg-secondary">{item.usuario}</span>
                      </td>
                      <td><strong className="text-primary">{item.proyecto}</strong></td>
                      <td>
                        <span className="badge bg-success">+{item.avance}%</span>
                      </td>
                      <td>
                        <small>{item.recurso} ({item.cantidad} un.)</small>
                      </td>
                      <td className="pe-3 text-break"><small>{item.observaciones}</small></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};