require("dotenv").config();
const axios = require('axios');
const {Pokemon,Tipo} = require('../../db.js')


const getApiInfo = async () => {//pokemones de la api
    try {
        const apiUrlFirts = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=100");
        const apiInfo = await apiUrlFirts.data.results?.map(e => axios.get(e.url));// la url es el pokemon en si por eso hacemos un dobe request
        const result = await Promise.all(apiInfo)
    
       const apiFin = result.map(e => { // lo mapeo para que me retorene o me traiga solo lo que estoy buscando
            return {
                id: e.data.id,
                name: e.data.name,
                img: e.data.sprites.other.home.front_default,
                tipos: e.data.types.map(e => e.type.name),
                hp: e.data.stats[0].base_stat,
                atq:e.data.stats[1].base_stat,
                def:e.data.stats[2].base_stat,
                speed:e.data.stats[3].base_stat,
                height:e.data.height,
                weight: e.data.weight,
            }
        })
        return apiFin
    } catch (error) {
      return error
    }
 
   
}

const getDbInfo = async () => {//pokemons de la base de datos
    try {
        const dbInfo= await Pokemon.findAll({  // el findall lo utilizo para traer la info de la base de datos
            include:{ //traeme todos los pokemons pero incluyeme sus tipos y de este modelo de tipos traeme el atribute 'name'
                model: Tipo,
                attributes:['name'],// me traigo los que necesita llamar de mi modelo tipo
                through: { // esto debe ir siempre
                    attributes:[],
                },
            }
        })  
        
        let response = await dbInfo?.map( pokemon => {
            return{
                id: pokemon.id,
                name: pokemon.name,
                img: pokemon.img,
                tipos: pokemon.tipos?.map(e => e.name),
                hp: pokemon.hp,
                atq: pokemon.atq,
                def: pokemon.def,
                speed: pokemon.speed,
                height: pokemon.height,
                weight: pokemon.weight,
                createInDb: true
            }
        })
        return response
        
    } catch (error) {
        return error
    }
 
}

const getAllPokemons = async () => {// me trae todo tanto de la api como de la base de datos
    try {
        const apiInfo = await getApiInfo();
        const dbInfo = await getDbInfo();
        const infoTotal = apiInfo.concat(dbInfo);
        return infoTotal // es un arreglo
    } catch (error) {
        return error
    }
   
}



const getPokemonById = async (id) => {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`);
            const result = response.data // aqui meto el response en una constante porque tengo que colocarle el .data, entonce lo hago para evitar -
            //-ponerle a lo que retorno response.data y mas facil le pongo resul.id etc..
                return {
                    id: result.id,
                    name: result.name,
                    img: result.sprites.other.home.front_default,
                    tipos: result.types.map(e => e.type.name),
                    hp: result.stats[0].base_stat,
                    atq:result.stats[1].base_stat,
                    def:result.stats[2].base_stat,
                    speed:result.stats[3].base_stat,
                    height:result.height,
                    weight:result.weight,
                       
                }
        } catch (error) {
          return error
        }
     
}

const getPokemonByIdFromDatabase = async (id) => {
    const result = await Pokemon.findByPk(id, {
        include: {
            model: Type,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    });
    return {
        id: result.id,
        name: result.name,
        img: result.img,
        tipos: result.types.map(e => e.type.name),
        hp: result.stats[0].base_stat,
        atq: result.stats[1].base_stat,
        def: result.stats[2].base_stat,
        speed: result.stats[3].base_stat,
        height: result.height,
        weight: result.weight,
    };
}

const getPokemonByName = async (name) => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}/`)
    const result = response.data
    return{
        id: result.id,
        name: result.name,
        img: result.sprites.other.home.front_default,
        tipos: result.types.map(e => e.type.name),
        hp: result.stats[0].base_stat,
        atq: result.stats[1].base_stat,
        def: result.stats[2].base_stat,
        speed: result.stats[3].base_stat,
        height: result.height,
        weight: result.weight,
    }
}

const getPokemonByNameFromDb = async (name) => {
    const fromDb = await Pokemon.findAll({
        where: {
            name: name,
            include: {
                model: Type,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            },
        }
    });
    return fromDb;
}




 
module.exports = {getApiInfo,getDbInfo,getAllPokemons,getPokemonById,getPokemonByIdFromDatabase,getPokemonByName,getPokemonByNameFromDb};