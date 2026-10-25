import React from 'react';

const BitacoraEventos = ({ bitacora = [] }) => {
  return (
    <div className="card shadow-sm border-0 mb-4">
      <div className="card-header bg-dark text-white d-flex align-items-center justify-content-between py-3">
        <h5 className="mb-0 fs-5 fw-bold">
          <i className="bi bi-journal-text me-2"></i>Historial de Bitácora y Trazabilidad
        </h5>
        <span className="badge bg-info text-dark fs-6">{bitacora.length} Registros</span>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-hover table-striped align-middle mb-0 fs-6">
            <thead className="table-light">
              <tr>
                <th scope="col" className="py-3 ps-3">Fecha / Hora</th>
                <th scope="col" className="py-3">Usuario / Rol</th>
                <th scope="col" className="py-3">Avance Guardado</th>
                <th scope="col" className="py-3">Recursos Consumidos</th>
                <th scope="col" className="py-3 pe-3">Observaciones</th>
              </tr>
            </thead>
            <tbody>
              {bitacora.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-muted fs-6">
                    No hay registros grabados en la bitácora aún.
                  </td>
                </tr>
              ) : (
                bitacora.map((item, index) => (
                  <tr key={index}>
                    <td className="ps-3 fw-medium text-nowrap">{item.fecha}</td>
                    <td>
                      <span className="badge bg-secondary me-1">{item.usuario}</span>
                      <small className="text-muted">({item.rol || 'Capataz'})</small>
                    </td>
                    <td>
                      <span className="badge bg-success fs-6">+{item.avance}%</span>
                    </td>
                    <td>{item.recursos || 'N/A'}</td>
                    <td className="pe-3">{item.observaciones}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BitacoraEventos;