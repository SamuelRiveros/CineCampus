const cors = require('cors');
const express = require("express");
const path = require("path");
const router = require('../server/router'); // Importa el router

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Archivos estáticos de Vue (producción)
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Rutas para APIs
app.use('/api', router);

// Manejar rutas del frontend con Vue Router - Esto no es necesario
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
// });

// Manejo de errores 404 para APIs
app.use('/api/*', (req, res) => {
    res.status(404).json({ message: "No se encontró la ruta especificada" });
});

const config = {
    port: process.env.EXPRESS_PORT || 3001,
    host: process.env.EXPRESS_HOST || 'localhost'
};

app.listen(config.port, config.host, () => {
    console.log(`http://${config.host}:${config.port}`);
});