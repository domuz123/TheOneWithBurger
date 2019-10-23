const initialState = {
    ingredients: {
        ketchup: 0,
        mayonnaise: 0,
        salad: 0,
        meat: 0,
        cheese: 0,
        bacon: 0,
    },

    totalPrice: 1,
    drawer: false
}

const INGREDIENT_PRICE = {
    salad: 0.4,
    meat: 1.2,
    bacon: 0.7,
    cheese: 0.6
}

const reducer = (state = initialState, action) => {

switch(action.type){

    case 'ADD_INGREDIENT':
    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [action.ingredientName]: state.ingredients[action.ingredientName] +1
        },
         
        totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName]

    }
    case 'REMOVE_INGREDIENT':
    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingredientName]

}
case 'HANDLE_DRAWER':
return {
    ...state,
    drawer: !state.drawer
}

default:return state
} }




export default reducer