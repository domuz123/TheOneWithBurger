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

  

   
    handlePurchese = (ing) => {
      
        this.setState ({
            purchesed: this.props.ing > 0
        })
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

      this.props.history.push('/checkout')
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