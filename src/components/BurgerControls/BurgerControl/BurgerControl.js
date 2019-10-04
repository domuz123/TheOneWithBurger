import React from 'react'
import './BurgerControl.css'


const burgerControl = (props) => (
    
    <div className='BurgerControl'>
        <div className='Label'>{props.label}</div>
        <button className='Less' 
         onClick = {props.ingredientRemoved} 
         disabled={props.disabled}
        >Less</button>
        <button className='More' 
        onClick ={props.ingredientAdded} 
       
        >More</button>
    </div>
)

export default burgerControl