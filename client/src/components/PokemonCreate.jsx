import React, {useState, useEffect} from "react"; // todo esto lo importo yo
import { Link,useHistory } from "react-router-dom";
import { getTipos, postPokemon } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import './PokemonCreate.css';

// funcion validaciones


export default function PokemonCreate(){
    const dispatch = useDispatch()
    // useHistory es un metodo de router que basicamente lo que hace es redirigirme a la ruta que yo le diga
    const history = useHistory()
    const tipos = useSelector((state) => state.tipos)
    // me genero un estado local que se llame errors y setErros que sera un objeto vacio
    const [errors, setErrors] = useState({})

    useEffect(() =>{
        setErrors(validate(input))
    },[])

function validate(input) {
    let errors ={};
    let RegExpression = /^[a-zA-Z\s]*$/;  

    if(!RegExpression.test(input.name)){
        errors.name = 'Numbers or special characters are not allowed'
    }
    if(!input.name) {
        errors.name = 'Name is required'; 
    }
    if(input.name && input.name.length > 0 && input.name.length < 3) errors.name = 'Name must have 3 or more letters';
    
    if (!input.hp) {errors.hp = 'Please enter a number'}

    if (input.hp > 300){errors.hp = ' HP max number is 300'}

    if (!input.atq) {errors.atq = 'Please enter a number'}

    if (input.atq > 300){errors.atq = 'Attack max number is 300'}

    if (!input.def) {errors.def = 'Please enter a  number'}

    if (!input.speed) {errors.speed = 'Please enter a  number'}

    if (!input.height) {errors.height = 'Please enter a  number'}

    if (!input.weight) {errors.weight = 'Please enter a  number'}


    return errors
       
}

    // creo un nuevo estado local para el formulario
    const[input,setInput] = useState({
        name: "",
        img: "https://i.pinimg.com/originals/a9/4f/4d/a94f4d75a2e429a20838d28d2ae2b996.png" ,
        tipos: [], // tipos debe ser un arreglo vacio para poder seleccionar mas de un tipo
        hp: "",
        atq: "",
        def: "",
        speed: "",
        height: "",
        weight: "",
    })

    // esto maneja cada que se modifiquen o cambien mis inputs
   function handleChange(e){
                            //paso a paso de cada vez que se ejecute la funcion handleChange logica
        setInput({ //setinput o sea seteame ese estado
            ...input, // aca agarra y traete todo lo que ya tenias
            [e.target.name] : e.target.value // y aca seteame el e.target.name en e.target.value
        // el e.target.value representa lo que el usuario esta escribiendo
        //e.target.name e.name representa cada una de mis propiedades para crear un pokemon osea .name .hp .def etc y esto lo lleno con el e.target.value que es lo que escribe el usuario
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))

    }


    function handleSelect(e) {
        const selected = e.target.value;
        if (input.tipos.length >= 2) return alert ("Cannot choose more than two types"); 
        if (!input.tipos.includes(selected)){
            setInput({
                ...input,
                tipos: [...input.tipos, selected]
            })
        } 
    }


    function handleSubmit(e) {
        e.preventDefault();
        dispatch(postPokemon(input))
        console.log(input);
        alert("Pokemon Creado")
        setInput({
            name: "",
            img: "" ,
            tipos: [],
            hp: "",
            atq: "",
            def: "",
            speed: "",
            height: "",
            weight: "", 
        })
        history.push('/home')
    }
//para borrar tipos seleccionados
    function handleDelete(e){
        setInput({
            ...input,
            tipos: input.tipos.filter( tip => tip !== e)
        })
    }


    useEffect(() => {
        dispatch(getTipos());
    },[]);

    return(
        <div className="create-div">
            {/* el link es para redirigir a una ruta*/}
            <Link to= '/home'><div className="home"><button className="home-butt"><span>Home</span></button></div></Link>
            <h1>Create Pokemon</h1>
            <form className="form-cont" onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Name:</label>
                    <input
                    type= "text"
                    value={input.name}
                    name = "name"
                    onChange={(e) => handleChange(e)}
                    />
                    {errors.name && (
                        <p className="error">{errors.name}</p>
                    )}
                </div>
                <div>
                    <label>HP:</label>
                    <input
                    type= "number"
                    value= {input.hp}
                    name = "hp"
                    onChange={(e) => handleChange(e)}
                    />
                      {errors.hp && (
                        <p className="error">{errors.hp}</p>
                    )}
                </div>
                <div>
                    <label>Attack:</label>
                    <input
                    type= "number"
                    value= {input.atq}
                    name = "atq"
                    onChange={(e) => handleChange(e)}
                    />
                        {errors.atq && (
                        <p className="error">{errors.atq}</p>
                    )}
                </div>
                <div>
                    <label>Defense:</label>
                    <input
                    type= "number"
                    value= {input.def}
                    name = "def"
                    onChange={(e) => handleChange(e)}
                    />
                        {errors.def && (
                        <p className="error">{errors.def}</p>
                    )}
                </div>
                <div>
                    <label>Speed:</label>
                    <input
                    type= "number"
                    value= {input.speed}
                    name = "speed"
                    onChange={(e) => handleChange(e)}
                    />
                        {errors.speed && (
                        <p className="error">{errors.speed}</p>
                    )}
                </div>
                <div>
                    <label>Height:</label>
                    <input
                    type= "number"
                    value= {input.height}
                    name = "height"
                    onChange={(e) => handleChange(e)}
                    />
                        {errors.height && (
                        <p className="error">{errors.height}</p>
                    )}
                </div>
                <div>
                    <label>Weight:</label>
                    <input
                    type= "number"
                    value= {input.weight}
                    name = "weight"
                    onChange={(e) => handleChange(e)}
                    />
                        {errors.weight && (
                        <p className="error">{errors.weight}</p>
                    )}
                </div>
                <div>
                    <label>Picture:</label>
                    <input
                    type= "text"
                   // value= {input.img}
                    name = "img"
                    onChange={(e) => handleChange(e)}
                    />
                </div>
                <select className="select-button" onChange={(e) => handleSelect(e)}>
                    {tipos.map((tip) =>(
                        <option value={tip.name}>{tip.name}</option>
                    ))}
                </select>
                <ul className="listCenter"><li className="listCenter">{input.tipos.map(e => e + " ")}</li></ul>
                <div className="created-butt-div">
                <button  disabled={Object.entries(errors).length? true : false} className="created-butt" type='submit'><span>Create Pokemon</span></button>
                </div> 
            </form>
            <div className="divTip">
            {input.tipos.map(e =>
                <div className="delete-type-cont">
                    <p>{e}</p>
                    <button className="delete-type-button" onClick={() => handleDelete(e)}>x</button>
                    </div>
                )}</div>           
        </div>
    )
}


