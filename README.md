# Print Server

Servidor de impresión para un hospital.

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/Dazaiyan/Print-Server.git
   cd Print-Server
   ```

2. Instala las dependencias del backend:
   ```bash
   cd BackEnd
   npm install
   ```

3. Instala las dependencias del frontend:
   ```bash
   cd ../frontend
   npm install
   ```

## Configuración

1. Crea un archivo `.env` en el directorio `BackEnd` y agrega las siguientes variables de entorno:
   ```env
   DB_USER=tu_usuario
   DB_PASS=tu_contraseña
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=nombre_base_datos
   JWT_SECRET=tu_secreto_jwt
   NODE_ENV=development
   ```

2. Asegúrate de tener una base de datos PostgreSQL configurada y ejecuta las migraciones para crear las tablas necesarias:
   ```bash
   cd BackEnd
   npm run migrate
   ```

## Ejecución

1. Inicia el backend:
   ```bash
   cd BackEnd
   npm run dev
   ```

2. En una terminal separada, inicia el frontend:
   ```bash
   cd frontend
   npm start
   ```

## Uso

1. Abre tu navegador web y ve a `http://localhost:5001` para acceder a la interfaz de usuario.
2. Inicia sesión con tus credenciales.
3. Sube archivos PDF para imprimir, selecciona la configuración deseada y envía el trabajo de impresión.

## Comandos Útiles

### Backend

- **Iniciar el servidor de desarrollo**: `npm run dev`
- **Ejecutar migraciones**: `npm run migrate`

### Frontend

- **Iniciar el servidor de desarrollo**: `npm start`

## Creación de Impresoras Virtuales

Para crear impresoras virtuales en CUPS, usa los siguientes comandos:

```bash
# Crear una impresora virtual genérica PDF
lpadmin -p VirtualPrinter -E -v pdf:/tmp/VirtualPrinter -m drv:///sample.drv/generic.ppd

# Crear una impresora virtual financiera
lpadmin -p VirtualPrinterFinanciero -E -v socket://172.20.31.61 -m everywhere

# Crear una impresora virtual TICS
lpadmin -p VirtualPrinterTICS -E -v socket://172.20.31.61 -m everywhere
```

## Administración de Impresiones

Para administrar y monitorear impresiones con CUPS:

1. Accede a la interfaz web de CUPS en `http://localhost:631`.
2. Navega a la sección "Printers" para ver las impresoras configuradas y sus trabajos.
3. Desde aquí, puedes pausar, reanudar o cancelar trabajos de impresión, así como configurar opciones adicionales para cada impresora.

## Anexos

- Capturas de pantalla de la interfaz de usuario.
- Código relevante de configuraciones y controladores.
- Ejemplos de comandos utilizados para la configuración y administración del servidor de impresión.

## Conclusión

Este proyecto de servidor de impresión proporciona una solución eficiente para la gestión de trabajos de impresión en un entorno hospitalario. Incluye una interfaz web amigable para los usuarios y funcionalidades robustas para la administración de impresoras y trabajos de impresión. Futuras mejoras podrían incluir la integración con otros sistemas hospitalarios y la implementación de notificaciones para los usuarios sobre el estado de sus trabajos de impresión.
