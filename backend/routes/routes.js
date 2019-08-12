const express = require('express');
const router = express.Router();
const fs = require('fs');
const crtlCharacter = require('../controllers/character.controller')
module.exports = ({axios}) => {
    
    //servicio que retorna un personaje
    router.get('/characters/:id', crtlCharacter.getCharacterById);

    //servicio que retorna todos los personajes
    router.get('/characters',crtlCharacter.getAllCharacters);
    
    //servicio que retorna los personajes filtrados por un termino
    router.get('/characters/search/:term', crtlCharacter.getCharactersByTerm);

    return router;
}