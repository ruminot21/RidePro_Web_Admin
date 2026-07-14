# RidePro Web funcional

## Accesos
- Página pública: `/`
- Administración: `/admin/`
- Primer acceso: `admin` / `admin123`

## Funciones
- Formulario real de solicitud con validación.
- Selección de servicio y precio.
- Registro de solicitudes en el panel administrativo.
- Cambio de estado: Pendiente, Asignado, En camino, Completado o Cancelado.
- Administración de horarios, servicios, aviso y secciones visibles.
- Exportación de solicitudes a CSV.
- Copia e importación de configuración JSON.
- Cambio de usuario y contraseña.

## Ejecutar localmente
```bash
python -m http.server 5500
```
Después abre `http://localhost:5500/` y `http://localhost:5500/admin/`.

## GitHub Pages
Sube todos los archivos del ZIP a la raíz del repositorio y activa GitHub Pages.

## Importante
Esta versión funciona completamente en un navegador usando `localStorage`. En GitHub Pages los datos son locales: no se comparten entre teléfonos o computadoras. Para usuarios reales, varios administradores, mapas GPS, pagos, conductores y seguridad real se necesita un backend con base de datos y autenticación.
