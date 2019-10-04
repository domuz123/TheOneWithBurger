import React, { Component } from 'react'
import BurgerBuilder from './BurgerBuilder'
import BurgerControls from '../../components/BurgerControls/BurgerControls'
import IngredientsSummary from '../../components/IngredientsSummary/IngredientsSummary';
import Modal from '../../components/Modal/Modal'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import axios from '../../axios-orders'
import Spinner from '../../components/Spinner/Spinner'
import errorHandler from '../../components/errorHandler/errorHandler'


const INGREDIENT_PRICE = {
    salad: 0.4,
    meat: 1.2,
    bacon: 0.7,
    cheese: 0.6
}

class Burger extends Component {

    state = {
        ingredients: null,
        totalPrice: 2,
        purchesed: false,
        purshesable: false,
        drawer: false,
        loading: false,
        error: false
    }

    componentDidMount (){
        axios.get('https://burgerreplic.firebaseio.com/Ingredients.json')
        .then(response => this.setState({
            ingredients: response.data
        }))
        .catch(error => {
            this.setState({
                error: true
            })
        } )
    }

    handlePurchese (ingredients) {
       
        const sum = Object.keys(ingredients)
        .map(ingKey => {
            return ingredients[ingKey]
        } ).reduce((sum, el ) => {
            return sum + el
        }, 0)

        this.setState ({
            purchesed: sum > 0
        })
          
        console.log(sum)

    }

    addIngredientHandler = (type) => {
        const oldState = this.state.ingredients[type]
        const updatedState = oldState + 1
        const updatedIngredients = {...this.state.ingredients}
        updatedIngredients[type] = updatedState
        
        let newPrice = INGREDIENT_PRICE[type]
        let startingPrice = this.state.totalPrice
        let price = newPrice + startingPrice
      

        this.setState({
           ingredients: updatedIngredients,
           totalPrice: price
        })
  
        this.handlePurchese(updatedIngredients)
       
        console.log(price)
    }

    removeIngredientHandler = (type) => {
        const oldState = this.state.ingredients[type]
        if(oldState >= 1) {
        const updatedState = oldState - 1
        const updatedIngredients = {...this.state.ingredients}
        updatedIngredients[type] = updatedState
        
        let newPrice = INGREDIENT_PRICE[type]
        let startingPrice = this.state.totalPrice
        let price = startingPrice - newPrice
      

        this.setState({
           ingredients: updatedIngredients,
           totalPrice: price
        })
        this.handlePurchese (updatedIngredients)
       }
      
      
    }

  handleShowModal = () => {
      this.setState({purchesable: true})
  }
  
  handleCloseModal = () => {
    this.setState({purchesable: false})
}

handleDrawerState = () => {
  
    this.setState((prevState) => {
    return {
        drawer: !prevState.drawer
    }
    }) }

    handleContinuePurchase = () => {
        // this.setState({loading: true})
        // const order ={
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //          name: 'Ivan',
        //          address: {street: 'Višići', ZIP: '00000'},
        //          email: 'iva@.com',
        //     },
         
        //     deliveryMethod: 'Fastest'
        // }
        // axios.post('/orders.json', order)
        // .then(response => {this.setState({
        //     loading: false, purchesable:false
        // })})
        // .catch(error =>{this.setState({
        //     loading: false, purchesable:false
        // })});

        const queryParams = []
        for( let i in this.state.ingredients ) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push('price=' + this.state.totalPrice)
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        })       
    }

  
    
    render() {
     let disabledLess = {...this.state.ingredients}
     for(let key in disabledLess) { disabledLess[key] = disabledLess[key] <= 0}

    let orderSummary = null;
    let burgerBuilder = this.state.error ? <p>Ingredients can't load</p> : <Spinner />
    if(this.state.ingredients) {
      burgerBuilder =  (
      <div>
     <BurgerBuilder   ingredients={this.state.ingredients} />
     <BurgerControls  total={this.state.totalPrice}
      added={this.addIngredientHandler}
      removed={this.removeIngredientHandler}
      purchesed = {this.state.purchesed}
      disabled = {disabledLess}
      showModal = {this.handleShowModal}  
      /> 
      </div>
     )

     orderSummary  = <IngredientsSummary 
     total={this.state.totalPrice} 
     ingredients={this.state.ingredients} 
     closeModal={this.handleCloseModal}
     handleContinue={this.handleContinuePurchase}/>
      
    }

    if(this.state.loading) {
        orderSummary = <Spinner />
    }

        return (
            <div style={{marginTop: '100px'}}>
                
                <Toolbar drawer={this.state.drawer} 
                         handleDrawer={this.handleDrawerState}/>
  
    <Modal 
     closeModal={this.handleCloseModal}
     purchesable={this.state.purchesable} 
     total={this.state.totalPrice}
     ingredients={this.state.ingredients} > 
      {orderSummary} 
     </Modal>
     {burgerBuilder}    
            </div>
        )
    }
}


export default errorHandler(Burger,axios)