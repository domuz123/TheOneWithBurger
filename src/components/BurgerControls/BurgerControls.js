import React from 'react'
import BurgerControl from './BurgerControl/BurgerControl'
import './BurgerControls.css'


const controls = [
    {label: 'Meat', type: 'meat'},
    {label: 'Salad', type: 'salad'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Bacon', type: 'bacon'}
];

const burgerControls = (props) => (

<div className='BurgerControls'>
<p> <strong>Burger price: </strong> {props.total.toFixed(2)}$ </p>
{controls.map(ctrl => (
<BurgerControl 
 type={ctrl.type} 
 label={ctrl.label} 
 key={ctrl.label}
 ingredientAdded={() => props.added(ctrl.type)}
 ingredientRemoved = {() => props.removed(ctrl.type)}
 disabled={props.disabled[ctrl.type]}/>
  ))}

  <button className='OrderButton'
          disabled={!props.purchesed}
          onClick={() => props.showModal()}
         
          >Order now! </button>
   </div>


)


export default burgerControls