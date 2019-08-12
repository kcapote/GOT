require('./config/config');
const express = require('express');
const services = require('./services');
const router = require('./routes/routes');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3001;
const ctrlCharacter = require('./controllers/character.controller');
const cors = require('cors');

app.use(cors());
app.use('/',router(services));

app.listen( port, (err) => {
    if(err) throw new Error(err);
    mongoose.connect(process.env.URLDB,{ useNewUrlParser: true }, (err, resp) => {
        if (err) throw new Error(err);    
        console.log('Base de datos ONLINE');               
        ctrlCharacter.initData(services);
    });     

    console.log(`Servidor escuchando en el puerto ${port}`);
})