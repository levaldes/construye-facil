import React from 'react';
import { ProjectProvider, useProjects } from './context/ProjectContext';
import { LoginView } from './views/LoginView';
import { AdminView } from './views/AdminView';
import { SiteView } from './views/SiteView';
import { EngineerView } from './views/EngineerView';
import { ClientView } from './views/ClientView';

function MainApp() {
  const { user } = useProjects();

  if (!user) {
    return <LoginView />;
  }

  return (
    <>
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