import axios from 'axios'; //importo
//crack

export function getPokemons(){
    return async function(dispatch){
        var json = await axios.get("/pokemons",{ 
        });// aqui es donde conecta el back con mi front
        return dispatch({
        type: 'GET_POKEMONS',
        payload: json.data
        })
    }
}
// por el payload me vendran el tipo de pokemon selecionado en el filtro
export function filterPokemonsByTipo(payload){
   //console.log(payload);
    return {
        type : 'FILTER_BY_TIPO',
        payload
    }
}

/*
export function orderByAtqMin(payload){
    return {
        type: 'ORDER_BY_ATQMIN',
        payload
    }
}
*/



export function filterCreated(payload){
    return {
        type: 'FILTER_CREATED',
        payload
    }
}


export function orderByName(payload){
    return{

        type: 'ORDER_BY_NAME',
        payload
    }
}


export function orderByAtq(payload){
    return{
        type: 'ORDER_BY_ATQ',
        payload
    }
}


// ruta para el searchBar
export function  getNamePokemons(name){
    return async function(dispatch){
        try {
            var json = await axios.get("/pokemons?name=" + name)// el name representa lo que el usuario esta escribiendo en la barra de busqueda
            return dispatch({
                type: 'GET_NAME_POKEMONS',
                payload: json.data
            })
        }catch(error){
            alert("Pokemon Not Found");
        }
    }
}
 //creacion de pokemon
export function getTipos(){
    return async function(dispatch) {
        const getType = await axios.get("/tipos", {

        });
        return dispatch({ type: 'GET_TIPOS', payload : getType.data});
    };
}
//creacion de pokemon
export function postPokemon (payload){
    return async function (dispatch) {
        const response = await axios.post("/pokemons",payload);
        return response;
    }
}



//details

export function getDetail (id){
    return async function (dispatch){
        try{
            var json = await axios.get("/pokemons/" + id);
            return dispatch ({
                type: 'GET_DETAILS',
                payload: json.data

            })
        }catch(error){
            console.log(error);
        }
    }
}

// cleanpokemons y cleandetails las creo para setear el estado de detalles del pokemon para que no se quede guardado el detalle del pokemon anterior
export const cleanPokemons = (dispatch) => {
    return dispatch({
        type: 'CLEAN_POKEMONS',
        payload: []
    })
};

export const cleanDetail = (dispatch) => {
    return dispatch({
        type: 'CLEAN_DETAIL',
        payload: []
    })
};
