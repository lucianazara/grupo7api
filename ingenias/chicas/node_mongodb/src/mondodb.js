const dotenv = require("dotenv");
dotenv.config();

const{MongoClient} = require('mongodb');
const URL = process.env.MONGODB_URLSTRING || ""
const client = new MongoClient(URL)
// PARA CONECTAR CON LA BD
async function connectToMondodb() {
    try {
        await client.connect()
        console.log('Conectado a mongoDB')
        return client
    } catch (error) {
        console.log('Error a conectarse a mongodb:' + error)
        return null
    }
}


    const disconnectToMongoDB = async () => {
    try {
        await client.close()
        console.log('Desconectado a mongoDB')
        return client
    } catch (error) {
        console.log('Error al deconectarse a mongodb:' + error)
        
    }
}

module.exports = {connectToMondodb, disconnectToMongoDB}