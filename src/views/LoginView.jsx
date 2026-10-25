import React, { useState } from 'react';
import { useProjects } from '../context/ProjectContext';

export const LoginView = () => {
  const { login } = useProjects();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(email, password);
    if (!result.success) {
      setError(result.message);
    }
  };

  return (
    <div className="row justify-content-center my-5">
      <div className="col-md-6 col-lg-5">
        <div className="card border-0 shadow-lg p-4 rounded-4 bg-white">
          <div className="text-center mb-4">
            <span className="badge bg-primary-subtle text-primary fw-bold px-3 py-2 rounded-pill small mb-2">
              Acceso Seguro
            </span>
            <h3 className="fw-bold text-dark">ConstruyeFácil</h3>
            <p className="text-muted small">Ingresa tus credenciales para acceder a tu módulo</p>
          </div>

          {error && <div className="alert alert-danger py-2 small text-center">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-bold small">Correo Electrónico:</label>
              <input
                type="email"
                className="form-control py-2"
                placeholder="ejemplo@construyefacil.cl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold small">Contraseña:</label>
              <input
                type="password"
                className="form-control py-2"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100 py-2 fw-bold rounded-3 mt-2">
              Iniciar Sesión
            </button>
          </form>

          <div className="mt-4 pt-3 border-top">
            <p className="text-muted extra-small mb-1 fw-bold">Credenciales de prueba (Clave: 1234):</p>
            <ul className="text-muted extra-small ps-3 mb-0">
              <li>Admin: <code>admin@construyefacil.cl</code></li>
              <li>Capataz: <code>capataz@construyefacil.cl</code></li>
              <li>Ingeniero: <code>ingeniero@construyefacil.cl</code></li>
              <li>Cliente: <code>cliente@inmobiliariasur.cl</code></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};