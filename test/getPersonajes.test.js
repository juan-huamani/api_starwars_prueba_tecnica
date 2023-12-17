const { getPersonajes } = require('../src/getPersonajes');
const AWS = require('aws-sdk-mock');

describe('getPersonajes', () => {
  afterEach(() => {
    AWS.restore('DynamoDB.DocumentClient');
    jest.clearAllMocks();
  });

  test('debería obtener información de la tabla correctamente', async () => {
    // Configurar AWS SDK mock para simular la llamada a DynamoDB
    AWS.mock('DynamoDB.DocumentClient', 'scan', (params, callback) => {
      callback(null, { Items: [{ id: '1', name: 'carlos', apellido: "farfan", edad: 23 }, { id: '2', name: 'gabriel', apellido: "huamani", edad: 23 }] });
    });

    // Llamar a la función y obtener el resultado
    const result = await getPersonajes();

    // Verificar el resultado
    expect(result.statusCode).toBe(200);
    expect(JSON.parse(result.body).mensaje).toBe('Datos de la tabla obtenidos correctamente');
    expect(JSON.parse(result.body).datosTabla).toHaveLength(2);
    // Puedes realizar más verificaciones específicas según la respuesta esperada.
  });

  test('debería manejar errores al obtener información de la tabla', async () => {
    // Configurar AWS SDK mock para simular un error al llamar a DynamoDB
    AWS.mock('DynamoDB.DocumentClient', 'scan', (params, callback) => {
      callback(new Error('Error simulado'));
    });

    // Llamar a la función y obtener el resultado
    const result = await getPersonajes();

    // Verificar el resultado
    expect(result.statusCode).toBe(500);
    expect(JSON.parse(result.body).mensaje).toBe('Error interno del servidor');
    expect(JSON.parse(result.body).error).toBe('Error simulado');
  });
});
