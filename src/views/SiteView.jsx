import React, { useState } from 'react';
import { useProjects } from '../context/ProjectContext';

export const SiteView = () => {
  const { projects, addProgress } = useProjects();
  const [selectedProject, setSelectedProject] = useState('');
  const [advance, setAdvance] = useState('');
  const [resource, setResource] = useState('');
  const [quantity, setQuantity] = useState('');
  const [comments, setComments] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = addProgress(selectedProject, parseInt(advance, 10));

    alert(result.message);

    if (result.success) {
      setAdvance('');
      setResource('');
      setQuantity('');
      setComments('');
    }
  };

  return (
    <div className="card shadow-sm p-4 border-0">
      <h4 className="text-warning fw-bold mb-4">Registro Diario de Terreno (Capataz / Jefe de Obra)</h4>

      <div className="row g-4">
        <div className="col-md-7">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-bold">Proyecto:</label>
              <select className="form-select" value={selectedProject} onChange={(e) => setSelectedProject(e.target.value)} required>
                <option value="">-- Seleccionar --</option>
                {projects.map(p => (
                  <option key={p.id} value={p.id}>{p.id} - {p.name}</option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Avance Físico del Día (%):</label>
              <input type="number" className="form-control" min="1" max="100" value={advance} onChange={(e) => setAdvance(e.target.value)} placeholder="Ej: 5" required />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Recurso Consumido:</label>
              <select className="form-select" value={resource} onChange={(e) => setResource(e.target.value)} required>
                <option value="">-- Seleccionar Recurso --</option>
                <option value="RE001">RE001 - Maestro de obra (Jornada)</option>
                <option value="RE002">RE002 - Ayudante (Jornada)</option>
                <option value="RE003">RE003 - Cemento 25kg (Saco)</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Cantidad Consumida:</label>
              <input type="number" className="form-control" min="1" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Ej: 10" required />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Observaciones de la Jornada:</label>
              <textarea className="form-control" rows="3" maxLength="150" value={comments} onChange={(e) => setComments(e.target.value)} placeholder="Avances, clima o incidencias de terreno..."></textarea>
            </div>

            <button type="submit" className="btn btn-warning text-white w-100 fw-bold">GUARDAR REGISTRO DIARIO</button>
          </form>
        </div>

        <div className="col-md-5">
          <img src="https://almozara2000.es/wp-content/uploads/2019/05/Portada_Almozara2000.jpg" alt="Terreno" className="img-fluid rounded h-100 object-fit-cover" />
        </div>
      </div>
    </div>
  );
};