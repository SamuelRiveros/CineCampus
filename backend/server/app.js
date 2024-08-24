const cors = require('cors');

const express = require("express");
const path = require("path");
const router = require('./server/router'); // Importa el router

const app = express();

app.use(express.json());
app.use(cors());
// Archivos estáticos
app.use("/css", express.static(path.join(__dirname, process.env.EXPRESS_STATIC, "css")));
app.use("/js", express.static(path.join(__dirname, process.env.EXPRESS_STATIC, "js")));
app.use("/storage", express.static(path.join(__dirname, process.env.EXPRESS_STATIC, "storage")));

// Rutas
app.use('/', router);

app.get("/servicio", (req, res) => {
    res.sendFile(path.join(__dirname, process.env.EXPRESS_STATIC, 'views/servicio.html'));
});

// Manejo de errores 404
app.use((req, res) => {
    res.status(404).json({ message: "No se encontró la ruta especificada" });
});

const config = {
    port: process.env.EXPRESS_PORT || 3001,
    host: process.env.EXPRESS_HOST || 'localhost'
};

app.listen(config.port, config.host, () => {
    console.log(`http://${config.host}:${config.port}`);
});
