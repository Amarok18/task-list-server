const express = require('express');
const router = express.Router();
const listaDeTareas = require("../tareas.json");

const validarRuta = (req,res,next)=>{
    if(req.path === "/completado" || req.path === "/pendiente" || req.path === "/"){
      next();
    }else{
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

module.exports = router;                              