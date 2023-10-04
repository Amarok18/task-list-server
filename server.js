const express = require('express');
const host = 'localhost';
const app = express();
const port = 8010;

const listadeTareas = [
    {
        id:1,
        description:"Estudiar Javascript",
        estado: "pendiente"
    },
    {
        id:2,
        description:"Estudiar NodeJs",
        estado: "pendiente"
    },
    {
        id:3,
        description:"Estudiar Html",
        estado: "completado"
    },
    {
        id:4,
        description:"Estudiar CSS",
        estado: "completado"
    },
    
];

app.get("/ListadeTareas",(req,res)=>{
    res.status(200).json(listadeTareas)
})

app.listen(port, host, () => {
  console.log(`Servidor en funcionamiento en http://${host}:${port}`);
});