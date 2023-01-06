


const initialState = {
    pokemons: [],
    filtered:[],
    tipos:[],
    detail:[]
    
}

// filtered es un nuevo estado que creo para el filtro tipo, para modificar este nuevo y cuando quite el filtro me delvuelva el primer estado sin modificar


function rootReducer (state= initialState,action){
    switch(action.type) {
            case 'GET_POKEMONS':
                return{
                ...state,
                pokemons: action.payload,// que quiere decir esto que en mi estado pokemons que inicialmente arriba es un arreglo vacio, manda todo lo que te mande la accion GET_POKEMONS
                filtered: action.payload
                }
            case 'FILTER_BY_TIPO':
                // nota la loJiga en el reducer va antes del return porque si lo metemos se rompe todo
                //nota por el payload me vienen los tipos que voy a filtrar
                // nota uso let porque el estado cambia y debe variar
                let allPokemon = state.filtered;
                let  tiposFiltered = allPokemon.filter((pokemon) => pokemon.tipos?.includes(action.payload))
                //debo colocar ? por la asincronia si no lo coloco se rompe
                if(action.payload === 'allTypes') tiposFiltered = allPokemon;
                return {
                    ...state,
                    pokemons: tiposFiltered,

                }
            case 'FILTER_CREATED':
                let createdFilter1 = state.filtered;
                let createdFilter = action.payload === 'created' ?  createdFilter1.filter(el => el.createInDb) : createdFilter1.filter(el =>!el.createInDb)
                return{
                    ...state,
                    pokemons: action.payload === 'All'? createdFilter1 : createdFilter
                }
            case 'ORDER_BY_NAME':
                let byAtoZ = action.payload === 'asc' ?
                state.pokemons.sort(function(a, b) {
                    if(a.name > b.name) {
                        return 1;
                    }
                    if(b.name > a.name) {
                        return -1;
                    }
                }) : // si no ordenalo desendente
                state.pokemons.sort(function(a,b){
                    if(a.name > b.name) {
                        return -1;
                    }
                    if(b.name > a.name) {
                        return 1
                    }
                    return 0
                })
                return{
                    ...state,
                    pokemons: byAtoZ
                }


            case 'ORDER_BY_ATQ':
                const byAttack = action.payload === 'min' ? state.pokemons.sort((a,b) => {
                    return a.atq - b.atq
                }) : state.pokemons.sort((a,b) => {
                    return b.atq - a.atq
                });
                return {
                    ...state,
                    pokemons: byAttack
                }
            case 'GET_NAME_POKEMONS':
                return{
                    ...state,
                    pokemons: action.payload
                }

            case 'GET_TIPOS':
                return{
                  ...state,
                    tipos: action.payload
                }

            case 'POST_POKEMON':
                return{
                    ...state
                }

            case 'GET_DETAILS':
                return{
                    ...state,
                    detail: action.payload
                }

           /* case 'ORDER_BY_ATQMIN':
                const atqMin = state.pokemons.filter((el) => ( el.atq > 50 ))

                return{
                    ...state,
                    pokemons: atqMin
                }*/



// cleanpokemons y cleandetails las creo para setear el estado de detalles del pokemon para que no se quede guardado el detalle del pokemon anterior

            case 'CLEAN_POKEMONS':
                return {
                    ...state,
                    pokemons: action.payload
                    } 

            case 'CLEAN_DETAIL':
                return {
                    ...state,
                    detail: action.payload
                    }           




                default:
                return {...state};

    }
}








export default rootReducer;