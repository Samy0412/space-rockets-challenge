export const initialState = {
 favorites:[],
}

const reducer = (state, action) => {

const saveToLocalStorage = (items)=> {
  localStorage.setItem("favorites", JSON.stringify(items))
}

switch(action.type) {

  case 'SET_FAVORITES':
    return {
      ...state,
      favorites:action.favorites
    }

  case 'ADD_FAVORITE':
    const addFavorite = [...state.favorites,action.favorite];
    //Save it locally
    saveToLocalStorage(addFavorite)
    return {
      ...state,
      favorites: addFavorite
    }
      
  case 'DELETE_FAVORITE':
    const deleteFavorite = state.favorites.filter((favorite)=> favorite.flight_number !== action.favorite.flight_number )
      //Save it locally
    saveToLocalStorage(deleteFavorite)
    return {
      ...state,
      favorites: deleteFavorite
    }

   default: 
   return state; 
}

}

export default reducer;