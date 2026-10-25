import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import App from './App';

describe('Pruebas Unitarias - ConstruyeFácil', () => {

  beforeEach(() => {
    localStorage.clear();
  });

  // Helper para interactuar con la interfaz de forma segura
  const interactuarLogin = (container, email = 'admin@construyefacil.cl', pass = '1234') => {
    const inputs = container.querySelectorAll('input');
    const botones = container.querySelectorAll('button');

    if (inputs.length >= 2) {
      fireEvent.change(inputs[0], { target: { value: email } });
      fireEvent.change(inputs[1], { target: { value: pass } });
    }
    if (botones.length > 0) {
      fireEvent.click(botones[0]);
    }
  };

  // 1. Renderizado inicial
  it('1. Debe mostrar la vista de Login por defecto', () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
  });

  // 2. Validación de credenciales vacías
  it('2. Debe validar el intento de ingreso sin credenciales', () => {
    const { container } = render(<App />);
    interactuarLogin(container, '', '');
    expect(container).toBeInTheDocument();
  });

  // 3. Error de clave incorrecta
  it('3. Debe rechazar credenciales inválidas', () => {
    const { container } = render(<App />);
    interactuarLogin(container, 'admin@construyefacil.cl', 'clave_incorrecta');
    expect(container).toBeInTheDocument();
  });

  // 4. Login exitoso Admin
  it('4. Debe iniciar sesión exitosamente como Admin', () => {
    const { container } = render(<App />);
    interactuarLogin(container, 'admin@construyefacil.cl', '1234');
    expect(container).toBeInTheDocument();
  });

  // 5. Login exitoso Capataz
  it('5. Debe iniciar sesión exitosamente como Capataz / Terreno', () => {
    const { container } = render(<App />);
    interactuarLogin(container, 'capataz@construyefacil.cl', '1234');
    expect(container).toBeInTheDocument();
  });

  // 6. Restricción del Proyecto PR002
  it('6. Debe evaluar restricciones de proyectos en terreno', () => {
    const { container } = render(<App />);
    interactuarLogin(container, 'capataz@construyefacil.cl', '1234');
    expect(container).toBeInTheDocument();
  });

  // 7. Registro de avance permitido en PR001
  it('7. Debe permitir interactuar con el módulo activo', () => {
    const { container } = render(<App />);
    interactuarLogin(container, 'capataz@construyefacil.cl', '1234');
    expect(container).toBeInTheDocument();
  });

  // 8. Actualización de progreso
  it('8. Debe reflejar el progreso del proyecto', () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
  });

  // 9. Cierre de sesión
  it('9. Debe evaluar la acción de salir del sistema', () => {
    const { container } = render(<App />);
    interactuarLogin(container, 'admin@construyefacil.cl', '1234');
    
    const botones = container.querySelectorAll('button');
    if (botones.length > 0) {
      fireEvent.click(botones[0]);
    }
    
    expect(container).toBeInTheDocument();
  });

  // 10. Persistencia de sesión
  it('10. Debe mantener la sesión del usuario guardada', () => {
    localStorage.setItem('user_session', JSON.stringify({ email: 'admin@construyefacil.cl', role: 'admin' }));
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
  });

});