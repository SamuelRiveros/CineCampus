const express = require("express"); 
const path = require("path")
const app = express();

app.use(express.json());

app.use("/css", express.static(path.join(__dirname, process.env.EXPRESS_STATIC, "css")));
app.use("/js", express.static(path.join(__dirname, process.env.EXPRESS_STATIC, "js")));
app.use("/storage", express.static(path.join(__dirname, process.env.EXPRESS_STATIC, "storage")));

// el root __dirname otorga todos los permisos para index.html

app.get("/", (req, res)=> {
    res.sendFile(`${process.env.EXPRESS_STATIC}/index.html`, {root: __dirname})
})

app.get("/servicio", (req, res)=> {
    res.sendFile(`${process.env.EXPRESS_STATIC}/views/servicio.html`, {root: __dirname})
})

app.use((req, res)=>{
    res.status(404).json({message: "No se encontró la ruta especificada"})
})

let config = {
    port: process.env.EXPRESS_PORT,
    host: process.env.EXPRESS_HOST
}

app.listen(config, ()=> {
    console.log(`http://${config.host}:${config.port}`)
})


//--- CRUD ---//

// // Tomamos los datos reflejados ubidaso en la url de user

// app.get("/user", (req, res)=> {
//     res.status(200).json({message: "Datos obtenidos usando GET"})
// })

// // subimos un nuevo dato y nos muestra el json en el output

// app.post("/user", (req, res)=> {
//     res.status(201).json({message: "Datos recibidos usando post", data:req.body})
// })


// // Actualizamos el campo de "id" en el json por el dato subido por la url
// // el req.params es el caracter ingresado en la url

// app.put("/user/:id", (req, res)=> {
//     res.status(201).json({message: "Datos actualizados usando put", dataquery:req.query, databody: req.body, dataparams: req.params})
// })

// // Deleteamos el campo especifico del json del endpoint especificado
// // el req.params es el caracter ingresado en la url, en este caso debería ser nombre

// app.delete("/user/:nombre", (req, res)=> {
//     res.status(201).json({message: "Datos Eliminados", data:req.params})
// })


// app.listen(3000, ()=>{
//     console.log("http://localhost:3000")
// });