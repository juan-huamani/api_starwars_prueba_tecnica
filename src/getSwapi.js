'use strict';

const axios = require('axios');

const traducciones = {
  "films": {
    "title": "titulo",
    "episode_id": "numero_episodio",
    "opening_crawl": "apertura",
    "director": "director",
    "producer": "productor",
    "release_date": "fecha_estreno",
    "characters": "personajes",
    "planets": "planetas",
    "starships": "nave_espaciales",
    "vehicles": "vehiculos",
    "species": "especies",
    "created": "creado",
    "edited": "editado",
    "url": "url"
  },
  "people": {
    "name": "nombre",
    "height": "altura",
    "mass": "masa",
    "hair_color": "color_pelo",
    "skin_color": "color_piel",
    "eye_color": "color_ojos",
    "birth_year": "año_nacimiento",
    "gender": "genero",
    "homeworld": "planeta_natal",
    "films": "peliculas",
    "species": "especies",
    "vehicles": "vehiculos",
    "starships": "naves",
    "created": "creado",
    "edited": "editado",
    "url": "url"
  },
  "planets": {
    "name": "nombre",
    "rotation_period": "periodo_rotacion",
    "orbital_period": "periodo_orbital",
    "diameter": "diametro",
    "climate": "clima",
    "gravity": "gravedad",
    "terrain": "terreno",
    "surface_water": "agua_superficial",
    "population": "poblacion",
    "residents": "residentes",
    "films": "peliculas",
    "created": "creado",
    "edited": "editado",
    "url": "url"
  },
  "species": {
    "name": "nombre",
    "classification": "clasificacion",
    "designation": "designacion",
    "average_height": "altura_promedio",
    "skin_colors": "colores_de_piel",
    "hair_colors": "colores_de_cabello",
    "eye_colors": "colores_de_ojos",
    "average_lifespan": "esperanza_de_vida_promedio",
    "homeworld": "planeta_natal",
    "language": "lengua",
    "people": "personas",
    "films": "peliculas",
    "created": "creado",
    "edited": "editado",
    "url": "url"
  },
  "starships": {
    "name": "nombre",
    "model": "modelo_o_nombre_oficial",
    "starship_class": "clase_de_nave_espacial",
    "manufacturer": "fabricante_s",
    "cost_in_credits": "costo_en_creditos_galácticos",
    "length": "longitud_en_metros",
    "crew": "tripulación_requerida",
    "passengers": "pasajeros_no_esenciales",
    "max_atmosphering_speed": "velocidad_máxima_en_atmósfera",
    "hyperdrive_rating": "clase_de_hiperimpulsor",
    "MGLT": "distancia_máxima_en_Megalights_por_hora_estándar",
    "cargo_capacity": "capacidad_máxima_de_carga_en_kilogramos",
    "consumables": "duración_máxima_de_los_consumibles_para_la_tripulación",
    "films": "películas_en_las_que_aparece",
    "pilots": "pilotos_que_la_han_tripulado",
    "url": "URL_del_recurso",
    "created": "fecha_de_creación",
    "edited": "fecha_de_edición"
  },
  "vehicles":{
    "name": "nombre",
    "model": "modelo_o_nombre_oficial",
    "vehicle_class": "clase_del_vehiculo",
    "manufacturer": "fabricante_s",
    "length": "longitud_en_metros",
    "cost_in_credits": "costo_en_creditos_galácticos",
    "crew": "tripulación_requerida",
    "passengers": "pasajeros_no_esenciales",
    "max_atmosphering_speed": "velocidad_máxima_en_atmósfera",
    "cargo_capacity": "capacidad_máxima_de_carga_en_kilogramos",
    "consumables": "duración_máxima_de_los_consumibles_para_la_tripulación",
    "films": "películas_en_las_que_aparece",
    "pilots": "pilotos_que_la_han_tripulado",
    "url": "URL_del_recurso",
    "created": "creado",
    "edited": "editado"
  }
};

