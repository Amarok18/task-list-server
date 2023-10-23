const express = require('express');
const router2 = express.Router();
const listaDeTareas = require("../tareas.json");


router2.post("/nuevaTarea",(req,res)=>{
  const nuevaTarea = req.body;
  listaDeTareas.push(nuevaTarea);
  res.status(201).send(listaDeTareas)
});

router2.put("/actualizar/:id", (req, res) => {
  const tareaId = parseInt(req.params.id);
  const tareaBody = req.body;
  console.log(tareaId);
  const indice = listaDeTareas.findIndex((tarea) => tarea.id == tareaId);
  console.log(listaDeTareas[indice]);
  if (indice != -1) {
    tareaBody.id=tareaId;
    listaDeTareas[indice] = tareaBody;
    res.setHeader('Content-Type','application/json');
    return res.status(200).send(tareaBody);
  } else {
    return res.status(404).send({ mensaje: "tarea no encontrada" });
  }

});

router2.delete("/eliminar/:id", (req, res) => {
  const tareaId = req.params.id;
  const indice = listaDeTareas.findIndex((tareas) => tareas.id == tareaId);
  console.log(indice);
  if (indice == -1) {
    res.status(400).send({ mensaje: "Tarea no encontrado" });
  } else {
    listaDeTareas.splice(indice, 1);
    res.sendStatus(204);
  }
});

module.exports = router2;