# Bibliotecas frontend

Interfaz Angular del parcial de desarrollo web. Separa componentes, modelos e integración HTTP siguiendo el repositorio de referencia: https://github.com/Desarrollo-Web-PUJ/frontend.

## Ejecutar

Requiere Node.js 24 LTS y npm. Desde esta carpeta:

```powershell
npm ci
npm start
```

Abre `http://localhost:4200`. Ejecuta el backend por separado en el puerto 18080 para registrar bibliotecas y consultar sus libros.

La URL del backend está en `src/environments/environment.ts`. El backend admite el origen del frontend en el puerto 4200 mediante CORS. Los mismos comandos npm sirven en Windows, Linux y macOS.

## Funcionalidades

- Formulario de biblioteca con nombre, dirección y ciudad obligatorios. Envía `POST /bibliotecas`, muestra confirmación y limpia los campos cuando el registro tiene éxito.
- Tabla con título, autor, año y biblioteca correspondiente. Los datos provienen exclusivamente de `GET /bibliotecas` y de su colección anidada `libros`.
- Estados de carga, respuesta vacía y error de conexión, con opción de reintentar la consulta.

Los libros de ejemplo se inicializan y persisten en el backend. Una nueva biblioteca comienza sin libros; al registrarla no se crean libros adicionales.

## Organización

| Carpeta | Contenido |
| --- | --- |
| `src/app/models` | Interfaces Biblioteca, BibliotecaRegistro y Libro. |
| `src/app/services` | BibliotecaService para GET y POST. |
| `src/app/components/biblioteca-form` | Formulario de registro. |
| `src/app/components/libros-tabla` | Tabla de libros y su biblioteca. |

## Compilación

```powershell
npm run build
```

La compilación de producción queda en `dist/bibliotecas-frontend/browser` y se puede servir con un servidor de archivos estáticos. La aplicación no usa rutas adicionales.
