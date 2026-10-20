import React, { createContext, useContext, useState } from 'react';
import { INITIAL_PROJECTS, INITIAL_RESOURCES } from '../services/mockData';

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [resources] = useState(INITIAL_RESOURCES);

  const addProgress = (projectId, progressValue) => {
    if (projectId === 'PR002') {
      return { success: false, message: 'Aún no es posible realizar su avance' };
    }

    const targetProject = projects.find(p => p.id === projectId);
    if (!targetProject) {
      return { success: false, message: 'Proyecto no encontrado' };
    }

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
    const newProgress = targetProject.progress + progressValue;
    return {
      success: true,
      message: `Avance diario registrado correctamente. El avance total del proyecto aumentó al ${newProgress}%.`
    };
  };

  return (
    <ProjectContext.Provider value={{ projects, resources, addProgress }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => useContext(ProjectContext);