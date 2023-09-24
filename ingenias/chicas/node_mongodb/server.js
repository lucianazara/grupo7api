// servidor
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const { connectToMondodb, disconnectToMongoDB } = require('./src/mondodb')

//Middleware
app.use((req, res, next) => {
    res.header("Content-Type", "aplication/json; charset=utf-8");
    next();
});
app.get('/', (req, res) => { res.status(200).end('Bienvenidos a la API de frutas'); } );

// Endpoints
app.get('/frutas', async (req, res) => {
    const client = await connectToMondodb();
    if (!client){
        res.status(500).send('Error al conectarse a MongoDB');
        return;
    }

    const db = client.db('frutas');
    const supermercado = await db.collection('frutas').find().toArray()
    await disconnectToMongoDB()
    res.json(frutas);
});
app.get('/frutas/:id', async(req, res) => {});

app.get("*", (req,res) => {
    res.json({
    error:"404",
    message: "No se encuentra la ruta solicitada",});
});

//INICIAR SERVIDOR
app.listen(PORT, () => console.log(`API de supermercado escuchando en http:localhost:${PORT}`));