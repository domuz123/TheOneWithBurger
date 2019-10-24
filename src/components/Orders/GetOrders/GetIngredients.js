import React, { Component } from 'react'
import Order from './Order'
import axios from '../../../axios-orders'
import Toolbar from '../../Navigation/Toolbar/Toolbar'
import './GetIngredients.css'
import {connect} from 'react-redux'

class GetIngredients extends Component {

    state = {
        orders: [],
        loading: false,
        error: false
    }
    componentDidMount() {
        axios.get('/orders.json')
        .then(res => {
            const fetchedOrders = []
            for (let key in res.data) {
                fetchedOrders.push({...res.data[key], id: key})
            }
            this.setState({loading: false, orders: fetchedOrders})
        })
        .catch(err=>{
            this.setState({loading: true, error: true})
        })
    }
    render() {
        return (
            <div>
                <div> 
                <Toolbar  drawer={this.props.drawer} 
          handleDrawerState={this.props.handleDrawerState}/>
                </div>
                <div className='Orders'> 
               {this.state.orders.map(order => (
                   <Order  key={order.id} 
                           ingredients={order.ingredients}
                           price ={order.price} />
                   )
               )}
               </div>
            </div>
        )
    }
}

const mapStateToProps = state => {    
    return{ 
        ing: state.ingredients,
        total: state.totalPrice,
        drawer: state.drawer
    }  }    

const mapDispatchToProps = dispatch =>({
handleDrawerState: () => dispatch({type: 'HANDLE_DRAWER'})
    })

export default connect(mapStateToProps,mapDispatchToProps)( GetIngredients)