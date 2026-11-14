/**
 * Sistema de Registro de Incidencias
 * Versión: v1.1.0
 * Funcionalidad: Filtrado por estado de incidencias
 */

const APP_VERSION = "v1.1.0";

document.addEventListener("DOMContentLoaded", () => {
  // Inicializar badge de versión
  const versionBadge = document.getElementById("appVersion");
  if (versionBadge) {
    versionBadge.textContent = APP_VERSION;
  }

  // Cargar incidencias existentes
  cargarIncidencias();

  // Escuchar evento de envío del formulario
  const issueForm = document.getElementById("issueForm");
  if (issueForm) {
    issueForm.addEventListener("submit", agregarIncidencia);
  }

  // Escuchar evento de cambio en el selector de filtro por estado
  const filterStatus = document.getElementById("filterStatus");
  if (filterStatus) {
    filterStatus.addEventListener("change", cargarIncidencias);
  }
});

/**
 * Obtiene la lista de incidencias almacenadas en LocalStorage
 * @returns {Array} Lista de incidencias
 */
function obtenerIncidencias() {
  const data = localStorage.getItem("incidencias");
  return data ? JSON.parse(data) : [];
}

/**
 * Guarda la lista de incidencias en LocalStorage
 * @param {Array} incidencias 
 */
function guardarIncidencias(incidencias) {
  localStorage.setItem("incidencias", JSON.stringify(incidencias));
}

/**
 * Registra una nueva incidencia a partir del formulario
 * @param {Event} e 
 */
function agregarIncidencia(e) {
  e.preventDefault();

  const titleInput = document.getElementById("title");
  const descriptionInput = document.getElementById("description");
  const priorityInput = document.getElementById("priority");
  const statusInput = document.getElementById("status");

  const title = titleInput.value;
  const description = descriptionInput.value;
  const priority = priorityInput.value;
  const status = statusInput.value;

  const nuevaIncidencia = {
    id: Date.now(),
    title: title,
    description: description,
    priority: priority,
    status: status,
    createdAt: new Date().toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  };

  const incidencias = obtenerIncidencias();
  incidencias.unshift(nuevaIncidencia); // Añadir al inicio de la lista
  guardarIncidencias(incidencias);

  // Limpiar formulario y recargar interfaz
  document.getElementById("issueForm").reset();
  cargarIncidencias();
}

/**
 * Elimina una incidencia por su ID único
 * @param {number} id 
 */
function eliminarIncidencia(id) {
  let incidencias = obtenerIncidencias();
  incidencias = incidencias.filter(item => item.id !== id);
  guardarIncidencias(incidencias);
  cargarIncidencias();
}

/**
 * Renderiza la lista de incidencias en el contenedor principal según el filtro seleccionado
 */
function cargarIncidencias() {
  const container = document.getElementById("issuesContainer");
  const totalCount = document.getElementById("totalCount");
  const filterStatus = document.getElementById("filterStatus");
  const incidencias = obtenerIncidencias();

  const estadoSeleccionado = filterStatus ? filterStatus.value : "Todas";

  const incidenciasFiltradas = estadoSeleccionado === "Todas"
    ? incidencias
    : incidencias.filter(item => item.status === estadoSeleccionado);

  if (totalCount) {
    totalCount.textContent = `Total: ${incidenciasFiltradas.length}`;
  }

  if (!container) return;

  if (incidencias.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="text-align: center; padding: 2rem; color: #64748b;">
        <p>No hay incidencias registradas en este momento.</p>
        <small>Utiliza el formulario superior para crear la primera incidencia.</small>
      </div>
    `;
    return;
  }

  if (incidenciasFiltradas.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="text-align: center; padding: 2rem; color: #64748b;">
        <p>No se encontraron incidencias con el estado "${escaparHTML(estadoSeleccionado)}".</p>
        <small>Selecciona otro estado en el filtro o registra una nueva incidencia.</small>
      </div>
    `;
    return;
  }

  container.innerHTML = incidenciasFiltradas.map(item => `
    <div class="issue-item" style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 1rem; margin-bottom: 0.75rem; background: #ffffff;">
      <div class="issue-header" style="display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem;">
        <div>
          <h3 style="margin: 0 0 0.4rem 0; font-size: 1.1rem; color: #0f172a;">${escaparHTML(item.title)}</h3>
          <p style="margin: 0 0 0.6rem 0; color: #475569; font-size: 0.95rem;">${escaparHTML(item.description)}</p>
          <div class="issue-meta" style="display: flex; gap: 0.5rem; flex-wrap: wrap; font-size: 0.8rem;">
            <span class="badge badge-prioridad-${item.priority}">Prioridad: <strong>${item.priority}</strong></span>
            <span class="badge badge-estado-${item.status.replace(/\s+/g, '_')}">Estado: <strong>${item.status}</strong></span>
            <span style="color: #64748b;">📅 ${item.createdAt}</span>
          </div>
        </div>
        <button 
          class="btn btn-danger" 
          onclick="eliminarIncidencia(${item.id})"
          style="cursor: pointer; padding: 0.35rem 0.75rem; border-radius: 4px; border: none; background: #fee2e2; color: #991b1b; font-weight: 600;"
        >
          Eliminar
        </button>
      </div>
    </div>
  `).join("");
}

/**
 * Función auxiliar para prevenir inyecciones básicas de HTML
 */
function escaparHTML(texto) {
  const div = document.createElement("div");
  div.textContent = texto;
  return div.innerHTML;
}
