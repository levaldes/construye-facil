export const INITIAL_PROJECTS = [
  {
    id: 'PR001',
    name: 'Edificio Residencial San Miguel',
    client: 'Inmobiliaria Sur',
    type: 'Vivienda',
    budget: '$350.000.000',
    progress: 45,
    status: 'En ejecución',
    startDate: '15 de Enero de 2026',
    lastInspection: '05 de Septiembre de 2026',
    estimatedDelivery: '30 de Octubre de 2026',
    summary: 'Se ha concluido la etapa de hormigonado en los pisos inferiores. La obra avanza conforme a la planificación prevista.'
  },
  {
    id: 'PR002',
    name: 'Ampliación Colegio Las Araucarias',
    client: 'Corporación Educacional',
    type: 'Obra civil',
    budget: '$180.000.000',
    progress: 10,
    status: 'Planificado',
    startDate: '01 de Noviembre de 2026',
    lastInspection: 'N/A',
    estimatedDelivery: '15 de Marzo de 2027',
    summary: 'En proceso de preparación de terreno y logística inicial.'
  }
];

export const INITIAL_RESOURCES = [
  { id: 'RE001', type: 'Mano de obra', description: 'Maestro de obra de primera', unit: 'Jornada', cost: '$45.000', status: 'Activo' },
  { id: 'RE002', type: 'Mano de obra', description: 'Ayudante de obra', unit: 'Jornada', cost: '$25.000', status: 'Activo' },
  { id: 'RE003', type: 'Materiales', description: 'Cemento 25kg alta resistencia', unit: 'Saco', cost: '$6.500', status: 'Activo' }
];

export const USERS_MOCK = [
  { email: 'admin@construyefacil.cl', pass: '1234', role: 'admin', name: 'Carlos Administrador' },
  { email: 'capataz@construyefacil.cl', pass: '1234', role: 'jefe', name: 'Juan Capataz' },
  { email: 'ingeniero@construyefacil.cl', pass: '1234', role: 'ingeniero', name: 'Elena Ingeniera' },
  { email: 'cliente@inmobiliariasur.cl', pass: '1234', role: 'cliente', name: 'Inmobiliaria Sur' }
];