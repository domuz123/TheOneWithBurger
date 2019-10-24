import React from 'react'
import './Order.css'

const order = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
    
    .map(gkey => { 
        if(props.ingredients[gkey] > 0 )  
       { return <span 
        style={{textTransform:'capitalize', display: 'inlineBlock', padding:'10px', margin:'0 8px', border: '1px solid #ccc'}} 
        key={gkey}> {gkey} ({props.ingredients[gkey]}) </span>}

      
    })
    return (
    <div className='Order'>
        <p>Ingredients: {ingredientSummary}
        
        </p>
        <p>Total price: {parseFloat(props.price).toFixed(2)}</p>

    </div>
    )

}
export default order