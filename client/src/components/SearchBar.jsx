import React from "react";
import { useState } from "react";
import {useDispatch} from "react-redux";
import { getNamePokemons } from "../actions";
import './SearchBar.css'





export default function SearchBar ({setCurrentPage}){
    const dispatch = useDispatch()
    const [name, setName]= useState("")
    
    
    
function handleInputChange(e){
    e.preventDefault()
    setName(e.target.value)
}

function handleSubmit(e){
    e.preventDefault()
    setCurrentPage(1)
    document.getElementById("search").value=""
    dispatch(getNamePokemons(name))

}
console.log(name);

    return(
        <div className="box">
            <input
            id="search"
            className="input"
            type = 'text'
            placeholder="Search..."
            onMouseOut="this.value = ''; this.blur();"
            onChange={(e) => handleInputChange(e)}
            />
            <button type="submit" className="buttonX" onClick={(e) => handleSubmit(e) }>&nbsp;</button>

        </div>
    )
}