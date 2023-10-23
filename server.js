const express = require('express');
const host = 'localhost';
const app = express();
const port = 8000;
const router = require('./routes/list-view-router');
const router2 = require('./routes/list-edit-router');


app.use(express.json());

app.use('/listaDeTareas',router);
app.use('/listaDeTareas',router2);

app.get("/",(req,res)=>{
    res.status(200).send("Bienvenidos")
});

app.listen(port, host, () => {
  console.log(`Servidor en funcionamiento en http://${host}:${port}`);
});

