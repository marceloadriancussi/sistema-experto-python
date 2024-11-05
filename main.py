# Importación de módulos necesarios de FastAPI y otros paquetes
from fastapi import FastAPI, HTTPException  # Importa FastAPI y HTTPException para crear y manejar la aplicación y los errores.
from fastapi.middleware.cors import CORSMiddleware  # Permite habilitar el CORS para las solicitudes entre distintos dominios.
from pydantic import BaseModel  # Define estructuras de datos para validación automática.
from acciones import engine  # Importa el motor de inferencia definido en otro archivo (`acciones`).
from experto_general.response import Response  # Importa `Response`, que contiene posibles respuestas del sistema experto.

# Inicialización de la aplicación FastAPI
app = FastAPI()

# Configuración del middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Permite las solicitudes desde el frontend en localhost:3000.
    allow_credentials=True,  # Habilita las credenciales en las solicitudes CORS.
    allow_methods=["*"],  # Permite todos los métodos HTTP (GET, POST, etc.).
    allow_headers=["*"],  # Permite todos los encabezados HTTP.
)

# Modelos de datos definidos con Pydantic
class FilenameRequest(BaseModel):
    filename: str  # Define la estructura de un archivo JSON a cargar, que incluye el nombre del archivo.

class UserResponse(BaseModel):
    response: bool  # Define la estructura de la respuesta del usuario: `True` para "Sí", `False` para "No".

# Endpoint para cargar la base de conocimientos desde un archivo JSON
@app.post("/base/cargar")
async def cargar_base(request: FilenameRequest):
    try:
        # Carga el archivo de la base de conocimientos en el motor usando el nombre de archivo proporcionado.
        engine.base.from_json(request.filename)
        return {"message": "Base de conocimientos cargada exitosamente"}
    except Exception as e:
        # Si ocurre un error, lanza una excepción con el mensaje de error.
        raise HTTPException(status_code=500, detail=str(e))

# Endpoint para iniciar una consulta con el sistema experto
@app.get("/consultar/iniciar")
async def iniciar_consulta():
    # Inicia el generador de preguntas en el motor.
    engine.questions = engine.generate()
    return siguiente_pregunta()  # Llama a la función `siguiente_pregunta` para obtener la primera pregunta.

# Endpoint para procesar la respuesta del usuario y obtener la siguiente pregunta
@app.post("/consultar/responder")
async def responder_pregunta(request: UserResponse):
    # Verifica si se ha iniciado una consulta previa.
    if not hasattr(engine, 'questions'):
        raise HTTPException(status_code=400, detail="La consulta no ha sido iniciada. Llame primero a /consultar/iniciar.")

    # Configura la respuesta del usuario en el motor de inferencia.
    engine.set_response(Response.YES if request.response else Response.NO)
    return siguiente_pregunta()  # Llama a la función `siguiente_pregunta` para continuar la consulta.

# Función auxiliar para obtener la siguiente pregunta o el resultado final
def siguiente_pregunta():
    try:
        # Intenta obtener la siguiente pregunta del generador de preguntas.
        pregunta = next(engine.questions)
        if pregunta:  # Si se obtiene una pregunta, la devuelve en formato JSON.
            return {"pregunta": f"¿{pregunta.name}?"}
        else:  # Si no hay más preguntas, devuelve el resultado final.
            resultado = engine.get_result()
            if resultado:  # Si se obtiene un resultado, devuelve los detalles del delito clasificado.
                return {
                    "resultado": f"Delito clasificado: {resultado.name}",#devuelve elnombre del Delito
                    "descripcion": resultado.description, # Proporciona una descripción adicional del delito clasificado.
                    "propiedades": [prop.name for prop in resultado.properties] # Lista todas las propiedades o características asociadas con el delito clasificado.
                }
            else:  # Si no hay coincidencias, indica que no se encontró ningún resultado.
                return {"resultado": "No se encontró ninguna coincidencia"}
    except StopIteration:
        # Si se han agotado todas las preguntas, indica que no hay coincidencias.
        return {"resultado": "No se encontró ninguna coincidencia"}
