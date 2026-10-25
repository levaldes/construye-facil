import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { ProjectProvider } from './context/ProjectContext';
import { SiteView } from './views/SiteView';
import { LoginView } from './views/LoginView';

describe('Suite de 10 Pruebas Unitarias - ConstruyeFácil', () => {

  const renderSiteView = () =>
    render(
      <ProjectProvider>
        <SiteView />
      </ProjectProvider>
    );

  const renderLoginView = () =>
    render(
      <ProjectProvider>
        <LoginView />
      </ProjectProvider>
    );

  // PRUEBA 1
  it('1. Debe renderizar correctamente la vista de inicio de sesión (Login)', () => {
    renderLoginView();
    expect(screen.getByText(/Acceso Seguro/i)).toBeTruthy();
    expect(screen.getByPlaceholderText('ejemplo@construyefacil.cl')).toBeTruthy();
  });

  // PRUEBA 2
  it('2. Debe permitir escribir en las entradas de correo y contraseña', () => {
    renderLoginView();
    const emailInput = screen.getByPlaceholderText('ejemplo@construyefacil.cl');
    fireEvent.change(emailInput, { target: { value: 'admin@construyefacil.cl' } });
    expect(emailInput.value).toBe('admin@construyefacil.cl');
  });

  // PRUEBA 3
  it('3. Debe mostrar mensaje de error al ingresar credenciales incorrectas', () => {
    renderLoginView();
    const emailInput = screen.getByPlaceholderText('ejemplo@construyefacil.cl');
    const passInput = screen.getByPlaceholderText('••••••••');
    const submitBtn = screen.getByRole('button', { name: /Iniciar Sesión/i });

    fireEvent.change(emailInput, { target: { value: 'error@bad.cl' } });
    fireEvent.change(passInput, { target: { value: '0000' } });
    fireEvent.click(submitBtn);

    expect(screen.getByText(/Correo o contraseña incorrectos/i)).toBeTruthy();
  });

  // PRUEBA 4
  it('4. Debe renderizar el título del módulo de terreno (Capataz)', () => {
    renderSiteView();
    expect(screen.getByText(/Registro Diario de Terreno/i)).toBeTruthy();
  });

  // PRUEBA 5
  it('5. Debe permitir seleccionar un proyecto en la vista del Capataz', () => {
    renderSiteView();
    const select = screen.getByRole('combobox', { name: /Proyecto:/i });
    fireEvent.change(select, { target: { value: 'PR001' } });
    expect(select.value).toBe('PR001');
  });

  // PRUEBA 6
  it('6. Debe denegar el avance en PR002 por restricción de sistema', () => {
    spyOn(window, 'alert');
    renderSiteView();

    fireEvent.change(screen.getByRole('combobox', { name: /Proyecto:/i }), { target: { value: 'PR002' } });
    fireEvent.change(screen.getByPlaceholderText('Ej: 5'), { target: { value: '10' } });
    fireEvent.change(screen.getByRole('combobox', { name: /Recurso Consumido:/i }), { target: { value: 'RE001' } });
    fireEvent.change(screen.getByPlaceholderText('Ej: 10'), { target: { value: '5' } });

    fireEvent.click(screen.getByRole('button', { name: /GUARDAR REGISTRO DIARIO/i }));

    expect(window.alert).toHaveBeenCalledWith('Aún no es posible realizar su avance');
  });

  // PRUEBA 7
  it('7. Debe bloquear el registro si el avance acumulado supera el 100%', () => {
    spyOn(window, 'alert');
    renderSiteView();

    fireEvent.change(screen.getByRole('combobox', { name: /Proyecto:/i }), { target: { value: 'PR001' } });
    fireEvent.change(screen.getByPlaceholderText('Ej: 5'), { target: { value: '60' } }); // 45% + 60% = 105%
    fireEvent.change(screen.getByRole('combobox', { name: /Recurso Consumido:/i }), { target: { value: 'RE001' } });
    fireEvent.change(screen.getByPlaceholderText('Ej: 10'), { target: { value: '5' } });

    fireEvent.click(screen.getByRole('button', { name: /GUARDAR REGISTRO DIARIO/i }));

    expect(window.alert).toHaveBeenCalledWith(jasmine.stringMatching(/no puede superar el 100%/i));
  });

  // PRUEBA 8
  it('8. Debe registrar exitosamente el avance de PR001 cuando los datos son válidos', () => {
    spyOn(window, 'alert');
    renderSiteView();

    fireEvent.change(screen.getByRole('combobox', { name: /Proyecto:/i }), { target: { value: 'PR001' } });
    fireEvent.change(screen.getByPlaceholderText('Ej: 5'), { target: { value: '5' } });
    fireEvent.change(screen.getByRole('combobox', { name: /Recurso Consumido:/i }), { target: { value: 'RE001' } });
    fireEvent.change(screen.getByPlaceholderText('Ej: 10'), { target: { value: '2' } });

    fireEvent.click(screen.getByRole('button', { name: /GUARDAR REGISTRO DIARIO/i }));

    expect(window.alert).toHaveBeenCalledWith(jasmine.stringMatching(/Avance diario registrado correctamente/i));
  });

  // PRUEBA 9
  it('9. Debe limpiar los campos del formulario tras un registro exitoso', () => {
    spyOn(window, 'alert');
    renderSiteView();

    const advanceInput = screen.getByPlaceholderText('Ej: 5');
    fireEvent.change(screen.getByRole('combobox', { name: /Proyecto:/i }), { target: { value: 'PR001' } });
    fireEvent.change(advanceInput, { target: { value: '5' } });
    fireEvent.change(screen.getByRole('combobox', { name: /Recurso Consumido:/i }), { target: { value: 'RE001' } });
    fireEvent.change(screen.getByPlaceholderText('Ej: 10'), { target: { value: '2' } });

    fireEvent.click(screen.getByRole('button', { name: /GUARDAR REGISTRO DIARIO/i }));

    expect(advanceInput.value).toBe('');
  });

  // PRUEBA 10
  it('10. Debe validar la presencia de la imagen referencial de terreno', () => {
    renderSiteView();
    const image = screen.getByAltText('Terreno');
    expect(image).toBeTruthy();
    expect(image.getAttribute('src')).toContain('Portada_Almozara2000.jpg');
  });

});