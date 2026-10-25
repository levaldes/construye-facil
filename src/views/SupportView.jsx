import React, { useState } from 'react';

export const SupportView = () => {
  const [enviado, setEnviado] = useState(false);

  const [formData, setFormData] = useState({
    asunto: 'excel',
    mensaje: ''
  });

  // envio formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.mensaje.trim()) return;
    
    setEnviado(true);
    setFormData({ asunto: 'excel', mensaje: '' });
    setTimeout(() => {
      setEnviado(false);
    }, 5000);
  };

  return (
    <div className="card shadow-sm p-4 border-0">
      <h4 className="text-primary fw-bold mb-3 d-flex align-items-center gap-2">
        <span></span> Soporte Técnico y Asistencia
      </h4>
      <p className="text-muted small mb-4">
        Canal directo para la resolución de requerimientos e incidencias dentro de la plataforma <strong>ConstruyeFácil</strong>.
      </p>

      <div className="row g-4">
        <div className="col-md-5">
          <div className="border rounded-3 p-3 bg-light h-100">
            <h6 className="fw-bold text-dark mb-3">📍 Contacto Directo</h6>

            <div className="mb-3">
              <small className="text-muted d-block fw-bold mb-1">Correo de Soporte</small>
              <a href="mailto:soporte@construyefacil.cl" className="fw-bold text-primary text-decoration-none">
                soporte@construyefacil.cl
              </a>
            </div>

            <div>
              <small className="text-muted d-block fw-bold mb-1">Atención de Consultas</small>
              <span className="small text-secondary">
                Monitoreo continuo durante la jornada operativa de obra.
              </span>
            </div>
          </div>
        </div>

        {/* form requerimiento */}
        <div className="col-md-7">
          <div className="border rounded-3 p-3 bg-white h-100">
            <h6 className="fw-bold text-dark mb-3">✉️ Enviar Requerimiento</h6>

            {enviado && (
              <div className="alert alert-success py-2 small fw-bold">
                ✓ Se ha enviado el correo a soporte. A la brevedad nos pondremos en contacto para resolver tu requerimiento.
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label small fw-bold">Tipo de Requerimiento</label>
                <select 
                  className="form-select form-select-sm"
                  value={formData.asunto}
                  onChange={(e) => setFormData({ ...formData, asunto: e.target.value })}
                >
                  <option value="excel">Sincronización y Descarga de Planillas Excel</option>
                  <option value="usuario">Gestión de Acceso y Permisos de Usuario</option>
                  <option value="partidas">Parametrización de Precios y APU</option>
                  <option value="otro">Consulta Técnica General</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label small fw-bold">Detalle del Requerimiento</label>
                <textarea 
                  className="form-control form-control-sm"
                  rows="4"
                  placeholder="Describe brevemente la consulta o la incidencia detectada..."
                  value={formData.mensaje}
                  onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary btn-sm fw-bold w-100">
                Enviar Solicitud
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportView;