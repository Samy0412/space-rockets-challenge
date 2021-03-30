export const initialState = {
 favorites:[],
}

const reducer = (state, action) => {

switch(action.type) {
  case 'ADD_FAVORITE':
    return {
      ...state,
      favorites:[...state.favorites,action.favorite]
    }
      
  case 'DELETE_FAVORITE':
    return {
      ...state,
      favorites: state.favorites.filter((favorite)=> favorite.flight_number !== action.favorite.flight_number )
    }

   default: 
   return state; 
}

}

export default reducer;