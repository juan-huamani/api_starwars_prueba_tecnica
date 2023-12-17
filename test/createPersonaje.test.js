const { createPersonaje } = require('../src/createPersonaje');
const AWS = require('aws-sdk-mock');

describe('createPersonaje', () => {
  afterEach(() => {
    AWS.restore('DynamoDB.DocumentClient');
    jest.clearAllMocks();
  });

  test('debería agregar información correctamente', async () => {
    // Configurar AWS SDK mock para simular la llamada a DynamoDB
    AWS.mock('DynamoDB.DocumentClient', 'put', (params, callback) => {
      callback(null, 'success');
    });

    const event = {
      body: JSON.stringify({
        name: 'Juan',
        last_name: 'Huamani',
        edad: 27,
      }),
    };

    // Llamar a la función y obtener el resultado
    const result = await createPersonaje(event);

    // Verificar el resultado
    expect(result.statusCode).toBe(200);
    expect(JSON.parse(result.body).mensaje).toBe('Datos registrados correctamente en la tabla Personajes');
  });

  test('debería manejar errores al agregar información', async () => {
    // Configurar AWS SDK mock para simular un error al llamar a DynamoDB
    AWS.mock('DynamoDB.DocumentClient', 'put', (params, callback) => {
      callback(new Error('Error simulado'));
    });

    const event = {
      body: JSON.stringify({
        name: 'Planeta',
        rotation_period: 24,
        orbital_period: 365,
      }),
    };

    // Llamar a la función y obtener el resultado
    const result = await createPersonaje(event);

    // Verificar el resultado
    expect(result.statusCode).toBe(500);
    expect(JSON.parse(result.body).mensaje).toBe('Error interno del servidor');
    expect(JSON.parse(result.body).error).toBe('Error simulado');
  });
});
