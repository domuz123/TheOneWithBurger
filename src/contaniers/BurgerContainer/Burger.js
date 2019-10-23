import React, { Component } from 'react'
import BurgerBuilder from './BurgerBuilder'
import BurgerControls from '../../components/BurgerControls/BurgerControls'
import IngredientsSummary from '../../components/IngredientsSummary/IngredientsSummary';
import Modal from '../../components/Modal/Modal'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import axios from '../../axios-orders'
import Spinner from '../../components/Spinner/Spinner'
import errorHandler from '../../components/errorHandler/errorHandler'
import {connect} from 'react-redux'


class Burger extends Component {

    state = {
        purchesed: false,
        purshesable: false,
        drawer: false,
        loading: false,
        error: false
    }

    componentDidMount (){
        // axios.get('https://burgerreplic.firebaseio.com/Ingredients.json')
        // .then(response => this.setState({
        //     ingredients: response.data
        // }))
        // .catch(error => {
        //     this.setState({
        //         error: true
        //     })
        // } )
    }

  

    // addIngredientHandler = (type) => {
    //     const oldState = this.state.ingredients[type]
    //     const updatedState = oldState + 1
    //     const updatedIngredients = {...this.state.ingredients}
    //     updatedIngredients[type] = updatedState
        
    //     let newPrice = INGREDIENT_PRICE[type]
    //     let startingPrice = this.state.totalPrice
    //     let price = newPrice + startingPrice
      

    //     this.setState({
    //        ingredients: updatedIngredients,
    //        totalPrice: price
    //     })
  
    //     this.handlePurchese(updatedIngredients)
       
    //     console.log(price)
    // }

    // removeIngredientHandler = (type) => {
    //     const oldState = this.state.ingredients[type]
    //     if(oldState >= 1) {
    //     const updatedState = oldState - 1
    //     const updatedIngredients = {...this.state.ingredients}
    //     updatedIngredients[type] = updatedState
        
    //     let newPrice = INGREDIENT_PRICE[type]
    //     let startingPrice = this.state.totalPrice
    //     let price = startingPrice - newPrice
      

    //     this.setState({
    //        ingredients: updatedIngredients,
    //        totalPrice: price
    //     })
    //     this.handlePurchese (updatedIngredients)
    //    }
      
      
    // }>
    handlePurchese = (ing) => {
      

        this.setState ({
            purchesed: this.props.ing > 0
        })
          
     console.log(this.state.purchesed)
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
        for( let i in this.props.ing) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ing[i]))
        }
        queryParams.push('price=' + this.props.total)
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        })       
    }

  
    
    render() {
   
     const sum = Object.values(this.props.ing)  
        .map(ingKey => {
            return ingKey
        } ).reduce((sum, el ) => {
            return sum + el
        }, 0)
console.log(sum)

     let disabledLess = {...this.props.ing}
     for(let key in disabledLess) { disabledLess[key] = disabledLess[key] <= 0}

    let orderSummary = null;
    let burgerBuilder = this.state.error ? <p>Ingredients can't load</p> : <Spinner />
    if(this.props.ing) {
      burgerBuilder =  (
      <div>
     <BurgerBuilder  ingredients={this.props.ing} />
     <BurgerControls  total={this.props.total}
      added={this.props.addIngredientHandler}
      removed={this.props.removeIngredientHandler}
      purchesed = {sum}
      disabled = {disabledLess}
      showModal = {this.handleShowModal}  
      /> 
      </div>
     )

     orderSummary  = <IngredientsSummary 
     total={this.props.total} 
     ingredients={this.props.ing} 
     closeModal={this.handleCloseModal}
     handleContinue={this.handleContinuePurchase}/>
      
    }

    if(this.state.loading) {
        orderSummary = <Spinner />
    }

        return (
            <div style={{marginTop: '100px'}}>
                
    <Toolbar drawer={this.props.drawer} 
             handleDrawerState={this.props.handleDrawerState}/>
  
    <Modal 
     closeModal={this.handleCloseModal}
     purchesable={this.state.purchesable} 
     total={this.props.total}
     ingredients={this.props.ing} > 
      {orderSummary} 
     </Modal>
     {burgerBuilder}    
            </div>
        )
    }
}
const mapStateToProps = state => {
    console.log(state.ingredients)
    return{ 
        ing: state.ingredients,
        total: state.totalPrice,
        drawer: state.drawer
    }  }

const mapDispatchToProps = dispatch =>({
addIngredientHandler: (ingName) => dispatch({type: 'ADD_INGREDIENT', ingredientName: ingName}),
removeIngredientHandler: (ingName) => dispatch({type: 'REMOVE_INGREDIENT', ingredientName: ingName}),
handleDrawerState: () => dispatch({type: 'HANDLE_DRAWER'}),
})


export default connect(mapStateToProps,mapDispatchToProps )(errorHandler(Burger,axios))