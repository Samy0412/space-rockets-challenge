import React  from 'react'
import { Button } from "@chakra-ui/core"
import { FaStar, FaPlus, FaTimes} from "react-icons/fa"
import "../styles/FavoriteButton.scss"

function FavoriteButton({top,left, launch, addFavorite, removeFavorite, favorites, drawer}) {
  
  
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
        zIndex="100"
        position="absolute"
        top={top}
        left={left}
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
        color="white"
        fontSize="15px"
        borderRadius="0 0 1rem 0"
        zIndex="100"
        position="absolute"
        top="-10"
        left="-10"
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
