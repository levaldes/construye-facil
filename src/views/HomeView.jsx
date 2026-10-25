import React, { useState } from 'react';
import heroImg from '../assets/hero.jpg';

export const HomeView = ({ onSelectRole }) => {
  const [inSystem, setInSystem] = useState(false);

  if (!inSystem) {
    return (
      <div className="py-3">
        <div className="welcome-card-clean text-center my-auto py-4 px-3 rounded-5 bg-construction-hero shadow-lg border border-warning-subtle">
          <div className="mb-3">
            <span className="badge bg-warning text-dark fw-bold px-3 py-2 rounded-pill shadow-sm">
              🏗️ Plataforma de Control Operativo v2.0
            </span>
          </div>
          
          <h1 className="fw-black display-3 text-dark mb-3 tracking-tight" style={{ letterSpacing: '-1.5px' }}>
            Construye<span className="text-warning-gradient">Fácil</span>
          </h1>
          
          <p className="text-secondary fs-5 mx-auto mb-4" style={{ maxWidth: '650px', lineHeight: '1.6' }}>
            Gestión inteligente, control presupuestario en CLP y seguimiento operacional en tiempo real para la industria de la construcción.
          </p>

          <div className="mb-4 text-center">
            <div className="hero-img-wrapper d-inline-block p-2 rounded-4 bg-dark shadow-lg">
              <img 
                src={heroImg} 
                alt="ConstruyeFácil Dashboard" 
                className="img-fluid rounded-3 border border-2 border-warning"
                style={{ maxHeight: '280px', objectFit: 'cover' }}
              />
            </div>
          </div>

          <div className="row g-3 max-width-md mx-auto mb-4" style={{ maxWidth: '850px' }}>
            <div className="col-6 col-md-3">
              <div className="p-3 metric-card-construction border-blue">
                <span className="fw-bold text-primary fs-3 d-block">15+</span>
                <span className="text-dark small fw-bold">Obras activas/año</span>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="p-3 metric-card-construction border-green">
                <span className="fw-bold text-success fs-3 d-block">100%</span>
                <span className="text-dark small fw-bold">Control de costos</span>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="p-3 metric-card-construction border-orange">
                <span className="fw-bold text-warning fs-3 d-block">0 Días</span>
                <span className="text-dark small fw-bold">Desfase reportes</span>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="p-3 metric-card-construction border-teal">
                <span className="fw-bold text-info fs-3 d-block">24/7</span>
                <span className="text-dark small fw-bold">Visibilidad cliente</span>
              </div>
            </div>
          </div>

          <button 
            className="btn btn-warning btn-lg px-5 py-3 fw-bold text-dark rounded-4 shadow-sm btn-hover-construction mb-3" 
            onClick={() => setInSystem(true)}
          >
            Ingresar al Portal de Módulos →
          </button>
        </div>

        <footer className="mt-4 pt-3 border-top border-secondary-subtle text-center text-muted">
          <p className="mb-1 small">
            <strong>Equipo de Desarrollo:</strong> Leonardo Valdés • Daniel Jiménez • Demian Aguilera
          </p>
          <p className="extra-small mb-0 text-secondary">
            Mesa de Ayuda & Soporte Técnico: <a href="https://mail.google.com" target="_blank" rel="noopener noreferrer" className="text-decoration-none text-dark fw-bold">soporte@construyefacil.cl</a>
          </p>
        </footer>
      </div>
    );
  }

  return (
    <div className="py-3">
      <div className="d-flex justify-content-between align-items-center mb-4 p-3 bg-dark text-white rounded-4 shadow-sm border-start border-4 border-warning">
        <div>
          <h3 className="fw-bold mb-1 text-warning">Módulos de Acceso Operativo</h3>
          <p className="text-light small mb-0">Selecciona el perfil correspondiente para ingresar al sistema</p>
        </div>
        <button 
          className="btn btn-outline-warning rounded-pill px-4 btn-sm fw-bold shadow-sm"
          onClick={() => setInSystem(false)}
        >
          ← Volver al inicio
        </button>
      </div>
      
      <div className="row g-4 mb-4">
        <div className="col-md-6 col-lg-3">
          <div className="card card-role-construction border-primary h-100 p-4 d-flex flex-column justify-content-between shadow-sm">
            <div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="badge bg-primary text-white rounded-pill px-3 py-2 fw-bold">01</span>
                <span className="fs-2">📊</span>
              </div>
              <h5 className="fw-bold text-dark mb-2">Administrador</h5>
              <p className="text-muted small">Métricas globales, estados financieros consolidados y alertas de desviación en tiempo real.</p>
            </div>
            <button className="btn btn-primary w-100 mt-3 py-2 fw-bold rounded-3" onClick={() => onSelectRole('admin')}>
              Ingresar al Módulo
            </button>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="card card-role-construction border-warning h-100 p-4 d-flex flex-column justify-content-between shadow-sm">
            <div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="badge bg-warning text-dark rounded-pill px-3 py-2 fw-bold">02</span>
                <span className="fs-2">🏗️</span>
              </div>
              <h5 className="fw-bold text-dark mb-2">Jefe de Obra</h5>
              <p className="text-muted small">Registro diario de terreno, avance físico y consumo de insumos en tiempo real.</p>
            </div>
            <button className="btn btn-warning text-dark fw-bold w-100 mt-3 py-2 rounded-3 shadow-sm" onClick={() => onSelectRole('jefe')}>
              Ingresar al Módulo
            </button>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="card card-role-construction border-success h-100 p-4 d-flex flex-column justify-content-between shadow-sm">
            <div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="badge bg-success text-white rounded-pill px-3 py-2 fw-bold">03</span>
                <span className="fs-2">📐</span>
              </div>
              <h5 className="fw-bold text-dark mb-2">Ingeniero Civil</h5>
              <p className="text-muted small">Planificación técnica, diseño de precios unitarios (APU) y catálogo maestro.</p>
            </div>
            <button className="btn btn-success fw-bold w-100 mt-3 py-2 rounded-3 shadow-sm" onClick={() => onSelectRole('ingeniero')}>
              Ingresar al Módulo
            </button>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="card card-role-construction border-info h-100 p-4 d-flex flex-column justify-content-between shadow-sm">
            <div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="badge bg-info text-white rounded-pill px-3 py-2 fw-bold">04</span>
                <span className="fs-2">🏠</span>
              </div>
              <h5 className="fw-bold text-dark mb-2">Portal Cliente</h5>
              <p className="text-muted small">Seguimiento del progreso del proyecto, hitos de entrega y avance fotográfico.</p>
            </div>
            <button className="btn btn-info text-white fw-bold w-100 mt-3 py-2 rounded-3 shadow-sm" onClick={() => onSelectRole('cliente')}>
              Ingresar al Módulo
            </button>
          </div>
        </div>
      </div>

      <footer className="pt-3 border-top border-secondary-subtle text-center text-muted">
        <p className="mb-1 small">
          <strong>Equipo de Desarrollo:</strong> Leonardo Valdés • Daniel Jiménez • Demian Aguilera
        </p>
        <p className="extra-small mb-0 text-secondary">
          Mesa de Ayuda & Soporte Técnico: <a href="https://mail.google.com" target="_blank" rel="noopener noreferrer" className="text-decoration-none text-dark fw-bold">soporte@construyefacil.cl</a>
        </p>
      </footer>
    </div>
  );
};

export default HomeView;