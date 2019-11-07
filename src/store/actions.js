import * as actionTypes from './actionTypes'
import axios from 'axios'

export const addIngredient = (ingName) => {
   return { type: actionTypes.ADD_INGREDIENT,
             ingredientName: ingName }
}

export const removeIngredient = (ingName) => {
    return { type: actionTypes.REMOVE_INGREDIENT,
              ingredientName: ingName }
 }

 export const handleDrawerState = () => {
     return {
         type: actionTypes.HANDLE_DRAWER
     }
 }

 export const initIngredients = (ingredients) => {
     return {
         type: actionTypes.INIT_INGREDIENTS,
         ingredients: ingredients
     }
 }

 export const fetchIngredientsFailed = () => {
     return {
         type: actionTypes.FETCH_ERROR
     }
 }

 export const fetchIngredients = () => {
     return dispatch => {
        axios.get('https://burgerreplic.firebaseio.com/Ingredients.json')
        .then(response => {
            dispatch(initIngredients(response.data))
        })
        .catch(error => {
            dispatch(fetchIngredientsFailed())
        })
     }
 }



 // Order actions 