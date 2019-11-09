import React, {Component} from 'react'
import Checkoutsummary from '../../components/Orders/Checkoutsummary/Checkoutsummary'
import {Route, Redirect} from 'react-router-dom'
import Contactdata from '../Contactdata/Contactdata'
import {connect} from 'react-redux'



 class Checkout extends Component {



    componentWillMount () {
        //    const query = new URLSearchParams(this.props.location.search);
        //    const ingredients = {}
        //    let price = 0;
        //    for(let param of query.entries()) {

        //     if(param[0] === 'price') {
        //     price = param[1]
        //     }
        //     else {
        //         ingredients[param[0]] =+ param[1]   
        //     }
                 
        //    }
          
        //    this.setState({ingredients:ingredients, totalPrice: price})
       }

checkoutCancelledHandler = () => {
this.props.history.goBack()
}

checkoutContinuedHandler = () => {
this.props.history.replace('checkout/contact-data')
}
    render ()

   {
       let summary = <Redirect to = '/' />
  
        if(this.props.ing) {
        summary = ( <div> 
            <Checkoutsummary ingredients={this.props.ing} 
            total={this.props.total}
checkoutCancel={this.checkoutCancelledHandler}
checkoutContinue={this.checkoutContinuedHandler}
/>
<Route path={this.props.match.path + '/contact-data'}
    component={Contactdata} /> </div>
         )
        }
    

    return (
        <div>
             {summary}
             
        </div>
    )
}}


const mapStateToProps = state => {
    return{ 
        ing: state.BurgerReducer.ingredients,
        total: state.BurgerReducer.totalPrice,
        drawer: state.BurgerReducer.drawer
    }  }
    
export default connect(mapStateToProps)(Checkout)