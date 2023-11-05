const express = require('express');
const host = 'localhost';
const jwt =  require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const port = 8000;
const router = require('./routes/list-view-router');
const router2 = require('./routes/list-edit-router');

const usuarios = [
  {email:"ada@example.com",password:"admin"},
  {email:"jose@example.com",password:"user"},
  {email:"express@example.com",password:"express"},
];
const validarToken = (req,res,next)=>{
    let token  = req.headers['authorization'];
   console.log(token);
    if(token==null){
      res.status(400).send("Autorizacion Invalida");
    }else{
       if (token.startsWith("Bearer ")) {
      token = token.slice(7); 
    }
      jwt.verify(token,process.env.SECRET_PASSWORD,{algorithms:"HS256"},(error,decode)=>{
        if(error){
          console.error(error)
          res.status(400).send("Token Invalido");
        }else{
          req.user = decode;
          console.log(decode);
          next();
        }
      });
      
    }
  }
  const middlewareMetodos = (req,res,next)=>{
    if(req.method !== 'GET'&& req.method !== 'POST'&& req.method !== 'PUT' && req.method !== 'DELETE'){
      res.status(400).send("No son metodos disponibles")
    }
    next();
  }
  
  app.use(middlewareMetodos);
  app.use(express.json());
  
  app.use('/tareas',validarToken,router);
  app.use('/tareas',validarToken,router2);
  
  app.post("/login",(req,res)=>{
    const {email,password}=req.body;
    const usuarioValido = usuarios.find((user)=>email===user.email && password === user.password);
    
    if(!usuarioValido){
      res.status(400).send("Email o password no son validos");
    }else{
      const token = jwt.sign({email},process.env.SECRET_PASSWORD,{algorithm:'HS256'},{expiresIn:"1h"});
      res.status(200).json({token});
  }

});

app.listen(port, host, () => {
  console.log(`Servidor en funcionamiento en http://${host}:${port}`);
});

