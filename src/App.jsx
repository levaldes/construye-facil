import React, { useState } from 'react';
import { ProjectProvider } from './context/ProjectContext';
import { Header } from './components/Header';
import { HomeView } from './views/HomeView';
import { AdminView } from './views/AdminView';
import { SiteView } from './views/SiteView';
import { EngineerView } from './views/EngineerView';
import { ClientView } from './views/ClientView';

export function App() {
  const [currentRole, setCurrentRole] = useState(null);

  return (
    <ProjectProvider>
      <div className="app-viewport">
        <div className="container-lg my-auto">
          {currentRole && (
            <Header onBack={() => setCurrentRole(null)} showBackButton={true} />
          )}

          {!currentRole && <HomeView onSelectRole={(role) => setCurrentRole(role)} />}
          {currentRole === 'admin' && <AdminView />}
          {currentRole === 'jefe' && <SiteView />}
          {currentRole === 'ingeniero' && <EngineerView />}
          {currentRole === 'cliente' && <ClientView />}
        </div>
      </div>
    </ProjectProvider>
  );
}

export default App;