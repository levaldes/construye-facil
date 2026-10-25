import React, { useState, useEffect } from 'react';
import { ProjectProvider, useProjects } from './context/ProjectContext';
import { Header } from './components/Header';
import { HomeView } from './views/HomeView';
import { LoginView } from './views/LoginView';
import { AdminView } from './views/AdminView';
import { SiteView } from './views/SiteView';
import { EngineerView } from './views/EngineerView';
import { ClientView } from './views/ClientView';

function MainApp() {
  const { user, logout } = useProjects();
  const [selectedRole, setSelectedRole] = useState(null);

  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state && event.state.role) {
        setSelectedRole(event.state.role);
      } else {
        setSelectedRole(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleSelectRole = (role) => {
    setSelectedRole(role);
    if (role) {
      window.history.pushState({ role }, '', `#${role}`);
    } else {
      window.history.pushState(null, '', window.location.pathname);
    }
  };

  if (!user) {
    if (selectedRole) {
      return (
        <div className="w-100">
          <div className="mb-3">
            <button 
              className="btn btn-outline-secondary btn-sm rounded-pill px-3 fw-bold" 
              onClick={() => handleSelectRole(null)}
            >
              ← Volver a la selección de roles
            </button>
          </div>
          <LoginView initialRole={selectedRole} />
        </div>
      );
    }

    return <HomeView onSelectRole={(role) => handleSelectRole(role)} />;
  }

  return (
    <>
      <Header userName={user.name} userRole={user.role} onLogout={logout} />
      {user.role === 'admin' && <AdminView />}
      {user.role === 'jefe' && <SiteView />}
      {user.role === 'ingeniero' && <EngineerView />}
      {user.role === 'cliente' && <ClientView />}
    </>
  );
}

export function App() {
  return (
    <ProjectProvider>
      <div className="app-viewport">
        <div className="container-lg my-auto py-4">
          <MainApp />
        </div>
      </div>
    </ProjectProvider>
  );
}

export default App;