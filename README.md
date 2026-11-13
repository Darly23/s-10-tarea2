# Sistema de Registro de Incidencias 🛠️

> **Asignatura:** Gestión de la Configuración del Software  
> **Unidad 3:** Gestión de la construcción y despliegue continuo  
> **Tema 3:** Despliegue continuo  
> **Caso de Estudio:** Sistema web para el registro, control y seguimiento de incidencias de software.

---

## 📌 1. Descripción del Proyecto
Esta aplicación web permite a los equipos de desarrollo y soporte técnico registrar, organizar y hacer seguimiento a las incidencias reportadas por los usuarios. 

El proyecto simula el ciclo de vida real de un software mediante un proceso formal de **Gestión de la Configuración del Software (SCM)**, aplicando:
* Control de versiones distribuido con **Git** y **GitHub**.
* Estrategia de colaboración basada en ramas (`branches`) y revisiones de código mediante **Pull Requests (PR)**.
* Nomenclatura de versiones bajo el estándar de **Versionamiento Semántico (SemVer - MAJOR.MINOR.PATCH)**.
* Automatización del ciclo de validación y despliegue continuo (**CI/CD**) hacia **GitHub Pages** mediante **GitHub Actions**.
* Proceso formal de **Mejora Continua** a través del seguimiento y resolución de incidencias (**Issues**).

---

## 👥 2. Integrantes del Equipo y Roles

| Integrante | Rol en SCM | Rama Principal Asignada | Responsabilidades |
| :--- | :--- | :--- | :--- |
| **Darly (Líder)** | Líder de SCM & Release Manager | `main` / `docs/configuracion-inicial` | Arquitectura base, administración de repositorio, merge de PRs y Release `v1.0.0`. |
| **Francisco** | Diseñador UI/UX & Frontend | `feature/estilos-ui-ux` | Diseño visual responsive, paleta cromática, componentes tarjeta y badges en `style.css`. |
| **Danilo** | Ingeniero DevOps & CI/CD | `feature/automatizacion-ci-cd` | Flujo de integración y despliegue continuo en GitHub Actions hacia GitHub Pages. |
| **Gabriel** | Desarrollador de Features | `feature/filtro-por-estado` | Implementación de filtros dinámicos por estado, contadores reactivos y Release `v1.1.0`. |
| **Hernan** | Control de Calidad (QA) & Bugfix | `bugfix/validacion-incidencias-vacias` | Reporte de Issue #1, validación con trim, corrección de errores y Release `v1.1.1`. |

---

## 🏷️ 3. Plan de Versiones (Versionamiento Semántico - SemVer)

El desarrollo del software sigue la nomenclatura `MAJOR.MINOR.PATCH`:

* **`v1.0.0` (Versión Inicial):**
  * Formulario de registro de incidencias (título, descripción, prioridad y estado inicial).
  * Listado en tiempo real con fecha de registro.
  * Almacenamiento persistente en el navegador del cliente mediante `localStorage`.
  * Capacidad de eliminar incidencias.

* **`v1.1.0` (Nueva Funcionalidad - MINOR):**
  * Incorporación de control interactivo para filtrar incidencias según su estado (`Todas`, `Abierta`, `En progreso`, `Resuelta`).
  * Conteo dinámico de incidencias visibles en pantalla.

* **`v1.1.1` (Corrección de Error - PATCH):**
  * Solución al Issue reportado: sanitización de entradas de texto e imposibilidad de registrar incidencias con campos vacíos o sólo espacios en blanco.
  * Mensajes de validación y confirmación al usuario.

---

## 🚀 4. Instrucciones para Ejecución Local

Para clonar y ejecutar este proyecto en tu entorno local no se requiere instalar servidores ni bases de datos complejas:

```bash
# 1. Clonar el repositorio
git clone https://github.com/Darly23/s-10-tarea2.git

# 2. Entrar a la carpeta del proyecto
cd s-10-tarea2

# 3. Abrir en tu navegador web preferido
# En Windows puedes ejecutar:
start index.html
# O simplemente haz doble clic en el archivo index.html
```

---

## 🌐 5. Despliegue en Producción (CI/CD)

La aplicación cuenta con un flujo automatizado de integración y despliegue continuo configurado con **GitHub Actions**:
* Cada vez que se fusiona un cambio en la rama `main`, se ejecuta una suite de validación de integridad.
* Al ser exitosa, se compila y publica automáticamente en **GitHub Pages**.

🔗 **URL Pública de la Aplicación:** [https://darly23.github.io/s-10-tarea2/](https://darly23.github.io/s-10-tarea2/)
