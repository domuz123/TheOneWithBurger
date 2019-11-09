import * as actionTypes from '../actions/actionTypes'

const initialState = {
    ingredients: null,
    totalPrice: 3,
    drawer: false,
    error: false,
    loading: false
}

const INGREDIENT_PRICE = {
    salad: 0.4,
    meat: 1.2,
    bacon: 0.7,
    cheese: 0.6
}

const burgerReducer = (state = initialState, action) => {

switch(action.type){

    case actionTypes.ADD_INGREDIENT:
    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [action.ingredientName]: state.ingredients[action.ingredientName] +1
        },
         
        totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName]

    }
    case  actionTypes.REMOVE_INGREDIENT:
    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingredientName]

}
case actionTypes.HANDLE_DRAWER:
return {
    ...state,
    drawer: !state.drawer
}

case actionTypes.INIT_INGREDIENTS:
return {
    ...state,
    ingredients: action.ingredients,
    error:false, 
    totalPrice: 3
}

case actionTypes.FETCH_ERROR:
    return {
        ...state,
        error: true
    }

    default: return state } }

export default burgerReducer