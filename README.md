# Documentación de Uso - StarWars API

## Descripción

La StarWars API permite consultar información de la Saga de Star Wars, incluyendo detalles sobre planetas, películas, personajes, especies, naves y vehículos. Además, ofrece la capacidad de crear nuevos personajes y visualizar los personajes creados por la comunidad.

## Endpoints

### Consultar Información

#### Planetas

- **Obtener Planeta por ID:**
  [GET /planetas/{id}](https://ori6o78k20.execute-api.us-east-1.amazonaws.com/dev/planetas/{id})
  
  Ejemplo de uso:
  [GET https://ori6o78k20.execute-api.us-east-1.amazonaws.com/dev/planetas/1](https://ori6o78k20.execute-api.us-east-1.amazonaws.com/dev/planetas/1)

#### Películas

- **Obtener Película por ID:**
  [GET /peliculas/{id}](https://ori6o78k20.execute-api.us-east-1.amazonaws.com/dev/peliculas/{id})
  
  Ejemplo de uso:
  [GET https://ori6o78k20.execute-api.us-east-1.amazonaws.com/dev/peliculas/1](https://ori6o78k20.execute-api.us-east-1.amazonaws.com/dev/peliculas/1)

#### Personas

- **Obtener Persona por ID:**
  [GET /personas/{id}](https://ori6o78k20.execute-api.us-east-1.amazonaws.com/dev/personas/{id})
  
  Ejemplo de uso:
  [GET https://ori6o78k20.execute-api.us-east-1.amazonaws.com/dev/personas/1](https://ori6o78k20.execute-api.us-east-1.amazonaws.com/dev/personas/1)

#### Especies

- **Obtener Especie por ID:**
  [GET /especies/{id}](https://ori6o78k20.execute-api.us-east-1.amazonaws.com/dev/especies/{id})
  
  Ejemplo de uso:
  [GET https://ori6o78k20.execute-api.us-east-1.amazonaws.com/dev/especies/1](https://ori6o78k20.execute-api.us-east-1.amazonaws.com/dev/especies/1)

#### Naves

- **Obtener Nave por ID:**
  [GET /naves/{id}](https://ori6o78k20.execute-api.us-east-1.amazonaws.com/dev/naves/{id})
  
  Ejemplo de uso:
  [GET https://ori6o78k20.execute-api.us-east-1.amazonaws.com/dev/naves/9](https://ori6o78k20.execute-api.us-east-1.amazonaws.com/dev/naves/1)

#### Vehículos

- **Obtener Vehículo por ID:**
  [GET /vehiculos/{id}](https://ori6o78k20.execute-api.us-east-1.amazonaws.com/dev/vehiculos/{id})
  
  Ejemplo de uso:
  [GET https://ori6o78k20.execute-api.us-east-1.amazonaws.com/dev/vehiculos/4](https://ori6o78k20.execute-api.us-east-1.amazonaws.com/dev/vehiculos/1)

### Operaciones Adicionales

#### Personajes

- **Obtener todos los Personajes:**
  [GET /personajes](https://ori6o78k20.execute-api.us-east-1.amazonaws.com/dev/personajes)

#### Crear Personaje

- **Registrar un nuevo Personaje:**
  [POST /registrar-personaje](https://ori6o78k20.execute-api.us-east-1.amazonaws.com/dev/registrar-personaje)

  Ejemplo de cuerpo de la solicitud (en formato JSON):
  ```json
  {
    "name": "Nombre del Personaje",
    "last_name": "Apellido del Personaje",
    "edad": "Edad del Personaje"
  }
