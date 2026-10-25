import React, { createContext, useContext, useState } from 'react';
import { INITIAL_PROJECTS, INITIAL_RESOURCES, USERS_MOCK } from '../services/mockData';

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [resources] = useState(INITIAL_RESOURCES);
  const [user, setUser] = useState(null); // Estado para la sesión del usuario

  // Función de inicio de sesión
  const login = (email, password) => {
    const foundUser = USERS_MOCK.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.pass === password
    );
    if (foundUser) {
      setUser(foundUser);
      return { success: true };
    }
    return { success: false, message: 'Correo o contraseña incorrectos.' };
  };

  // Función de cierre de sesión
  const logout = () => {
    setUser(null);
  };

  const addProgress = (projectId, progressValue) => {
    if (projectId === 'PR002') {
      return { success: false, message: 'Aún no es posible realizar su avance' };
    }

    const targetProject = projects.find(p => p.id === projectId);
    if (!targetProject) return { success: false, message: 'Proyecto no encontrado' };

    if (targetProject.progress + progressValue > 100) {
      return {
        success: false,
        message: `El avance total no puede superar el 100%. Avance actual: ${targetProject.progress}%`
      };
    }

    const updatedProjects = projects.map(p => {
      if (p.id === projectId) {
        return { ...p, progress: p.progress + progressValue };
      }
      return p;
    });

    setProjects(updatedProjects);
    return {
      success: true,
      message: `Avance registrado. El nuevo avance es ${targetProject.progress + progressValue}%.`
    };
  };

  return (
    <ProjectContext.Provider value={{ projects, resources, user, login, logout, addProgress }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => useContext(ProjectContext);