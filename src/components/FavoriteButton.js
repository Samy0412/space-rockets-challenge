import React, { useState } from 'react'
import { Button } from "@chakra-ui/core"
import { FaStar, FaPlus } from "react-icons/fa"
import "../styles/FavoriteButton.scss"

function FavoriteButton({top,left}) {
  const [favorite, setFavorite]= useState(false);
  const toggle = ()=> setFavorite(!favorite);
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
       onClick={toggle}
       _hover={{transform: "scale(1.05)"}}
       _focus={{outline:"none"}}
       className={favorite? "svg" : ""}
       >
         {favorite? "Favorite" : "Add to favorites"}
       </Button>
    </div>
  )
}

export default FavoriteButton
