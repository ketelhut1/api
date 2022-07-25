//config inicial
require('dotenv').config();
const express = require('express');
const mongoose = require ('mongoose');
const jwt = require ('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();





//forma de ler json  / middlewares
app.use( 
    express.urlencoded({
        extended: true,
    }),
    
)
app.use(express.json())
//rotas da api
const personRoutes = require ('./routes/personRoutes');

app.use('/person', personRoutes)


//rota inicial

//entregar uma porta pro express

const DB_USER = process.env.DB_USER

const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD) 


mongoose.connect('mongodb://localhost:27017/api')


    .then (() => {
console.log("conectamos ao mongodb")
app.listen(3000)
})


.catch((err) => console.log(err))






