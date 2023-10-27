const express = require('express');
const router = express.Router();
const listaDeTareas = require("../tareas.json");

router.param('estado', (req, res, next, estado) => {
    if (!estado || (estado !== 'completado' && estado !== 'pendiente')) {
        return res.status(400).send("Parámetros no válidos");
    }
    next();
});

router.get("/",(req,res)=>{
  res.send(listaDeTareas); 
})

router.get("/completado",(req, res) => {
  const tareas = listaDeTareas.filter((tareas) => tareas.estado == 'completado');
  return res.send(tareas);
  
});
router.get("/pendiente",(req, res) => {
  const tareas = listaDeTareas.filter((tareas) => tareas.estado == 'pendiente');
  return res.send(tareas);
  
});
module.exports = router;                              