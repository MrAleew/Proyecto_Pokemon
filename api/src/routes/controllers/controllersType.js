const axios = require('axios');
const {Tipo} = require('../../db.js')


const getTipos = async () =>{
 
        const tiposApi = await axios.get("https://pokeapi.co/api/v2/type");
        const tipos = tiposApi.data.results.map(e => e.name)
        tipos.forEach(e => {
            Tipo.findOrCreate({//creame en tipo estas ocupaciones que te pase aca en la const tipos donde nombre sea el elemento que estoy mapeando
                where: {name: e}
            })            
        });
        console.log(tipos)
}


module.exports = {getTipos}