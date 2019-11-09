import React, {Component} from 'react';
import axios from '../../axios-orders'
import Spinner from '../../components/Spinner/Spinner'
import Input from '../../components/Input/Input'
import {connect} from 'react-redux'
import './Contactdata.css'
import * as action from '../../store/actions/index'

class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                   elementType:'input',
                   elementConfig: {
                       type: 'text',
                       placeholder: 'Your name'
                   },
                   value: '',
                   validation: {
                    required: true
                },
                valid: false,
                touched: false,
                },
                street: {
                    elementType:'input',
                     elementConfig: {
                         type: 'text',
                         placeholder: 'Street'
                     },
                     value: '',
                     validation: {
                        required: true
                    },
                    valid: false,
                    touched: false,
                  },
            zipCode: {
                elementType:'input',
                 elementConfig: {
                     type: 'text',
                     placeholder: 'Zip Code'
                 },
            
                 value: '',

                 validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                },
                valid: false,
                touched: false,
              },
            country: {
                elementType:'input',
                 elementConfig: {
                     type: 'text',
                     placeholder: 'Country'
                 },
                 value: '',
                 validation: {
                    required: true
                },
                valid: false,
                touched: false,
              },
            email: {
                elementType:'input',
                 elementConfig: {
                     type: 'email',
                     placeholder: 'Email'
                 },
                 value: '',
                 validation: {
                     required: true
                 },
                 valid: false,
                 touched: false,
              },

              deliverMethod: {
                  elementType:'select',
                  elementConfig: {
                      options: [
                          {value: 'fastest', displayValue: 'Fastest'}, 
                          {value: 'cheapest', displayValue: 'Cheapest'}

                      ]
                  },
                  value:'',
                  valid: true, 
                  validation: {},   
              }
        },
        formIsValid: false,
     
    }


    checkValidity (value, rules) {
    
    
     let isValid = true;

     if(rules.required) {
         isValid = value.trim() !== '' && isValid
     }
     if(rules.minLength){
        isValid = value.length >= rules.minLength && isValid
    }
     if(rules.maxLength){
        isValid = value.length <= rules.maxLength && isValid
    }
     
     
     
     return isValid
    }

    handleOrder = (event) => {
        event.preventDefault();
          
        const formData = {};
        for(let formElementIndentifier in this.state.orderForm ) {
            formData[formElementIndentifier] = this.state.orderForm[formElementIndentifier].value
        }
  
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData
        }
      this.props.orderBurger(order)
    }

    inputChangeHandler = (event, inputIndentifier) => {

    const updatedOrderForm = {...this.state.orderForm}
    const updatedFormElement = {...updatedOrderForm[inputIndentifier]}

    updatedFormElement.value = event.target.value
    updatedOrderForm[inputIndentifier] = updatedFormElement
    updatedFormElement.touched = true;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
    
    let formValid = true
    for(let inputIndentifier in updatedOrderForm) {
       formValid = updatedOrderForm[inputIndentifier].valid && formValid
    }
    
    this.setState({
        orderForm: updatedOrderForm, formIsValid: formValid
    })
    }  



render () {

    const formElementsArray = [];

    for(let key in this.state.orderForm) {
        formElementsArray.push(
             { id: key,
               config: this.state.orderForm[key]
            }
        )
       
    }



 let form = (<form onSubmit={this.handleOrder} >
  
    {formElementsArray.map( formElement => (  
    <Input key={formElement.id}
           elementType= {formElement.config.elementType}
           elementConfig= {formElement.config.elementConfig}
           defaultValue= {formElement.config.value}
           changed={(event) => this.inputChangeHandler(event, formElement.id)}
           invalid={!formElement.config.valid}
           shouldValidate={formElement.config.validation}
           touched={formElement.config.touched}/>
    )
    )}
    <button className='OrderDataButton' onClick={this.handleOrder} disabled={!this.state.formIsValid}> Order</button>

</form>)
if(this.props.loading) {
    form = <Spinner />
}


    return (
 <div className='ContactData'>
<h4>Enter your Contact Data</h4>
    {form}


 </div>


    )
}

}

const mapeStateToProps = state => {
    return {
        ings: state.BurgerReducer.ingredients,
        price: state.BurgerReducer.totalPrice,
        loading: state.OrderReducer.loading
    }
}
const mapDispatchToProps = dispatch =>{
    return {
    orderBurger : (orderData) => dispatch(action.purchaseBurger(orderData))}

    }

export default connect(mapeStateToProps,mapDispatchToProps) (ContactData)