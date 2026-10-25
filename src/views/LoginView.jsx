import React, { useState } from 'react';
import { useProjects } from '../context/ProjectContext';

export const LoginView = ({ initialRole }) => {
  const { login } = useProjects();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const roleEmails = {
    admin: 'admin@construyefacil.cl',
    jefe: 'capataz@construyefacil.cl',
    ingeniero: 'ingeniero@construyefacil.cl',
    cliente: 'cliente@inmobiliariasur.cl'
  };

  const getRoleLabel = (role) => {
    switch (role) {
      case 'admin': return 'Administrador';
      case 'jefe': return 'Jefe de Obra';
      case 'ingeniero': return 'Ingeniero Civil';
      case 'cliente': return 'Portal Cliente';
      default: return role;
    }
  };

  const getRoleBadgeStyle = (role) => {
    switch (role) {
      case 'admin':
        return 'bg-primary text-white';
      case 'jefe':
        return 'bg-warning text-dark';
      case 'ingeniero':
        return 'bg-success text-white';
      case 'cliente':
        return 'bg-info text-white';
      default:
        return 'bg-secondary text-white';
    }
  };

  const getRoleButtonStyle = (role) => {
    switch (role) {
      case 'admin':
        return 'btn-primary';
      case 'jefe':
        return 'btn-warning text-dark';
      case 'ingeniero':
        return 'btn-success';
      case 'cliente':
        return 'btn-info text-white';
      default:
        return 'btn-primary';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (initialRole && roleEmails[initialRole]) {
      const allowedEmail = roleEmails[initialRole];

      if (email.trim().toLowerCase() !== allowedEmail.toLowerCase()) {
        setError(`Acceso restringido: Este portal es exclusivo para el rol de "${getRoleLabel(initialRole)}". Utiliza el correo autorizado para este módulo.`);
        return;
      }
    }

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
            <span className={`badge fw-bold px-3 py-2 rounded-pill small mb-2 ${getRoleBadgeStyle(initialRole)}`}>
              Módulo: {getRoleLabel(initialRole) || 'General'}
            </span>
            <h3 className="fw-bold text-dark">ConstruyeFácil</h3>
            <p className="text-muted small">Ingresa las credenciales correspondientes a este portal</p>
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

            <button type="submit" className={`btn w-100 py-2 fw-bold rounded-3 mt-2 ${getRoleButtonStyle(initialRole)}`}>
              Iniciar Sesión
            </button>
          </form>

          <div className="mt-4 pt-3 border-top">
            <p className="text-muted extra-small mb-1 fw-bold">Credenciales de prueba (Clave: 1234):</p>
            <ul className="text-muted extra-small ps-3 mb-0">
              <li>Admin: <code>admin@construyefacil.cl</code></li>
              <li>Capataz/Jefe: <code>capataz@construyefacil.cl</code></li>
              <li>Ingeniero: <code>ingeniero@construyefacil.cl</code></li>
              <li>Cliente: <code>cliente@inmobiliariasur.cl</code></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginView;