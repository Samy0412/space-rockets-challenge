export function isFavorite(launch){
  let isFavorite = false;
  favorites.forEach((favorite)=> {
    if(favorite.flight_number === launch.flight_number) isFavorite = true;
  })
return isFavorite;
}