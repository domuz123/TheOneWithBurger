import React from 'react'
import BurgerIngredient from '../../components/BurgerIngredient/BurgerIngredient'
import './BurgerBuilder.css'


const burgerIngredients = (props) => {

    let selectedIngredients = Object.keys(props.ingredients)
    .map(ingKey => {
        return [...Array(props.ingredients[ingKey])].map((_, index) => {
            return <BurgerIngredient key={ingKey + index} type={ingKey} />
        })
    }).reduce((arr, el) => {
        return arr.concat(el)
    }, [])
  
   

return (
<div className='Burger'>
     
    <BurgerIngredient type='bread-top'/>
     {selectedIngredients.length < 1 ? (
         <p> <strong> Please Insert some ingredients! </strong> </p>
     ) : selectedIngredients}
    <BurgerIngredient type='bread-bottom'/>
</div>
)
}


export default burgerIngredients