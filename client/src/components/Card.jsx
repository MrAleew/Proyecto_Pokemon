import React from "react";
import './Card.css';



export default function Card ({id, name, img, tipos,}){
    return(
      
        <div className="card-cont">
           <div className="id-cont" key={id}><h3>{id}</h3><img src="https://1000logos.net/wp-content/uploads/2017/05/Symbol-Pokemon-Logo.jpg" alt=""/></div>
            <div className="name-cont"><h3 className="card-name">{name}</h3></div>
            <div className="img-cont"><img src={img} alt="img not found"/></div>
            <div className="types"><h3>{tipos}</h3></div>
        </div>
       
    )
}