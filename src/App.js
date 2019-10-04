import React,  {Component} from 'react';
import Burger from '../src/contaniers/BurgerContainer/Burger'
import Checkout from '../src/contaniers/Checkout/Checkout'
import {BrowserRouter, Route} from 'react-router-dom'

class App extends Component {
  render ()
 { 
   return(  

      <BrowserRouter> 
        
      <Route path='/' exact component = {Burger}/>
      <Route path='/checkout' component={Checkout}/>

     </BrowserRouter>

    )
}
}

export default App;