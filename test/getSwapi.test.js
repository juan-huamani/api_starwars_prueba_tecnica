'use strict';

const axios = require('axios');
const { getPlanet, getFilm, getPeople, getSpecie, getStarship, getVehicle } = require('../src/getSwapi'); 

jest.mock('axios');

describe('getPlanet', () => {
  it('debería traducir atributos y devolver el planeta traducido', async () => {
    const mockEvent = {
      pathParameters: { id: '1' },
    };

    const mockPlanetaOriginal = {
      name: 'Tatooine',
      rotation_period: '23',
      orbital_period: '304',
      diameter: '10465',
      climate: 'arid',
      gravity: '1 standard',
      terrain: 'desert',
      surface_water: '1',
      population: '200000',
      residents: ['Luke Skywalker', 'C-3PO', 'Darth Vader'],
      films: ['A New Hope', 'The Phantom Menace'],
      created: '2023-01-01T00:00:00Z',
      edited: '2023-01-01T00:00:00Z',
      url: 'https://swapi.py4e.com/api/planets/1/',
    };

    const mockResponse = {
      statusCode: 200,
      body: JSON.stringify({
        planeta: {
          nombre: 'Tatooine',
          periodo_rotacion: '23',
          periodo_orbital: '304',
          diametro: '10465',
          clima: 'arid',
          gravedad: '1 standard',
          terreno: 'desert',
          agua_superficial: '1',
          poblacion: '200000',
          residentes: ['Luke Skywalker', 'C-3PO', 'Darth Vader'],
          peliculas: ['A New Hope', 'The Phantom Menace'],
          creado: '2023-01-01T00:00:00Z',
          editado: '2023-01-01T00:00:00Z',
          url: 'https://swapi.py4e.com/api/planets/1/',
        },
        input: mockEvent,
      }),
    };

    axios.get.mockResolvedValueOnce({ data: mockPlanetaOriginal });

    const result = await getPlanet(mockEvent);
    expect(result).toEqual(mockResponse);
  });

  it('debería manejar el caso de error 404 correctamente', async () => {
    const mockEvent = {
      pathParameters: { id: '1' },
    };
  
    const mockErrorMessage = 'Planeta no encontrado';
  
    // Simular una respuesta de error 404
    axios.get.mockRejectedValueOnce({
      response: {
        status: 404,
        data: { mensaje: mockErrorMessage },
      },
    });
  
    const result = await getPlanet(mockEvent);
  
    // Verificar que la respuesta coincida con la respuesta esperada
    expect(result).toEqual({
      statusCode: 404,
      body: JSON.stringify({
        mensaje: mockErrorMessage,
        error: undefined, // En este caso, el error no debería estar definido
      }),
    });
  });

  it('debería manejar otros casos de error correctamente', async () => {
    const mockEvent = {
      pathParameters: { id: '1' },
    };
  
    const mockErrorMessage = 'Error al obtener datos del planeta';
  
    // Simular una respuesta de error con un código de estado diferente a 404
    axios.get.mockRejectedValueOnce({
      response: {
        status: 500, // Cualquier código de estado diferente a 404
        data: { mensaje: mockErrorMessage },
      },
    });
  
    const result = await getPlanet(mockEvent);
  
    // Verificar que la respuesta coincida con la respuesta esperada
    expect(result).toEqual({
      statusCode: 500,
      body: JSON.stringify({
        mensaje: mockErrorMessage,
        error: undefined, // En este caso, el error no debería estar definido
      }),
    });
  });
  
  it('debería realizar la petición a la API con el ID del planeta', async () => {
    const mockEvent = {
      pathParameters: { id: '1' },
    };

    // Espiar la función axios.get para verificar que se llame con la URL correcta
    const axiosGetSpy = jest.spyOn(axios, 'get');
    const expectedUrl = 'https://swapi.py4e.com/api/planets/1';
    
    // Simular una respuesta exitosa de la API con código de estado 200
    axios.get.mockResolvedValueOnce({ data: {} });

    await getPlanet(mockEvent);

    // Verificar que axios.get se llamó con la URL esperada
    expect(axiosGetSpy).toHaveBeenCalledWith(expectedUrl);
    
    // Restaurar la implementación original de axios.get después de la prueba
    axiosGetSpy.mockRestore();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
});

describe('getFilm', () => {
  it('debería traducir atributos y devolver la película traducida', async () => {
    const mockEvent = {
      pathParameters: { id: '1' },
    };

    const mockPeliculaOriginal = {
      title: 'A New Hope',
      episode_id: 4,
      opening_crawl: 'It is a period of civil war...',
      director: 'George Lucas',
      producer: 'Gary Kurtz, Rick McCallum',
      release_date: '1977-05-25',
      characters: ['Luke Skywalker', 'Princess Leia'],
      planets: ['Tatooine', 'Alderaan'],
      starships: ['X-wing', 'TIE Fighter'],
      vehicles: ['Millennium Falcon', 'Imperial Speeder Bike'],
      species: ['Human', 'Wookiee'],
      created: '2023-01-01T00:00:00Z',
      edited: '2023-01-01T00:00:00Z',
      url: 'https://swapi.py4e.com/api/films/1/',
    };

    const mockResponse = {
      statusCode: 200,
      body: JSON.stringify({
        pelicula: {
          titulo: 'A New Hope',
          numero_episodio: 4,
          apertura: 'It is a period of civil war...',
          director: 'George Lucas',
          productor: 'Gary Kurtz, Rick McCallum',
          fecha_estreno: '1977-05-25',
          personajes: ['Luke Skywalker', 'Princess Leia'],
          planetas: ['Tatooine', 'Alderaan'],
          nave_espaciales: ['X-wing', 'TIE Fighter'],
          vehiculos: ['Millennium Falcon', 'Imperial Speeder Bike'],
          especies: ['Human', 'Wookiee'],
          creado: '2023-01-01T00:00:00Z',
          editado: '2023-01-01T00:00:00Z',
          url: 'https://swapi.py4e.com/api/films/1/',
        },
        input: mockEvent,
      }),
    };

    axios.get.mockResolvedValueOnce({ data: mockPeliculaOriginal });

    const result = await getFilm(mockEvent);
    expect(result).toEqual(mockResponse);
  });

  it('debería realizar la petición a la API con el ID de la película', async () => {
    const mockEvent = {
      pathParameters: { id: '1' },
    };

    // Espiar la función axios.get para verificar que se llame con la URL correcta
    const axiosGetSpy = jest.spyOn(axios, 'get');
    const expectedUrl = 'https://swapi.py4e.com/api/films/1';

    // Simular una respuesta exitosa de la API con código de estado 200
    axios.get.mockResolvedValueOnce({ data: {} });

    await getFilm(mockEvent);

    // Verificar que axios.get se llamó con la URL esperada
    expect(axiosGetSpy).toHaveBeenCalledWith(expectedUrl);

    // Restaurar la implementación original de axios.get después de la prueba
    axiosGetSpy.mockRestore();
  });

  it('debería manejar el caso de error 404 correctamente', async () => {
    const mockEvent = {
      pathParameters: { id: '1' },
    };
  
    const mockErrorMessage = 'Pelicula no encontrado';
  
    // Simular una respuesta de error 404
    axios.get.mockRejectedValueOnce({
      response: {
        status: 404,
        data: { mensaje: mockErrorMessage },
      },
    });
  
    const result = await getFilm(mockEvent);
  
    // Verificar que la respuesta coincida con la respuesta esperada
    expect(result).toEqual({
      statusCode: 404,
      body: JSON.stringify({
        mensaje: mockErrorMessage,
        error: undefined, // En este caso, el error no debería estar definido
      }),
    });
  });
  
  it('debería manejar otros casos de error correctamente', async () => {
    const mockEvent = {
      pathParameters: { id: '1' },
    };
  
    const mockErrorMessage = 'Error al obtener datos de la Pelicula';
  
    // Simular una respuesta de error con un código de estado diferente a 404
    axios.get.mockRejectedValueOnce({
      response: {
        status: 500, // Cualquier código de estado diferente a 404
        data: { mensaje: mockErrorMessage },
      },
    });
  
    const result = await getFilm(mockEvent);
  
    // Verificar que la respuesta coincida con la respuesta esperada
    expect(result).toEqual({
      statusCode: 500,
      body: JSON.stringify({
        mensaje: mockErrorMessage,
        error: undefined, // En este caso, el error no debería estar definido
      }),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});

describe('getPeople', () => {
  it('debería traducir atributos y devolver la persona traducida', async () => {
    const mockEvent = {
      pathParameters: { id: '1' },
    };

    const mockPersonaOriginal = {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '19 BBY',
      gender: 'male',
      homeworld: 'Tatooine',
      films: ['A New Hope', 'The Empire Strikes Back'],
      species: ['Human'],
      vehicles: ['T-16 Skyhopper'],
      starships: ['X-wing'],
      created: '2023-01-01T00:00:00Z',
      edited: '2023-01-01T00:00:00Z',
      url: 'https://swapi.py4e.com/api/people/1/',
    };

    const mockResponse = {
      statusCode: 200,
      body: JSON.stringify({
        persona: {
          nombre: 'Luke Skywalker',
          altura: '172',
          masa: '77',
          color_pelo: 'blond',
          color_piel: 'fair',
          color_ojos: 'blue',
          año_nacimiento: '19 BBY',
          genero: 'male',
          planeta_natal: 'Tatooine',
          peliculas: ['A New Hope', 'The Empire Strikes Back'],
          especies: ['Human'],
          vehiculos: ['T-16 Skyhopper'],
          naves: ['X-wing'],
          creado: '2023-01-01T00:00:00Z',
          editado: '2023-01-01T00:00:00Z',
          url: 'https://swapi.py4e.com/api/people/1/',
        },
        input: mockEvent,
      }),
    };

    axios.get.mockResolvedValueOnce({ data: mockPersonaOriginal });

    const result = await getPeople(mockEvent);
    expect(result).toEqual(mockResponse);
  });

  it('debería realizar la petición a la API con el ID de la persona', async () => {
    const mockEvent = {
      pathParameters: { id: '1' },
    };

    // Espiar la función axios.get para verificar que se llame con la URL correcta
    const axiosGetSpy = jest.spyOn(axios, 'get');
    const expectedUrl = 'https://swapi.py4e.com/api/people/1';

    // Simular una respuesta exitosa de la API con código de estado 200
    axios.get.mockResolvedValueOnce({ data: {} });

    await getPeople(mockEvent);

    // Verificar que axios.get se llamó con la URL esperada
    expect(axiosGetSpy).toHaveBeenCalledWith(expectedUrl);

    // Restaurar la implementación original de axios.get después de la prueba
    axiosGetSpy.mockRestore();
  });

  it('debería manejar el caso de error 404 correctamente', async () => {
    const mockEvent = {
      pathParameters: { id: '1' },
    };
  
    const mockErrorMessage = 'Persona no encontrado';
  
    // Simular una respuesta de error 404
    axios.get.mockRejectedValueOnce({
      response: {
        status: 404,
        data: { mensaje: mockErrorMessage },
      },
    });
  
    const result = await getPeople(mockEvent);
  
    // Verificar que la respuesta coincida con la respuesta esperada
    expect(result).toEqual({
      statusCode: 404,
      body: JSON.stringify({
        mensaje: mockErrorMessage,
        error: undefined, // En este caso, el error no debería estar definido
      }),
    });
  });
  
  it('debería manejar otros casos de error correctamente', async () => {
    const mockEvent = {
      pathParameters: { id: '1' },
    };
  
    const mockErrorMessage = 'Error al obtener datos de la Persona';
  
    // Simular una respuesta de error con un código de estado diferente a 404
    axios.get.mockRejectedValueOnce({
      response: {
        status: 500, // Cualquier código de estado diferente a 404
        data: { mensaje: mockErrorMessage },
      },
    });
  
    const result = await getPeople(mockEvent);
  
    // Verificar que la respuesta coincida con la respuesta esperada
    expect(result).toEqual({
      statusCode: 500,
      body: JSON.stringify({
        mensaje: mockErrorMessage,
        error: undefined, // En este caso, el error no debería estar definido
      }),
    });
  });

  // Limpiar todos los mocks después de cada prueba
  afterEach(() => {
    jest.clearAllMocks();
  });
});

describe('getSpecie', () => {
  it('debería traducir atributos y devolver la especie traducida', async () => {
    const mockEvent = {
      pathParameters: { id: '1' },
    };

    const mockSpecieOriginal = {
      name: 'Wookiee',
      classification: 'Mammal',
      designation: 'Sentient',
      average_height: '210',
      skin_colors: 'gray',
      hair_colors: 'black, brown',
      eye_colors: 'blue, green, yellow, brown, golden, red',
      average_lifespan: '400',
      language: 'Shyriiwook',
      homeworld: 'Kashyyyk',
      people: ['Chewbacca', 'Tarfful'],
      films: ['A New Hope', 'The Empire Strikes Back'],
      created: '2023-01-01T00:00:00Z',
      edited: '2023-01-01T00:00:00Z',
      url: 'https://swapi.py4e.com/api/species/1/',
    };

    const mockResponse = {
      statusCode: 200,
      body: JSON.stringify({
        especie: {
          nombre: 'Wookiee',
          clasificacion: 'Mammal', // Sin traducción
          designacion: 'Sentient', // Sin traducción
          altura_promedio: '210',
          colores_de_piel: 'gray',
          colores_de_cabello: 'black, brown',
          colores_de_ojos: 'blue, green, yellow, brown, golden, red',
          esperanza_de_vida_promedio: '400',
          lengua: 'Shyriiwook',
          planeta_natal: 'Kashyyyk',
          personas: ['Chewbacca', 'Tarfful'],
          peliculas: ['A New Hope', 'The Empire Strikes Back'],
          creado: '2023-01-01T00:00:00Z',
          editado: '2023-01-01T00:00:00Z',
          url: 'https://swapi.py4e.com/api/species/1/',
        },
        input: mockEvent,
      }),
    };

    axios.get.mockResolvedValueOnce({ data: mockSpecieOriginal });

    const result = await getSpecie(mockEvent);
    expect(result).toEqual(mockResponse);
  });

  it('debería realizar la petición a la API con el ID de la especie', async () => {
    const mockEvent = {
      pathParameters: { id: '1' },
    };

    // Espiar la función axios.get para verificar que se llame con la URL correcta
    const axiosGetSpy = jest.spyOn(axios, 'get');
    const expectedUrl = 'https://swapi.py4e.com/api/species/1';

    // Simular una respuesta exitosa de la API con código de estado 200
    axios.get.mockResolvedValueOnce({ data: {} });

    await getSpecie(mockEvent);

    // Verificar que axios.get se llamó con la URL esperada
    expect(axiosGetSpy).toHaveBeenCalledWith(expectedUrl);

    // Restaurar la implementación original de axios.get después de la prueba
    axiosGetSpy.mockRestore();
  });

  it('debería manejar el caso de error 404 correctamente', async () => {
    const mockEvent = {
      pathParameters: { id: '1' },
    };
  
    const mockErrorMessage = 'Especie no encontrado';
  
    // Simular una respuesta de error 404
    axios.get.mockRejectedValueOnce({
      response: {
        status: 404,
        data: { mensaje: mockErrorMessage },
      },
    });
  
    const result = await getSpecie(mockEvent);
  
    // Verificar que la respuesta coincida con la respuesta esperada
    expect(result).toEqual({
      statusCode: 404,
      body: JSON.stringify({
        mensaje: mockErrorMessage,
        error: undefined, // En este caso, el error no debería estar definido
      }),
    });
  });
  
  it('debería manejar otros casos de error correctamente', async () => {
    const mockEvent = {
      pathParameters: { id: '1' },
    };
  
    const mockErrorMessage = 'Error al obtener datos de la Especie';
  
    // Simular una respuesta de error con un código de estado diferente a 404
    axios.get.mockRejectedValueOnce({
      response: {
        status: 500, // Cualquier código de estado diferente a 404
        data: { mensaje: mockErrorMessage },
      },
    });
  
    const result = await getSpecie(mockEvent);
  
    // Verificar que la respuesta coincida con la respuesta esperada
    expect(result).toEqual({
      statusCode: 500,
      body: JSON.stringify({
        mensaje: mockErrorMessage,
        error: undefined, // En este caso, el error no debería estar definido
      }),
    });
  });

  // Limpiar todos los mocks después de cada prueba
  afterEach(() => {
    jest.clearAllMocks();
  });
});

describe('getStarship', () => {
  it('debería traducir atributos y devolver la nave espacial traducida', async () => {
    const mockEvent = {
      pathParameters: { id: '1' },
    };

    const mockStarshipOriginal = {
      name: 'X-wing',
      model: 'T-65 X-wing',
      manufacturer: 'Incom Corporation',
      cost_in_credits: '149999',
      length: '12.5',
      max_atmosphering_speed: '1050',
      crew: '1',
      passengers: '0',
      cargo_capacity: '110',
      consumables: '1 week',
      hyperdrive_rating: '1.0',
      starship_class: 'Starfighter',
      pilots: ['Luke Skywalker', 'Wedge Antilles'],
      films: ['A New Hope', 'The Empire Strikes Back'],
      created: '2023-01-01T00:00:00Z',
      edited: '2023-01-01T00:00:00Z',
      url: 'https://swapi.py4e.com/api/starships/1/',
    };

    const mockResponse = {
      statusCode: 200,
      body: JSON.stringify({
        nave: {
          nombre: 'X-wing',
          modelo_o_nombre_oficial: 'T-65 X-wing',
          fabricante_s: 'Incom Corporation',
          costo_en_creditos_galácticos: '149999',
          longitud_en_metros: '12.5',
          velocidad_máxima_en_atmósfera: '1050',
          tripulación_requerida: '1',
          pasajeros_no_esenciales: '0',
          capacidad_máxima_de_carga_en_kilogramos: '110',
          duración_máxima_de_los_consumibles_para_la_tripulación: '1 week',
          clase_de_hiperimpulsor: '1.0',
          clase_de_nave_espacial: 'Starfighter',
          pilotos_que_la_han_tripulado: ['Luke Skywalker', 'Wedge Antilles'],
          películas_en_las_que_aparece: ['A New Hope', 'The Empire Strikes Back'],
          fecha_de_creación: '2023-01-01T00:00:00Z',
          fecha_de_edición: '2023-01-01T00:00:00Z',
          URL_del_recurso: 'https://swapi.py4e.com/api/starships/1/',
        },
        input: mockEvent,
      }),
    };

    axios.get.mockResolvedValueOnce({ data: mockStarshipOriginal });

    const result = await getStarship(mockEvent);
    expect(result).toEqual(mockResponse);
  });

  it('debería realizar la petición a la API con el ID de la nave espacial', async () => {
    const mockEvent = {
      pathParameters: { id: '1' },
    };

    // Espiar la función axios.get para verificar que se llame con la URL correcta
    const axiosGetSpy = jest.spyOn(axios, 'get');
    const expectedUrl = 'https://swapi.py4e.com/api/starships/1';

    // Simular una respuesta exitosa de la API con código de estado 200
    axios.get.mockResolvedValueOnce({ data: {} });

    await getStarship(mockEvent);

    // Verificar que axios.get se llamó con la URL esperada
    expect(axiosGetSpy).toHaveBeenCalledWith(expectedUrl);

    // Restaurar la implementación original de axios.get después de la prueba
    axiosGetSpy.mockRestore();
  });

  it('debería manejar el caso de error 404 correctamente', async () => {
    const mockEvent = {
      pathParameters: { id: '1' },
    };
  
    const mockErrorMessage = 'Nave no encontrado';
  
    // Simular una respuesta de error 404
    axios.get.mockRejectedValueOnce({
      response: {
        status: 404,
        data: { mensaje: mockErrorMessage },
      },
    });
  
    const result = await getStarship(mockEvent);
  
    // Verificar que la respuesta coincida con la respuesta esperada
    expect(result).toEqual({
      statusCode: 404,
      body: JSON.stringify({
        mensaje: mockErrorMessage,
        error: undefined, // En este caso, el error no debería estar definido
      }),
    });
  });
  
  it('debería manejar otros casos de error correctamente', async () => {
    const mockEvent = {
      pathParameters: { id: '1' },
    };
  
    const mockErrorMessage = 'Error al obtener datos de la Nave';
  
    // Simular una respuesta de error con un código de estado diferente a 404
    axios.get.mockRejectedValueOnce({
      response: {
        status: 500, // Cualquier código de estado diferente a 404
        data: { mensaje: mockErrorMessage },
      },
    });
  
    const result = await getStarship(mockEvent);
  
    // Verificar que la respuesta coincida con la respuesta esperada
    expect(result).toEqual({
      statusCode: 500,
      body: JSON.stringify({
        mensaje: mockErrorMessage,
        error: undefined, // En este caso, el error no debería estar definido
      }),
    });
  });

  // Limpiar todos los mocks después de cada prueba
  afterEach(() => {
    jest.clearAllMocks();
  });
});

describe('getVehicle', () => {
  it('debería traducir atributos y devolver el vehículo traducido', async () => {
    const mockEvent = {
      pathParameters: { id: '1' },
    };

    const mockVehicleOriginal = {
      name: 'Sand Crawler',
      model: 'Digger Crawler',
      manufacturer: 'Corellia Mining Corporation',
      cost_in_credits: '150000',
      length: '36.8',
      max_atmosphering_speed: '30',
      crew: '46',
      passengers: '30',
      cargo_capacity: '50000',
      consumables: '2 months',
      vehicle_class: 'wheeled',
      pilots: ['Luke Skywalker', 'C-3PO'],
      films: ['A New Hope', 'Attack of the Clones'],
      created: '2023-01-01T00:00:00Z',
      edited: '2023-01-01T00:00:00Z',
      url: 'https://swapi.py4e.com/api/vehicles/1/',
    };

    const mockResponse = {
      statusCode: 200,
      body: JSON.stringify({
        vehiculo: {
          nombre: 'Sand Crawler',
          modelo_o_nombre_oficial: 'Digger Crawler',
          fabricante_s: 'Corellia Mining Corporation',
          costo_en_creditos_galácticos: '150000',
          longitud_en_metros: '36.8',
          velocidad_máxima_en_atmósfera: '30',
          tripulación_requerida: '46',
          pasajeros_no_esenciales: '30',
          capacidad_máxima_de_carga_en_kilogramos: '50000',
          duración_máxima_de_los_consumibles_para_la_tripulación: '2 months',
          clase_del_vehiculo: 'wheeled',
          pilotos_que_la_han_tripulado: ['Luke Skywalker', 'C-3PO'],
          películas_en_las_que_aparece: ['A New Hope', 'Attack of the Clones'],
          creado: '2023-01-01T00:00:00Z',
          editado: '2023-01-01T00:00:00Z',
          URL_del_recurso: 'https://swapi.py4e.com/api/vehicles/1/',
        },
        input: mockEvent,
      }),
    };

    axios.get.mockResolvedValueOnce({ data: mockVehicleOriginal });

    const result = await getVehicle(mockEvent);
    expect(result).toEqual(mockResponse);
  });

  it('debería realizar la petición a la API con el ID del vehículo', async () => {
    const mockEvent = {
      pathParameters: { id: '1' },
    };

    // Espiar la función axios.get para verificar que se llame con la URL correcta
    const axiosGetSpy = jest.spyOn(axios, 'get');
    const expectedUrl = 'https://swapi.py4e.com/api/vehicles/1';
    
    // Simular una respuesta exitosa de la API con código de estado 200
    axios.get.mockResolvedValueOnce({ data: {} });

    await getVehicle(mockEvent);

    // Verificar que axios.get se llamó con la URL esperada
    expect(axiosGetSpy).toHaveBeenCalledWith(expectedUrl);

    // Restaurar la implementación original de axios.get después de la prueba
    axiosGetSpy.mockRestore();
  });

  it('debería manejar el caso de error 404 correctamente', async () => {
    const mockEvent = {
      pathParameters: { id: '1' },
    };
  
    const mockErrorMessage = 'Vehiculo no encontrado';
  
    // Simular una respuesta de error 404
    axios.get.mockRejectedValueOnce({
      response: {
        status: 404,
        data: { mensaje: mockErrorMessage },
      },
    });
  
    const result = await getVehicle(mockEvent);
  
    // Verificar que la respuesta coincida con la respuesta esperada
    expect(result).toEqual({
      statusCode: 404,
      body: JSON.stringify({
        mensaje: mockErrorMessage,
        error: undefined, // En este caso, el error no debería estar definido
      }),
    });
  });
  
  it('debería manejar otros casos de error correctamente', async () => {
    const mockEvent = {
      pathParameters: { id: '1' },
    };
  
    const mockErrorMessage = 'Error al obtener datos del vehiculo';
  
    // Simular una respuesta de error con un código de estado diferente a 404
    axios.get.mockRejectedValueOnce({
      response: {
        status: 500, // Cualquier código de estado diferente a 404
        data: { mensaje: mockErrorMessage },
      },
    });
  
    const result = await getVehicle(mockEvent);
  
    // Verificar que la respuesta coincida con la respuesta esperada
    expect(result).toEqual({
      statusCode: 500,
      body: JSON.stringify({
        mensaje: mockErrorMessage,
        error: undefined, // En este caso, el error no debería estar definido
      }),
    });
  });

  // Limpiar todos los mocks después de cada prueba
  afterEach(() => {
    jest.clearAllMocks();
  });
});