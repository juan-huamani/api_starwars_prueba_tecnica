const AWS = require('aws-sdk')

module.exports.getPersonajes = async () => {
try {
    const dynamoDB = new AWS.DynamoDB.DocumentClient()
    const params = {
    TableName: 'personajes', 
    };

    const result = await dynamoDB.scan(params).promise();

    const datosTabla = result.Items.map(item => {
    return {
        id: item.id,
        nombre: item.name,
        apellido: item.last_name,
        edad: item.edad,
    };
    });

    return {
    statusCode: 200,
    body: JSON.stringify({
        mensaje: 'Datos de la tabla obtenidos correctamente',
        datosTabla,
    }),
    };
} catch (error) {
    console.error('Error al obtener datos de la tabla en DynamoDB:', error);

    return {
    statusCode: 500,
    body: JSON.stringify({
        mensaje: 'Error interno del servidor',
        error: error.message,
    }),
    };
}
};