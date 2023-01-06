const {Router} = require('express');
const {getAllPokemons, getApiInfo} = require('./controllers/controllers');
const router = Router();
const { Pokemon, Tipo } = require("../db.js");
const axios = require("axios");

router.get('/', async (req,res) => {
    const {name} = req.query
    let pokemonsTotal = await getAllPokemons();
   if(name){// este if es, si se le pasa name a la ruta entra aqui si no le paso nombre entra al else y me trae a todos los pokemons
        let pokemonName = await pokemonsTotal.filter(e => e.name.toLowerCase().includes(name.toLocaleLowerCase()))
        pokemonName.length ?
        res.status(200).send(pokemonName) :
        res.status(404).send('no existe');
    } else{
        res.status(200).send(pokemonsTotal);
    }
})


router.get('/:id', async (req,res) => {
    const {id} = req.params
    let pokemonsTotal = await getAllPokemons();
   if(id){// este if es, si se le pasa name a la ruta entra aqui si no le paso nombre entra al else y me trae a todos los pokemons
        let pokemonId = await pokemonsTotal.filter(e => e.id == id )
        pokemonId.length?
        res.status(200).send(pokemonId) :
        res.status(404).send('no existe');
    } 
})

router.post('/', async (req,res) =>{

    let ={// todo lo que me traigo del body
    name,
    img,
    tipos,
    hp,
    atq,
    def,
    speed,
    height,
    weight,
    createinDb
    }= req.body

    let pokemonCreate = await Pokemon.create ({// creo el pokemon
    name,
    img,
    hp,
    atq,
    def,
    speed,
    height,
    weight,
    createinDb
    })
    //hago  tipo aparte porque tengo que encontrar el tipo dentro de mi modelo Tipo, dentro de ese modelo encontra todos los tipos que coincidan con el tipo que le estoy pasando por body
    let tipoDb = await Tipo.findAll({ where: { name : tipos }})
    pokemonCreate.addTipo(tipoDb)// a pokemoncreate agregale el tipoDb
    res.send('Pokemon creado con iv 100')
})



module.exports = router