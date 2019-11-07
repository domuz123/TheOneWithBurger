import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose, combineReducers} from "redux";
import { Provider } from "react-redux"; 

import thunk from "redux-thunk";
import reducer from './store/reducers'

const rootReducer = reducer

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
))
ReactDOM.render(<Provider store = {store}> <App/> </Provider>, document.getElementById('root'));


serviceWorker.unregister();
