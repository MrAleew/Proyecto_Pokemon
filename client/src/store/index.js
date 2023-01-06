import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk';
import rootReducer from "../reducer";


export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))// la idea de todo esto es una libreria para evitar escribir o traerme ese trolo de window