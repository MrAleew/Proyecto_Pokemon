import './App.css';
import{BrowserRouter, Route, Switch} from 'react-router-dom';// esto lo hice yo
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import PokemonCreate from './components/PokemonCreate';
import Detail from './components/Detail';
import axios from 'axios';

axios.defaults.baseURL='http://localhost:3001/'

function App() {
  return (// envolvemos con el browserRoute
    <BrowserRouter>
    <div className="App">
      <Switch> {/* el switch es para cuando coloquemos un link que no existe nos lleve a la ultima ruta ejemplo /home/estonoexiste/1 el switch nos lleva a /home*/}
        {/* route para renderizar la landingpage*/}
        <Route exact path= '/' component={LandingPage}/>
        {/* route para renderizar el home*/}
        <Route exact path= '/home' component={Home}/>
        {/* route para la creacion de pokemon*/}
        <Route path = '/pokemons'  component={PokemonCreate} />
        <Route path={"/home/:id"} component={Detail} />
     
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
