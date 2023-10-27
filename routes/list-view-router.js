const express = require('express');
const router = express.Router();
const listaDeTareas = require("../tareas.json");

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