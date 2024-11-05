# sistema-experto-python
Sistema experto en Python

## ARCHIVO MAIN.Py


El código crea una API REST con FastAPI para un sistema experto que clasifica delitos. La API permite cargar una base de conocimientos (/base/cargar), iniciar una consulta (/consultar/iniciar), y procesar respuestas de usuarios (/consultar/responder). La lógica principal de inferencia reside en el motor (engine), que contiene las reglas y estructuras necesarias para el razonamiento.





## Instalación

Utilizar [`pipenv`](https://pipenv.pypa.io)

```bash
pipenv install
```

## Ejecutar

```bash
pipenv run main.py
```
