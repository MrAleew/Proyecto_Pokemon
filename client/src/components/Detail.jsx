import React from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { cleanDetail, cleanPokemons, getDetail } from "../actions/index";
import { useEffect } from "react";
import './Detail.css';

export default function Detail(props){

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getDetail(props.match.params.id));
        //aqui dentro le retorno y despacho los clean para borrar el estado del detalle del pokemon anterior
        return () => {
            dispatch(cleanDetail(dispatch), cleanPokemons(dispatch))
        }
    },[dispatch])
 
    const myPokemon = useSelector ((state) => state.detail)

    return(
        <body className="body3">
           
        <div>
            {       //tiene algo?
                myPokemon.length>0 ?
                //si
                <div>
                     <Link to = '/home'>
               <div className="altura"><button className="home-butt"><span>Go Back</span></button></div> 
            </Link>
                    <div className="nombreDetail"><h1>{myPokemon[0].name}</h1></div>
                    
                    <img src={myPokemon[0].img} alt="" width="380px" height="450px"/>
                    <div className="infoDetail">
                    <h4 className="typesDetail" >Types: {myPokemon[0].tipos+""}</h4>
                    <h2>HP: {myPokemon[0].hp}</h2>
                    <h2>Attack: {myPokemon[0].atq}</h2>
                    <h2>Defense: {myPokemon[0].def}</h2>
                    <h2>Speed: {myPokemon[0].speed}</h2>
                    <h2>Height: {myPokemon[0].height}</h2>
                    <h2>Weight: {myPokemon[0].weight}</h2>
                </div>
         
                    
                {/* no */}
                </div> : <p className="load">Loanding...</p>


            }
          

        </div>

       
        </body>
        
    )

}