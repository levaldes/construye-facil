/**
 * Lee un archivo .xlsx seleccionado por el usuario y devuelve los datos como json
 */
import * as XLSX from 'xlsx';

// guardar archivo xls
const guardarExcel = (datos, nombreArchivo) => {
  if (!datos || datos.length === 0) {
    alert('No hay datos disponibles para exportar.');
    return;
  }

  const hoja = XLSX.utils.json_to_sheet(datos);
  const libro = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(libro, hoja, 'Datos');
  
  XLSX.writeFile(libro, `${nombreArchivo}.xlsx`);
};

// export admin
export const exportAdminConsolidated = (listaProyectos = []) => {
  const data = listaProyectos.map(p => ({
    'Código': p.id,
    'Proyecto': p.name,
    'Cliente': p.client,
    'Tipo': p.type || 'Edificación',
    'Presupuesto': p.budget,
    'Avance %': `${p.progress}%`,
    'Estado': p.status
  }));

  guardarExcel(data, 'Reporte_Consolidado_Proyectos');
};
export const exportarProyectosAdmin = exportAdminConsolidated;

// export ing
export const exportEngineerAPU = (listaRecursos = []) => {
  const data = listaRecursos.map(r => ({
    'Código': r.id,
    'Tipo': r.type,
    'Descripción': r.description,
    'Unidad': r.unit,
    'Costo Unitario': r.cost,
    'Estado': r.status
  }));

  guardarExcel(data, 'Catalogo_Precios_APU');
};
export const exportarPreciosAPU = exportEngineerAPU;

// export client
export const exportClientStateOfPayment = (proyecto) => {
  if (!proyecto) return;

  const data = [{
    'Código': proyecto.id,
    'Proyecto': proyecto.name,
    'Cliente': proyecto.client,
    'Avance Físico': `${proyecto.progress}%`,
    'Fecha Inicio': proyecto.startDate || 'N/A',
    'Entrega Estimada': proyecto.estimatedDelivery || 'N/A'
  }];

  guardarExcel(data, `Estado_De_Pago_${proyecto.id}`);
};
export const exportarEstadoPagoCliente = exportClientStateOfPayment;