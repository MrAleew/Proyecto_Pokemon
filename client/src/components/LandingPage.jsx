import React from "react"; //importamos
import {Link} from 'react-router-dom';//importamos
import './LandingPage.css';

export default function LandingPage(){
    return(
     <body className="body">
        <div>
            <h1 className="h1">Welcome to my super Pokedex!!!</h1>
            <Link to ='/home'>
            <button className="button-57" role="button"><span class="text">Log In</span><span>Ingresar</span></button>
            </Link>
        </div>
    </body>
    );
}
