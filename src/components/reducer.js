export const initialState = {
 favorites:{},
}

const reducer = (state, action) => {

const { favorite, category, id } = action;

const saveToLocalStorage = (items)=> {
  localStorage.setItem("favorites", JSON.stringify(items))
}

const favoritesCategories = state.favorites ? Object.keys(state.favorites): [];

switch(action.type) {
  case 'SET_FAVORITES':
    return {
      ...state,
      favorites:action.favorites
    }

  case 'ADD_FAVORITE':
    let arrayAfterAdd = favoritesCategories.includes(category)? [...state.favorites[category], favorite] : [favorite];
    //Save it locally
    saveToLocalStorage({...state.favorites, [category]: arrayAfterAdd})
    return {
      ...state,
      favorites: {...state.favorites, [category]: arrayAfterAdd}
    }
      
  case 'DELETE_FAVORITE':
    let arrayAfterDelete = state.favorites[category].filter((favorite)=> favorite[id] !== action.favorite[id])
    //Save it locally
    saveToLocalStorage({...state.favorites, [category]: arrayAfterDelete})
    return {
      ...state,
      favorites: {...state.favorites, [category]: arrayAfterDelete}
    }

   default: 
   return state; 
}

}

export default reducer;