import React from 'react';
import { ProjectProvider, useProjects } from './context/ProjectContext';
import { Header } from './components/Header';
import { LoginView } from './views/LoginView';
import { AdminView } from './views/AdminView';
import { SiteView } from './views/SiteView';
import { EngineerView } from './views/EngineerView';
import { ClientView } from './views/ClientView';

function MainApp() {
  const { user, logout } = useProjects();

  if (!user) {
    return <LoginView />;
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