const traducirAtributos = (tipoObjeto, objetoOriginal) => {
  const traduccionesObjeto = traducciones[tipoObjeto];
  if (!traduccionesObjeto) {
    // Si no hay traducciones definidas para el tipo de objeto, retornar el objeto original.
    return objetoOriginal;
  }

  const objetoTraducido = {};

  for (const atributo in objetoOriginal) {
    const propiedadTraducida = traduccionesObjeto[atributo];
    if (propiedadTraducida) {
      objetoTraducido[propiedadTraducida] = objetoOriginal[atributo];
    } else {
      objetoTraducido[atributo] = objetoOriginal[atributo];
    }
  }

  return objetoTraducido;
};

const getPlanetById = async (id) => {
  const response = await axios.get(`https://swapi.py4e.com/api/planets/${id}`);
  const planetaOriginal = response.data;
  
  const planetaTraducido = traducirAtributos("planets", planetaOriginal);
  
  return planetaTraducido;
};

const getSpecieById = async (id) => {
  const response = await axios.get(`https://swapi.py4e.com/api/species/${id}`);
  const especieOriginal = response.data;
  
  const especieTraducido = traducirAtributos("species", especieOriginal);
  
  return especieTraducido;
};

const getPeopleById = async (id) => {
  const response = await axios.get(`https://swapi.py4e.com/api/people/${id}`);
  const personaOriginal = response.data;
  
  const personaTraducido = traducirAtributos("people", personaOriginal);
  
  return personaTraducido;
};

const getFilmById = async (id) => {
  const response = await axios.get(`https://swapi.py4e.com/api/films/${id}`);
  const peliculaOriginal = response.data;
  
  const peliculaTraducido = traducirAtributos("films", peliculaOriginal);
  
  return peliculaTraducido;
};

const getStarshipById = async (id) => {
  const response = await axios.get(`https://swapi.py4e.com/api/starships/${id}`);
  const naveOriginal = response.data;
  
  const naveTraducido = traducirAtributos("starships", naveOriginal);
  
  return naveTraducido;
};

const getVehicleById = async (id) => {
  const response = await axios.get(`https://swapi.py4e.com/api/vehicles/${id}`);
  const vehiculoOriginal = response.data;
  
  const vehiculoTraducido = traducirAtributos("vehicles", vehiculoOriginal);
  
  return vehiculoTraducido;
};

module.exports.getPlanet = async (event) => {
  try {
    const planetId = event.pathParameters ? event.pathParameters.id : null;

    if (!planetId) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          mensaje: 'ID del planeta no proporcionado',
        }),
      };
    }

    const planeta = await getPlanetById(planetId);

    return {
      statusCode: 200,
      body: JSON.stringify({
        planeta: planeta,
        input: event,
      }),
    };
  } catch (error) {
    console.error('Error al obtener datos del planeta:', error);

    // Maneja diferentes tipos de errores
    if (error.response && error.response.status === 404) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          mensaje: 'Planeta no encontrado',
          error: error.message,
        }),
      };
    } else if (error.response && error.response.status) {
      return {
        statusCode: error.response.status,
        body: JSON.stringify({
          mensaje: 'Error al obtener datos del planeta',
          error: error.message,
        }),
      };
    } else {
      return {
        statusCode: 500,
        body: JSON.stringify({
          mensaje: 'Error interno del servidor',
          error: error.message,
        }),
      };
    }
  }
};

module.exports.getFilm = async (event) => {
  try {
    const filmId = event.pathParameters ? event.pathParameters.id : null;

    if (!filmId) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          mensaje: 'ID de la película no proporcionado',
        }),
      };
    }

    const pelicula = await getFilmById(filmId);

    return {
      statusCode: 200,
      body: JSON.stringify({
        pelicula: pelicula,
        input: event,
      }),
    };
  } catch (error) {
    console.error('Error al obtener datos de la Pelicula:', error);

    // Maneja diferentes tipos de errores
    if (error.response && error.response.status === 404) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          mensaje: 'Pelicula no encontrado',
          error: error.message,
        }),
      };
    } else if (error.response && error.response.status) {
      return {
        statusCode: error.response.status,
        body: JSON.stringify({
          mensaje: 'Error al obtener datos de la Pelicula',
          error: error.message,
        }),
      };
    } else {
      return {
        statusCode: 500,
        body: JSON.stringify({
          mensaje: 'Error interno del servidor',
          error: error.message,
        }),
      };
    }
  }
};

