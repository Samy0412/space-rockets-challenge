import React, { useState, useEffect } from 'react'
import { Button } from "@chakra-ui/core"
import { FaStar, FaPlus } from "react-icons/fa"
import "../styles/FavoriteButton.scss"

function FavoriteButton({top,left, launch, addFavorite, removeFavorite, favorites}) {
  
  //State of the button
  const [favorite, setFavorite]= useState(
    launch.flight_number === 108 ? true : false
  )

//  useEffect(()=>{
//   favorites.forEach((favorite)=> {
//     if (favorite.flight_number === launch.flight_number) setFavorite(true);
//   })
//   setFavorite(false);
//  },[])
  
    

  const handleFavoriteClick = (launch)=> {
    favorite && removeFavorite(launch);
    !favorite && addFavorite(launch);
    setFavorite(!favorite);
  }

  return (
    <div>
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
       leftIcon={favorite? FaStar : FaPlus}
       _hover={{transform: "scale(1.05)"}}
       _focus={{outline:"none"}}
       className={favorite? "svg" : ""}
       onClick={()=> handleFavoriteClick(launch)}
       >
         {favorite? "Favorite" : "Add to favorites"}
       </Button>
    </div>
  )
}

export default FavoriteButton
