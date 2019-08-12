const Character = require('../models/character.model');


module.exports = (() => {

    const initData = ({axios}) => {
        Character.findOne({}).exec((err, resp)=>{
           if(!resp){
               console.log('Inicio de carga de datos');
              loadData(axios);  
           }else {
               console.log('La data se encuentra lista para ser usada');
           }
        });
    }

    const loadData = async (axios) => {
        const url = 'show/characters';
        let data = [];
        
        try{
           ( {data} = await axios.get(url));
           
            for (let index = 0; index < data.length; index++) {
                const  age = data[index].age ? data[index].age.age : null;
                const newCharacter = new Character({
                    name: data[index].name, 
                    name: data[index].name, 
                    slug: data[index].slug, 
                    image: data[index].image, 
                    gender: data[index].gender, 
                    alive: data[index].alive, 
                    death: data[index].death, 
                    father: data[index].father, 
                    house: data[index].house, 
                    first_seen: data[index].first_seen, 
                    actor: data[index].actor, 
                    age
                });
                await newCharacter.save();
            
            }
        console.log('La data ha sido cargada en la base de datos');


        }catch(err){
           console.log(err)
        }

    }

    const getCharacterById = (req, res) =>{
        const id = req.params.id;
        Character.findById(id).exec((err, character)=>{
            if (err){
                return res.status(500).json({
                    ok: false,
                    message: 'Error al consultar el registro',
                    errors: err
                });
            }else{
                if(character){
                    return res.status(200).json({
                        ok: true,
                        message: 'Operación realizada de forma exitosa.',
                        character
                                                
                    });
                }else {
                    return res.status(404).json({
                        ok: false,
                        message: 'No se encontraron resultados',                         
                    });
                }
            }
        });
    }

    const getCharactersByTerm = (req, res)=>{
        const term = req.params.term;
        const regex = new RegExp(term, 'i');
        const page = Number(req.query.page);  
        const sizePage = Number(req.query.sizePage);
        const pageTemp = page -1;   

        const queryObject = { deletedAt: null };
        return Character.find(queryObject)
            .skip(pageTemp*sizePage)
            .limit(sizePage)
            .or([{ 'name': regex }, { 'house': regex }])
            .exec((err, objs) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        message: 'Error al consultar los registros',
                        errors: err                      
                    });
                }else{
                    Character.find(queryObject)
                        .or([{ 'name': regex }, { 'house': regex }])
                        .countDocuments((err, total)=>{
                       return res.status(200).json({
                            ok: true,
                            objs,
                            page,
                            sizePage,
                            total
                       });
                   });
                }
            });
    }

    const getAllCharacters = (req,res) => {

        const page = Number(req.query.page);  
        const sizePage = Number(req.query.sizePage);
        const pageTemp = page -1;   

        const queryObject = { deletedAt: null };
        return Character.find(queryObject)
            .skip(pageTemp*sizePage)
            .limit(sizePage)
            .exec((err, objs) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        message: 'Error al consultar los registros',
                        errors: err
                      
                    });
                }else{
                    Character.find(queryObject).countDocuments((err, total)=>{
                       return res.status(200).json({
                            ok: true,
                            objs,
                            page,
                            sizePage,
                            total
                       });
                   });
                }
            });

    }

    return ({
        initData,
        getCharacterById,
        getAllCharacters,
        getCharactersByTerm
    });

})();