module.exports.getPeople = async (event) => {
  try {
    const peopleId = event.pathParameters ? event.pathParameters.id : null;

    if (!peopleId) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          mensaje: 'ID de la Persona no proporcionado',
        }),
      };
    }

    const persona = await getPeopleById(peopleId);

    return {
      statusCode: 200,
      body: JSON.stringify({
        persona: persona,
        input: event,
      }),
    };
  } catch (error) {
    console.error('Error al obtener datos de la Persona:', error);

    // Maneja diferentes tipos de errores
    if (error.response && error.response.status === 404) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          mensaje: 'Persona no encontrado',
          error: error.message,
        }),
      };
    } else if (error.response && error.response.status) {
      return {
        statusCode: error.response.status,
        body: JSON.stringify({
          mensaje: 'Error al obtener datos de la Persona',
          error: error.message,
        }),
      };
    } else {
      return {
        statusCode: 500,
        body: JSON.stringify({
          mensaje: 'Error interno del servidor',
          error: error.message,
        }),
      };
    }
  }
};

module.exports.getSpecie = async (event) => {
  try {
    const specieId = event.pathParameters ? event.pathParameters.id : null;

    if (!specieId) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          mensaje: 'ID de la Especie no proporcionado',
        }),
      };
    }

    const especie = await getSpecieById(specieId);

    return {
      statusCode: 200,
      body: JSON.stringify({
        especie: especie,
        input: event,
      }),
    };
  } catch (error) {
    console.error('Error al obtener datos de la Especie:', error);

    // Maneja diferentes tipos de errores
    if (error.response && error.response.status === 404) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          mensaje: 'Especie no encontrado',
          error: error.message,
        }),
      };
    } else if (error.response && error.response.status) {
      return {
        statusCode: error.response.status,
        body: JSON.stringify({
          mensaje: 'Error al obtener datos de la Especie',
          error: error.message,
        }),
      };
    } else {
      return {
        statusCode: 500,
        body: JSON.stringify({
          mensaje: 'Error interno del servidor',
          error: error.message,
        }),
      };
    }
  }
};

module.exports.getStarship = async (event) => {
  try {
    const starshipId = event.pathParameters ? event.pathParameters.id : null;

    if (!starshipId) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          mensaje: 'ID de la Nave no proporcionado',
        }),
      };
    }

    const nave = await getStarshipById(starshipId);

    return {
      statusCode: 200,
      body: JSON.stringify({
        nave: nave,
        input: event,
      }),
    };
  } catch (error) {
    console.error('Error al obtener datos de la Nave:', error);

    // Maneja diferentes tipos de errores
    if (error.response && error.response.status === 404) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          mensaje: 'Nave no encontrado',
          error: error.message,
        }),
      };
    } else if (error.response && error.response.status) {
      return {
        statusCode: error.response.status,
        body: JSON.stringify({
          mensaje: 'Error al obtener datos de la Nave',
          error: error.message,
        }),
      };
    } else {
      return {
        statusCode: 500,
        body: JSON.stringify({
          mensaje: 'Error interno del servidor',
          error: error.message,
        }),
      };
    }
  }
};

module.exports.getVehicle = async (event) => {
  try {
    const vehicleId = event.pathParameters ? event.pathParameters.id : null;

    if (!vehicleId) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          mensaje: 'ID del vehiculo no proporcionado',
        }),
      };
    }

    const vehiculo = await getVehicleById(vehicleId);

    return {
      statusCode: 200,
      body: JSON.stringify({
        vehiculo: vehiculo,
        input: event,
      }),
    };
  } catch (error) {
    console.error('Error al obtener datos del vehiculo:', error);

    // Maneja diferentes tipos de errores
    if (error.response && error.response.status === 404) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          mensaje: 'Vehiculo no encontrado',
          error: error.message,
        }),
      };
    } else if (error.response && error.response.status) {
      return {
        statusCode: error.response.status,
        body: JSON.stringify({
          mensaje: 'Error al obtener datos del vehiculo',
          error: error.message,
        }),
      };
    } else {
      return {
        statusCode: 500,
        body: JSON.stringify({
          mensaje: 'Error interno del servidor',
          error: error.message,
        }),
      };
    }
  }
};