import React, { useState } from 'react';
import { useProjects } from '../context/ProjectContext';

export const SiteView = () => {
  const { projects, resources, addProgress } = useProjects();

  const [selectedProject, setSelectedProject] = useState('PR001');
  const [advanceProgress, setAdvanceProgress] = useState('');
  const [selectedResource, setSelectedResource] = useState('RE001');
  const [resourceQuantity, setResourceQuantity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const progressValue = parseFloat(advanceProgress);
    if (isNaN(progressValue) || progressValue <= 0) {
      alert('Por favor ingrese un porcentaje de avance válido.');
      return;
    }

    // Lógica del contexto
    const result = addProgress(selectedProject, progressValue);
    
    // Dispara la alerta con el resultado del backend/contexto
    alert(result.message);

    // Si fue exitoso, resetea el formulario (limpia los campos)
    if (result.success) {
      setAdvanceProgress('');
      setResourceQuantity('');
    }
  };

  return (
    <div className="card border-0 shadow-sm p-4 rounded-4 bg-white">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <span className="badge bg-warning-subtle text-warning-emphasis fw-bold px-3 py-2 rounded-pill small mb-2">
            Módulo de Terreno
          </span>
          <h3 className="fw-bold text-dark mb-0">Registro Diario de Terreno</h3>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-md-6">
          <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
            <div>
              <label htmlFor="select-proyecto" className="form-label fw-bold small">Proyecto:</label>
              <select
                id="select-proyecto"
                className="form-select"
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
              >
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.id})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="input-avance" className="form-label fw-bold small">Porcentaje de Avance (%):</label>
              <input
                id="input-avance"
                type="number"
                className="form-control"
                placeholder="Ej: 5"
                value={advanceProgress}
                onChange={(e) => setAdvanceProgress(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="select-recurso" className="form-label fw-bold small">Recurso Consumido:</label>
              <select
                id="select-recurso"
                className="form-select"
                value={selectedResource}
                onChange={(e) => setSelectedResource(e.target.value)}
              >
                {resources.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="input-recurso" className="form-label fw-bold small">Cantidad Utilizada:</label>
              <input
                id="input-recurso"
                type="number"
                className="form-control"
                placeholder="Ej: 10"
                value={resourceQuantity}
                onChange={(e) => setResourceQuantity(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-warning w-100 fw-bold py-2 mt-2">
              GUARDAR REGISTRO DIARIO
            </button>
          </form>
        </div>

        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <div className="text-center">
            <img
              src="/Portada_Almozara2000.jpg"
              alt="Terreno"
              className="img-fluid rounded-4 shadow-sm"
              style={{ maxHeight: '280px', objectFit: 'cover' }}
            />
            <p className="text-muted extra-small mt-2 mb-0">Vista previa de la obra en ejecucion</p>
          </div>
        </div>
      </div>
    </div>
  );
};