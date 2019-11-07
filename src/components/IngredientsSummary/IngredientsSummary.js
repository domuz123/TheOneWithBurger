import React from 'react';
import './IngredientsSummary.css'

const ingredientsSummary = (props) => {

  const ingredientsList = Object.keys(props.ingredients)
  .map(ingKey => {
         return <li style= {{textTransform: 'capitalize'}} key={ingKey}> 
         <strong> {ingKey}</strong>:
         <span> {props.ingredients[ingKey]} </span>
         </li> 
    
  })
 

 return (<div className='Ingredients'>
   
    <p> <strong> Your Order:</strong> </p>
    <div className='IngredientsList'> {ingredientsList} </div>
    <p>Total price: {props.total.toFixed(2)}$</p>
    <button  
    onClick = {() => props.closeModal()}>Cancel</button>
    <button 
    onClick={() => props.handleContinue()}>Continue</button>
</div>
)

}



export default ingredientsSummary