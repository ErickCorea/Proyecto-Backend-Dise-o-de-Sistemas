# Especificación de Endpoints - API Soldado de la Cruz

## Documentación Interactiva
- **Swagger UI:** `http://localhost:3000/api`

## Módulos Principales
1. **Autenticación (`/auth`)**
   - `POST /auth/login`: Validación de credenciales y generación de token JWT.
2. **Usuarios (`/users`)**
   - `POST /users`: Registro de nuevos usuarios.
   - `GET /users`: Listado de usuarios registrados (Ruta protegida con Bearer Token).
   - `GET /users/:id`: Búsqueda de usuario por ID.
   - `PATCH /users/:id`: Actualización de datos de usuario.
   - `DELETE /users/:id`: Eliminación de usuario.