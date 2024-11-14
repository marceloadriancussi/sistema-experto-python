# sistema-experto-python
Sistema experto en Python

### Pasos de Instalación

#### 1. Clonar el repositorio
Clona el repositorio del sistema experto a tu computadora local. Esto crea una carpeta con el proyecto.

#### 2. Configuración del Backend (FastAPI)

1. **Accede al directorio del backend** en Visual Studio Code (VSC). Asegúrate de estar en la raíz del proyecto, donde se encuentra tu archivo `main.py`.
2. Abre una terminal en VSC (Terminal > Nueva Terminal) y ejecuta el siguiente comando para iniciar el servidor backend con FastAPI:

    uvicorn main:app --reload


   Esto debería iniciar el servidor en `http://127.0.0.1:8000`. El parámetro `--reload` permite reiniciar automáticamente el servidor cada vez que realices cambios en el código.

3. Verifica en el navegador que FastAPI esté corriendo correctamente en `http://127.0.0.1:8000/docs`.

#### 3. Configuración del Frontend (React)

1. **Accede al directorio del frontend**, generalmente ubicado en `frontend/frontend` dentro de tu proyecto. Puedes hacer esto abriendo otra terminal en VSC y navegando al directorio correspondiente.

2. **Instala las dependencias de Node.js** necesarias para el proyecto. Ejecuta el siguiente comando en la terminal:

    npm install


   - Si este comando da error, es probable que **Node.js** o **npm** no estén instalados. Para instalar Node.js:
     - Descarga Node.js desde [nodejs.org](https://nodejs.org/).
     - Sigue las instrucciones de instalación y asegúrate de que Node.js esté añadido a las **variables de entorno** del sistema (Path).
   - **Verifica la instalación de Node.js** ejecutando:

     node -v
     npm -v
     

     Ambos comandos deberían mostrar un número de versión si están instalados correctamente.

3. Si **aún tienes problemas con permisos en PowerShell** al ejecutar `npm install`, ejecuta el siguiente comando en la terminal PowerShell para permitir la ejecución de scripts de manera segura:

    
    Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
    

   Luego, vuelve a ejecutar `npm install`.

4. **Inicia el servidor de desarrollo de React** en el puerto 3000 con el siguiente comando:

    npm start
    

   Esto debería iniciar el frontend en `http://localhost:3000`. Asegúrate de que este puerto no esté siendo utilizado por otra aplicación.

#### 4. Prueba de Conexión entre el Backend y el Frontend

- Asegúrate de que ambos servidores (backend en el puerto 8000 y frontend en el puerto 3000) estén ejecutándose sin errores.
- Abre `http://localhost:3000` en tu navegador para interactuar con el sistema experto a través de la interfaz del chatbot.

#### 5. Resumen de Comandos Importantes

1. Iniciar el backend de FastAPI:
   
   uvicorn main:app --reload
   

2. Instalar dependencias de React en `frontend/frontend`:
   
   npm install
   

3. Iniciar el servidor de React:
   
   npm start


Siguiendo estos pasos, deberías tener el sistema experto completamente funcional. Asegúrate de revisar cada paso para resolver posibles problemas de configuración.


Github: https://github.com/marceloadriancussi/sistema-experto-python

En la carpeta "documentation" se encuentra los detalles del proyecto.