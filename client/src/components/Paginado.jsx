import React from "react";
import './Paginado.css';

// hago destructuring de mis constantes creadas en el Home osea me las traigo
export default function paginado ({pokemonsPerPage, allPokemons, paginado}){
    // declaro un arreglo vacio
    const pageNumber = []
    
    //Math.ceil redondea para arriba o sea 1.3 = 2
    //entonces me va a redondear todos mis pokemones sobre la cantidad de pokemones que quiero por pagina
    // recorro un arreglo en el que voy a tomar un numero redondeado que resulta de la division de allPokemons/pokemonsPerPage y con ese resultado lo pusheo a mi arreglo vacio que declare arriba pageNumber
    for (let i=1; i<= Math.ceil(allPokemons/pokemonsPerPage); i++){
        pageNumber.push(i)
        // inicio i en 1 porque si no me puseha la posicion 0 que esta vacia e inicia mi paginado con la primera pagina en 0 entonces por eso le paso como inicial  i = 1 para que arranque en 1
    }

    // este componente va a renderiza los numeros

    return(
        <nav >{/*nav simplemente un contenedor de enlaces de navegación. Esta etiqueta te permite dirigirte a otras secciones o a enlaces externos*/}
            <ul className="buttons-container" >
                {/* que hago aqui bueno pregunto si tengo este arreglo o si hay algo en ese arreglo que es el que declare arriba vacio entonce mapeamelo y devolveme por ese arreglo cada uno de los numero que te devuelva el paginado*/}
                { pageNumber?.map(number =>(
                    <li className= "page-num" key={number}>
                     <a onClick={() => paginado(number)}>{number}</a>
                     </li>
                ))}
            </ul>
        </nav>
    )

}