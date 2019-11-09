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
import * as action from '../../store/actions/index'


class Burger extends Component {

    state = {
        purchesed: false,
        purshesable: false,
        drawer: false,
        loading: false,
    
    }

    componentDidMount (){
       this.props.fetchIngredients()
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
//      const sum = Object.values(this.props.ing)  
//         .map(ingKey => {
//             return ingKey
//         } ).reduce((sum, el ) => {
//             return sum + el
//         }, 0)
// console.log(sum)
      console.log(this.props.ing)
     let disabledLess = {...this.props.ing}
     for(let key in disabledLess) { disabledLess[key] = disabledLess[key] <= 0}

    let orderSummary = null;
    let burgerBuilder = this.props.error ? <p>Ingredients can't load</p> : <Spinner />
    if(this.props.ing) {
      burgerBuilder =  (
      <div>
     <BurgerBuilder  ingredients={this.props.ing} />
     <BurgerControls  total={this.props.total}
      added={this.props.addIngredientHandler}
      removed={this.props.removeIngredientHandler}
      purchesed = {this.props.total > 3}
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
    return{ 
        ing: state.BurgerReducer.ingredients,
        total: state.BurgerReducer.totalPrice,
        drawer: state.BurgerReducer.drawer,
        error: state.BurgerReducer.error,
    
    }  }

const mapDispatchToProps = dispatch =>({
addIngredientHandler: (ingName) => dispatch(action.addIngredient(ingName)),
removeIngredientHandler: (ingName) => dispatch(action.removeIngredient(ingName)),
handleDrawerState: () => dispatch(action.handleDrawerState()),
fetchIngredients: () => dispatch(action.fetchIngredients()),
purchaseInit: () => dispatch(action.purchaseInit())
})


export default connect(mapStateToProps,mapDispatchToProps )(errorHandler(Burger,axios))