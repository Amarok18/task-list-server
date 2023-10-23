const express = require('express');
const router = express.Router();
const listaDeTareas = require("../tareas.json");

router.get("/",(req,res)=>{
  res.send(listaDeTareas); 
})

router.get("/:estado", (req, res) => {
  const tareaEstado = req.params.estado;
  const tareas = listaDeTareas.filter((tareas) => tareas.estado == tareaEstado);
  return res.send(tareas);
  
});
module.exports = router;                              