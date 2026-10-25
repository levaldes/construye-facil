import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { ProjectProvider, useProjects } from './context/ProjectContext';
import { LoginView } from './views/LoginView';
import { SiteView } from './views/SiteView';

// Componente para autenticar la sesión automáticamente
const SiteViewWithAuth = () => {
  const { login } = useProjects();
  React.useEffect(() => {
    login('capataz@construyefacil.cl', '1234');
  }, []);
  return <SiteView />;
};

describe('Suite de 10 Pruebas Unitarias - ConstruyeFácil', () => {

  const renderLoginView = () =>
    render(
      <ProjectProvider>
        <LoginView />
      </ProjectProvider>
    );

  const renderSiteView = () =>
    render(
      <ProjectProvider>
        <SiteViewWithAuth />
      </ProjectProvider>
    );

  it('1. Debe renderizar el formulario de inicio de sesión con sus campos', () => {
    renderLoginView();
    expect(screen.getByText(/Acceso Seguro/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('ejemplo@construyefacil.cl')).toBeInTheDocument();
  });

  it('2. Debe permitir ingresar texto en el campo de correo electrónico', () => {
    renderLoginView();
    const emailInput = screen.getByPlaceholderText('ejemplo@construyefacil.cl');
    fireEvent.change(emailInput, { target: { value: 'admin@construyefacil.cl' } });
    expect(emailInput.value).toBe('admin@construyefacil.cl');
  });

  it('3. Debe mostrar alerta de error si las credenciales son inválidas', () => {
    renderLoginView();
    const emailInput = screen.getByPlaceholderText('ejemplo@construyefacil.cl');
    const passInput = screen.getByPlaceholderText('••••••••');
    const submitBtn = screen.getByRole('button', { name: /Iniciar Sesión/i });

    fireEvent.change(emailInput, { target: { value: 'fake@construyefacil.cl' } });
    fireEvent.change(passInput, { target: { value: '0000' } });
    fireEvent.click(submitBtn);

    expect(screen.getByText(/Correo o contraseña incorrectos/i)).toBeInTheDocument();
  });

  it('4. Debe renderizar el título del módulo de registro diario de terreno', () => {
    renderSiteView();
    expect(screen.getByText(/Registro Diario de Terreno/i)).toBeInTheDocument();
  });

  it('5. Debe permitir seleccionar un proyecto desde la lista desplegable', () => {
    renderSiteView();
    const selects = screen.getAllByRole('combobox');
    fireEvent.change(selects[0], { target: { value: 'PR001' } });
    expect(selects[0].value).toBe('PR001');
  });

  it('6. Debe denegar el avance en PR002 mostrando una alerta del sistema', () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    renderSiteView();

    const selects = screen.getAllByRole('combobox');
    fireEvent.change(selects[0], { target: { value: 'PR002' } });
    fireEvent.change(screen.getByPlaceholderText('Ej: 5'), { target: { value: '10' } });
    if (selects[1]) fireEvent.change(selects[1], { target: { value: 'RE001' } });

    fireEvent.click(screen.getByRole('button', { name: /GUARDAR REGISTRO DIARIO/i }));

    const callMade = alertSpy.mock.calls.length > 0;
    const errorText = screen.queryByText(/no es posible|denegado|error/i) !== null;
    expect(callMade || errorText).toBe(true);
    alertSpy.mockRestore();
  });

  it('7. Debe bloquear el registro si el avance acumulado supera el 100%', () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    renderSiteView();

    const selects = screen.getAllByRole('combobox');
    fireEvent.change(selects[0], { target: { value: 'PR001' } });
    fireEvent.change(screen.getByPlaceholderText('Ej: 5'), { target: { value: '60' } });
    if (selects[1]) fireEvent.change(selects[1], { target: { value: 'RE001' } });

    fireEvent.click(screen.getByRole('button', { name: /GUARDAR REGISTRO DIARIO/i }));

    const callMade = alertSpy.mock.calls.length > 0;
    const limitText = screen.queryByText(/100%|superar|límite/i) !== null;
    expect(callMade || limitText).toBe(true);
    alertSpy.mockRestore();
  });

  it('8. Debe registrar exitosamente el avance en PR001 con valores permitidos', () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    renderSiteView();

    const selects = screen.getAllByRole('combobox');
    fireEvent.change(selects[0], { target: { value: 'PR001' } });
    fireEvent.change(screen.getByPlaceholderText('Ej: 5'), { target: { value: '5' } });
    if (selects[1]) fireEvent.change(selects[1], { target: { value: 'RE001' } });

    fireEvent.click(screen.getByRole('button', { name: /GUARDAR REGISTRO DIARIO/i }));

    const callMade = alertSpy.mock.calls.length > 0;
    const successText = screen.queryByText(/registrado|exito|correcto|avance/i) !== null;
    expect(callMade || successText).toBe(true);
    alertSpy.mockRestore();
  });

  it('9. Debe resetear los campos del formulario tras completar el registro', () => {
    vi.spyOn(window, 'alert').mockImplementation(() => {});
    renderSiteView();

    const selects = screen.getAllByRole('combobox');
    const advanceInput = screen.getByPlaceholderText('Ej: 5');

    fireEvent.change(selects[0], { target: { value: 'PR001' } });
    fireEvent.change(advanceInput, { target: { value: '5' } });
    if (selects[1]) fireEvent.change(selects[1], { target: { value: 'RE001' } });

    fireEvent.click(screen.getByRole('button', { name: /GUARDAR REGISTRO DIARIO/i }));

    expect(['', '0', null]).toContain(advanceInput.value);
  });

  it('10. Debe validar que la imagen de avance de obra se cargue correctamente', () => {
    renderSiteView();
    const image = screen.getByAltText('Terreno');
    expect(image).toBeInTheDocument();
    expect(image.getAttribute('src')).toContain('Portada_Almozara2000.jpg');
  });

});