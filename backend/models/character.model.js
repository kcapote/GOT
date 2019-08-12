const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const CharacterSchema = mongoose.Schema({
    name: {
        type:String,
        required:[true, 'El campo es obligtorio']
    },
    slug: {
        type:String
    },
    image: {
        type:String,
     
    },
    gender: {
        type:String,
       
    },
    alive: {
        type: Boolean        
    },
    death: {
        type:String      
    },
    father: {
        type:String       
    },
    house: {
        type:String
    },
    first_seen: {
        type:String       
    },
    actor: {
        type:String       
    },
    age:{
        type: Number,
       
    },
    createdAt: {
        type: Date,
        dafault: Date.now()    
    },
    updatedAt:{
        type: Date
    },
    deletedAt: {
        type: Date
    },
});

module.exports = mongoose.model('Character', CharacterSchema);