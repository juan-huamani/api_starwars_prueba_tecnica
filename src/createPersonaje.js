const { v4 } = require('uuid')
const AWS = require('aws-sdk');

module.exports.createPersonaje = async (event) => {
try {
    const dynamoDB = new AWS.DynamoDB.DocumentClient();
    
    const {name, last_name, edad} = JSON.parse(event.body)
    const createdAt = new Date()
    const id = v4()

    const newInfo = {
        id,
        name,
        last_name,
        edad,
        createdAt
    }

    await dynamoDB.put({
        TableName: 'personajes',
        Item: newInfo
    }).promise()

    return {
    statusCode: 200,
    body: JSON.stringify({
        mensaje: 'Datos registrados correctamente en la tabla Personajes',
    }),
    };
} catch (error) {
    console.error('Error al registrar datos en la tabla Personajes:', error);

    return {
    statusCode: 500,
    body: JSON.stringify({
        mensaje: 'Error interno del servidor',
        error: error.message,
    }),
    };
}
};