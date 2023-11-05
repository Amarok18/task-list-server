const express = require('express');
const router = express.Router();
const listaDeTareas = require("../tareas.json");

const validarRuta = (req,res,next)=>{
  if(req.path === "/completado" || req.path === "/pendiente" || req.path === "/" || req.path.match(/\/\d+/)){
    console.log(req.path)
    next();
  }else{
    console.log(req.path)
    res.status(400).send("Esta no es una ruta permitida prueba con completado o pendiente")
  }
}

router.use(validarRuta);

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

router.get("/:id",(req,res)=>{
  const id = req.params.id;
  const tarea = listaDeTareas.find((tareas)=>id==tareas.id);
  if(!tarea){
    res.status(400).send("No se encontro una tarea con el id deseado");
  }else{
    res.status(201).json(tarea);
  }
})

module.exports = router;                              