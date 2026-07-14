# RidePro Web

## Accesos

- Página pública: `/index.html`
- Administración: `/admin/`
- Usuario demo: `admin`
- Contraseña demo: `admin123`

## Funciones del administrador

- Cambiar el nombre y aviso principal.
- Activar o desactivar secciones públicas.
- Agregar, editar y eliminar horarios de buses.
- Agregar, editar y eliminar servicios.
- Guardar cambios en `localStorage`.

## Uso local

Ejecuta desde la carpeta:

```bash
python -m http.server 5500
```

Abre:

- http://localhost:5500/
- http://localhost:5500/admin/

## GitHub Pages

Sube el contenido de esta carpeta a un repositorio y activa GitHub Pages desde la rama principal.

Importante: esta versión guarda ajustes en el navegador. Para que varios administradores compartan cambios y para tener seguridad real, hace falta un backend con base de datos y autenticación.
