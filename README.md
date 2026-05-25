# Aquinielator Frontend

Frontend del proyecto final de DAW **Aquinielator**, desarrollado con React, TypeScript, Vite, Tailwind CSS y componentes estilo neumórfico.

La aplicación permite al usuario consultar información futbolística, iniciar sesión, crear quinielas personalizadas con equipos reales de LaLiga, generar predicciones mediante el backend y guardar quinielas en su historial y favoritos.

## Tecnologías utilizadas

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- React Query
- Shadcn/Radix UI
- Framer Motion
- Lucide React

## Funcionalidades conectadas al backend

- Registro de usuarios.
- Login con JWT.
- Perfil de usuario autenticado.
- Consulta de equipos desde MySQL.
- Creación de quinielas con equipos reales.
- Generación de predicciones mediante FastAPI.
- Guardado de quinielas en historial.
- Eliminación de quinielas guardadas.
- Marcado de quinielas como favoritas.
- Listado y eliminación de favoritos.

## Variables de entorno

Crear un archivo `.env` en la raíz del frontend:

```env
VITE_API_URL=http://localhost:8000
