const express = require('express');
const router2 = express.Router();
const listaDeTareas = require("../tareas.json");

const middleware = function(req,res,next){
  if (req.method === 'POST') {
    if (!req.body || Object.keys(req.body).length==0) {
      return res.status(400).send("No se puede enviar un cuerpo vacío en la solicitud.");
    }
    if (!req.body.hasOwnProperty('id') || !req.body.hasOwnProperty('description')||!req.body.hasOwnProperty('estado')) {
      return res.status(400).send("Faltan atributos: id,description,estado");
    }
  }else if(req.method === 'PUT'){
    if (!req.body || Object.keys(req.body).length==0) {
      return res.status(400).send("No se puede enviar un cuerpo vacío en la solicitud.");
    }
    if (!req.body.hasOwnProperty('description')||!req.body.hasOwnProperty('estado')) {
      return res.status(400).send("Faltan atributos: id,description,estado");
    }
  }

  next();
};

router2.use(middleware);

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
  // console.log(listaDeTareas[indice]);
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
    res.status(404).send({ mensaje: "Tarea no encontrado" });
  } else {
    listaDeTareas.splice(indice, 1);
    res.sendStatus(204);
  }
});

module.exports = router2;