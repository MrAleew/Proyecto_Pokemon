import React from "react";
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getPokemons, filterPokemonsByTipo, filterCreated, orderByName, orderByAtq } from "../actions";
import {Link} from 'react-router-dom';
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import './Home.css'


export default function Home (){

    const dispatch = useDispatch() 
    const allPokemons = useSelector((state) => state.pokemons) // esto es hooks, esto es lo mimos que usar el mapstatetoprops
    // aqui empiezo a definir los estados currentPage = estado pagina actual --- setCurrentPage = estado que me setea la pagina actual
   // en resumen lo de arriba quiere decir guardame en un estado local la pagina actual y una constante que me sete la pagina actial, porque el usestate(1) en 1, porque mi pagina actual arranca en 1 osea la inicial
    const [currentPage,setCurrentPage] = useState(1)
    // me defino otro estado local que me diga cuantos pokemones tengo por pagina = pokemonsPerPage, useState 12 porque son los pokemons que quiero por pagina
    const [pokemonsPerPage,setPokemonsPerPage] = useState(12)
    // me declaro otra const = indexOfLastPokemon, que sera el indice del ultimo pokemon
    const indexOfLastPokemon = currentPage * pokemonsPerPage
    // me declaro otra const que sera el indice del primer personaje
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage
    // me declaro otra constante =currentPokemons que va a tener los pokemones que estaran en la pagina actual osea los 12 por pagina
    // el .slice() hace un corte en un arreglo osea le pasamos una posicios por parametro de donde queremos el nuevo corte que nos devuelve el slice
    const currentPokemons = allPokemons.slice(indexOfFirstPokemon,indexOfLastPokemon)
    //creo este estado local vacio para usarlo en el filtro asc 
    const [orden, setOrden] = useState('')
    const [ordenAtq, setOrdenAtq] = useState('')


    // el paginado setea la pagina en el numero que yo apriete, entonces eso me modifica los index de las constantes de arriba y me va cambiando el rango del slice
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }


    useEffect (() =>{ // para traernos del estado los pokemones cuando el componente se monta usamos useefect
        dispatch(getPokemons())//este dispatch es lo mismo que usar el mapdispatchtoprops
    },[dispatch])// este arreglo se coloca para que no tengamos llamados infinitos osea un loop



function handleClick(e){
    e.preventDefault();//Se usa más comúnmente para evitar que una página se refresque automáticamente al momento de llamar al evento submit en un formulario y para evitar este mismo comportamiento en un evento click 
    setCurrentPage(1);
    dispatch(getPokemons());
}

// filtro tipo pokemon
function handleFilterTipo(e){
    dispatch(filterPokemonsByTipo(e.target.value))
    setCurrentPage(1);
}

// filtro creado en database pokemon
function handleFilterCreated(e){
    dispatch(filterCreated(e.target.value))
    setCurrentPage(1);
}

// filtro por orden alfabetico de la a z y de la z a
function handleSort(e){
    e.preventDefault();
    dispatch(orderByName(e.target.value))
    setCurrentPage(1);// seteo la pagina en la primera para cuando se aplique el ordenamiento
    setOrden(`Ordenado ${e.target.value}`)// setOrden es un estado local que cree para cuando sete la setCurrentPage(1) me modifique el estado local y se renderice
}
// filtro por orden de mayor a menor atq y vise
function handleSortAtq(e){
    e.preventDefault()
    dispatch(orderByAtq(e.target.value))
    setCurrentPage(1);
    setOrdenAtq(`OrdenadoATQ ${e.target.value}`)
}


return (//LINK ES PARA CREAR BOTONES QUE ME LLEVEN A UNA RUTA
        // le pasamos la funcion al button que creamos arriba para mostrar todos los pokemons
<body className="body2">
    <div>
       <Link to = '/pokemons'><button className="buttonDetalles" >Create a Pokemon</button></Link> 
       <button className="buttonDetalles" onClick={e=>{handleClick(e)}}> 
           All Pokemon 
       </button>
      
       {/* aqui abajo empienzan mis  filtro */}
       <div>
            <select  className="barras" onChange={e => handleSort(e)}>
                {/* para descendete y ascendente */}
                <option value="order">Select the order</option>
                <option value= 'asc'>A - Z</option>  {/* aca dentro de las options siempre es necesario tener un value porque lo que hace es que me permite "acceder" es decir bueno dentro del select tengo opciones esas opciones tienen un value, si el value  es asc entonces hace esto si es desc hace esto otro, pero lo que me permite acceder al valor que tienen cada una de esas opciones, para cuando desde el front haga click en esa opcion y se ejecute toda la logica y la opcion entienda si o si se nececita pasar el value*/}
                <option value= 'desc'>Z - A</option>
            </select>
             {/* Filtro de mayor a menor ataque*/}
             <select  className="barras" onChange={ e => handleSortAtq(e)}>
                <option value= 'atq'>Order by attack</option>  
                <option value= 'min'>Min</option>  
                <option value= 'max'>Max</option>
            </select>
            <select className="barras"  onChange={e => handleFilterTipo(e)}>
                {/* Para los tipos de Pokemon*/}
                {/*  mejorar este codigo para hacelor con un map pediente*/}
                <option value='allTypes'>allTypes</option>
                <option value='flying'>flying</option>
                <option value='fighting'>fighting</option>
                <option value='normal'>normal</option>
                <option value='poison'>poison</option>
                <option value='ground'>ground</option>
                <option value='bug'>bug</option>
                <option value='rock'>rock</option>
                <option value='ghost'>ghost</option>
                <option value='steel'>steel</option>
                <option value='water'>water</option>
                <option value='grass'>grass</option>
                <option value='fire'>fire</option>
                <option value='electric'>electric</option>
                <option value='ice'>ice</option>
                <option value='dragon'>dragon</option>
                <option value='psychic'>psychic</option>
                <option value='dark'>dark</option>
                <option value='fairy'>fairy</option>
                <option value='shadow'>shadow</option>
                <option value='unknown'>unknown</option>
            </select>
            <select  className="barras" onChange={e => handleFilterCreated(e)}>
                 {/* Filtro existentes o creados por mi*/}
                <option value= 'All'>All</option>
                <option value= 'created'>Creados</option>
                <option value= 'Api'>Existentes</option>
            </select>
            
            {/* le paso el seteo en la pagina1 para cuando, busque desde la otras paginas me empiece las busqueda de la pagina 1 y no excluya la 1 */}
            <SearchBar setCurrentPage={setCurrentPage}/>
            
            {/* estas son las props que necesita el componente paginado para funcionar*/}
            <Paginado
            pokemonsPerPage= {pokemonsPerPage}
            allPokemons={allPokemons.length}
            paginado={paginado}
            />
            
        
            {/*  tomo los pokemones que me devuelve el paginado y entonce lo que hago es mapearlo y pasarle cada una de las propiedades que necesita la tarjetita*/}
            <div className="grid">
            { currentPokemons?.map( e => {
            return(
                <div >
                <Link to = {"/home/" + e.id}>
                    <Card name={e.name} img={e.img} tipos={e.tipos+""} />
                </Link>
                </div>   
           )})}
           </div>
       </div>
    </div>
</body>
    
)

}