const express = require('express');
const host = 'localhost';
const app = express();
const port = 8000;
const router = require('./routes/list-view-router');
const router2 = require('./routes/list-edit-router');

const middlewareMetodos = (req,res,next)=>{
    if(req.method !== 'GET'&& req.method !== 'POST'&& req.method !== 'PUT' && req.method !== 'DELETE'){
      res.status(400).send("No son metodos disponibles")
    }
    next();
}
app.use(middlewareMetodos);
app.use(express.json());

app.use('/listaDeTareas',router);
app.use('/listaDeTareas',router2);

app.get("/",(req,res)=>{
    res.status(200).send("Bienvenidos")
});

app.listen(port, host, () => {
  console.log(`Servidor en funcionamiento en http://${host}:${port}`);
});

