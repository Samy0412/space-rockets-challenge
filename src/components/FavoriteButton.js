import React  from 'react'
import { Button } from "@chakra-ui/core"
import { FaStar, FaPlus, FaTimes} from "react-icons/fa"
import "../styles/FavoriteButton.scss"

//Context API
import { useDataLayerValue }  from './DataLayer'

function FavoriteButton({launch, drawer, left, top}) {
  
  const [ {favorites} ,dispatch ] = useDataLayerValue();


  const addFavorite = (launch)=>{
    dispatch ({
      type:'ADD_FAVORITE',
      favorite: launch
    })
  }
  const removeFavorite = (launch)=>{
    dispatch ({
      type:'DELETE_FAVORITE',
      favorite: launch
    })
  }

  const isFavorite = (launch)=> {
    let isFavorite = false;
    favorites.forEach((favorite)=> {
      if(favorite.flight_number === launch.flight_number) isFavorite = true;
    })
  return isFavorite;
  }


  const handleFavoriteClick = (launch)=> {
    isFavorite(launch) && removeFavorite(launch);
    !isFavorite(launch) && addFavorite(launch);
  }

  return (
    <div>
      {!drawer ?(
        <Button
        backgroundColor="black"
        color="#dfe5f0"
        height="2rem"
        fontSize="0.85rem"
        fontWeight="600"
        borderRadius="1rem"
        position="absolute"
        top={top || "2"}
        left={left || "2"}
        leftIcon={isFavorite(launch)? FaStar : FaPlus}
        _hover={{transform: "scale(1.05)"}}
        _focus={{outline:"none"}}
        className={isFavorite(launch)? "svg" : ""}
        onClick={()=> handleFavoriteClick(launch)}
        >
          {isFavorite(launch)? "Favorite" : "Add to favorites"}
        </Button>
        ):
        (
        <Button
        backgroundColor="black"
        color="#dfe5f0"
        fontSize="0.85rem"
        fontWeight="600"
        borderRadius="0 0 1rem 0"
        leftIcon={FaTimes}
        _hover={{transform: "scale(1.05)"}}
        _focus={{outline:"none"}}
        onClick={()=> handleFavoriteClick(launch)}
        >
          Delete
        </Button>
         )}
       
    </div>
  )
}

export default FavoriteButton
