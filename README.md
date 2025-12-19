Incident Manager

## Descripción del proyecto

> Incident Manager es una aplicación web que permite gestionar incidentes en el ámbito de telecomunicaciones, habilitando la visualizacion de estadísticas, monitorear el estado de los incidentes y administrar la información relevante.

## Stack utilizado

- **Frontend:** React 19 con TypeScript
- **HTTP** Axios & React query
- **Gestión de estado:** Zustand
- **UI:** Material-UI (MUI)
- **Build:** Vite
- **Gráficos:** Chart.js y ReactDOM
- **Calidad de código y commits:**
  - ESLint
  - Prettier
  - Husky + lint-staged
  - Commitlint (Conventional Commits)

## Estructura del proyecto

El proyecto sigue una **arquitectura basada en features**, organizada dentro del folder `src` de la siguiente manera:

- **api/**: Interceptores y helpers para interactuar con el backend (axios).
- **assets/**: Recursos estéticos para la app.
- **features/**: Componentes y hooks agrupados por funcionalidad, por ejemplo:
  - `login/` → componentes para autenticación.
  - `dashboard/` → dashboard principal y visualización de estadísticas.
  - `incidents/` → gestión de incidentes, creación, detalle y edición.
- **models/**: Definiciones de tipos e interfaces TypeScript para el proyecto.
- **shared/**: Componentes reutilizables y utilidades comunes, como botones, chips o loading indicators.
- **store/**: Estado global manejado con Zustand (ej. `authStore`, `incidentStore`).

> Esta estructura facilita el escalado del proyecto y mantiene la lógica relacionada agrupada, haciendo más simple la navegación y el mantenimiento del código

## Instrucciones para correr el proyecto localmente

1. Clonar el repositorio:

   > git clone <url-del-repositorio>
   > cd <nombre-del-proyecto>

2. Instalar dependencias en carpeta root del proyecto corriendo el comando:

   > npm install

3. Correr aplicación local con el comando:
   > npm run dev

4: Abrir el browser en http://localhost:5173

## Autenticación con login

> El sistema de autenticación funciona mediante **username y password** enviados al endpoint de login del backend. El flujo completo es el siguiente:

1. El usuario ingresa sus credenciales en el formulario de login.
2. Se realiza una solicitud al endpoint `/login` del backend.
3. El backend responde con un **token Bearer** si las credenciales son correctas.
4. Este token se almacena en la store de Zustand.
5. Se utiliza un **interceptor de Axios** para adjuntar automáticamente el token a cada solicitud al backend, haciendo que todas las llamadas sean autenticadas.
6. Las rutas protegidas en la aplicación solo son accesibles si el usuario está autenticado.

## Deployment!

El proyecto se despliega automáticamente a la web mediante **GitHub Actions**.  
Cada vez que se hace un **push a la rama `main`**, la acción se encarga de:

1. Instalar dependencias.
2. Construir la aplicación con Vite.
3. Publicar los archivos generados en GitHub Pages.

> Esto permite que la versión en producción siempre esté actualizada con los últimos cambios de `main`.

## Convenciones de commits (Commitlint)

El proyecto utiliza **Commitlint** junto con **Conventional Commits** para mantener un historial de commits limpio y consistente.  
El formato general de los commits es:

- **tipo**: describe el tipo de cambio. Ejemplos:
  - `feat` → nueva funcionalidad
  - `fix` → corrección de bug
  - `chore` → cambios en herramientas, scripts o configuraciones
  - `docs` → documentación
  - `refactor` → refactorización de código
- **scope** (opcional): área del proyecto afectada, por ejemplo `login`, `dashboard`, `incidents`.
- **mensaje**: descripción corta y clara del cambio.

> Ejemplos de commits válido:
> **feat(login): agregar validación de email en el formulario**
> **feat: agregar validación para incident forms**
