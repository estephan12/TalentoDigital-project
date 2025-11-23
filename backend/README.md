# Backend - Landing SPA

Instrucciones rápidas para configurar y asegurar el backend localmente.

1) Variables de entorno

 - Copia `backend/.env.example` a `backend/.env` y añade valores reales:

```
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.xxx.mongodb.net/<dbname>
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:3000
JWT_SECRET=mi_valor_secreto_largo
ADMIN_USER=admin@example.com
ADMIN_PASS=un_password_seguro
```

2) Rotar credenciales (Atlas)

- Si la URI actualmente en `.env` fue comprometida, entra a MongoDB Atlas y crea un nuevo usuario o cambia la contraseña del usuario actual. Actualiza `MONGO_URI` con la nueva contraseña.

3) Autenticación admin

- Endpoint para obtener token JWT (8h): `POST /api/auth/login` con JSON `{ "user": "...", "pass": "..." }`.
- Usa el token en `Authorization: Bearer <token>` para las rutas administrativas de mensajes.

**Registro de admin (solo una vez)**

- Puedes crear un admin en la base de datos usando el endpoint `POST /api/auth/register`.
- Para proteger el registro, debes enviar la cabecera `x-admin-token` (o campo `adminToken` en el body) con el valor definido en `ADMIN_TOKEN` dentro de tu `.env`.
- Ejemplo (curl):

```
curl -X POST http://localhost:5000/api/auth/register \
	-H "Content-Type: application/json" \
	-H "x-admin-token: tu_admin_token" \
	-d '{"email":"admin@example.com","password":"YourStrongPass123"}'
```

Después de crear el admin, usa `POST /api/auth/login` con `user` y `pass` para obtener un JWT.

4) Seguridad aplicadas

- `helmet` para cabeceras de seguridad.
- `express-rate-limit` aplicado globalmente y específicamente al endpoint de contacto para evitar spam.
- `express-validator` para validar/sanitizar campos del formulario de contacto.
- Rutas administrativas protegidas por JWT.

5) Desarrollo

Instalar dependencias y arrancar servidor en modo desarrollo:

```bash
cd backend
npm install
npm run dev
```

6) Buenas prácticas

- No subir `.env` al repositorio. Añadir secretos al sistema de CI/CD o variables del host.
- Rotar las credenciales si sospechas exposición.
- Habilitar backups y monitoreo en Atlas.
