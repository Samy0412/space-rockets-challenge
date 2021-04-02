import React  from 'react'
import { Button } from "@chakra-ui/core"
import { FaStar, FaPlus, FaTimes} from "react-icons/fa"
import "../styles/FavoriteButton.scss"

//Context API
import { useDataLayerValue }  from './DataLayer'

function FavoriteButton({id, item, category, drawer, left, top}) {
  
  const [ {favorites} ,dispatch ] = useDataLayerValue();

  
  const addFavorite = (item, category)=>{
    dispatch ({
      type:'ADD_FAVORITE',
      favorite: item,
      category
    })
  }
  const removeFavorite = (id, item, category)=>{
    dispatch ({
      type:'DELETE_FAVORITE',
      favorite: item,
      category,
      id
    })
  }

  const isFavorite = (id, item, category)=> {
    let isFavorite = false;
    favorites[category].forEach((favorite)=> {
      if(favorite[id] === item[id]) isFavorite = true;
    })
  return isFavorite;
  }

  const handleFavoriteClick = (id, item, category)=> {
    isFavorite(id, item, category) ? removeFavorite(id, item, category): addFavorite( item, category)
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
        top={top || "0"}
        left={left || "0"}
        leftIcon={isFavorite(id, item, category)? FaStar : FaPlus}
        _hover={{transform: "scale(1.05)"}}
        _focus={{outline:"none"}}
        className={isFavorite(id, item, category)? "svg" : ""}
        onClick={()=> handleFavoriteClick(id, item, category)}
        >
          {isFavorite(id, item, category)? "Favorite" : "Add to favorites"}
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
        position="absolute"
        top="0"
        left="0"
        _hover={{transform: "scale(1.05)"}}
        _focus={{outline:"none"}}
        onClick={()=> handleFavoriteClick(id, item, category)}
        >
          Delete
        </Button>
         )}
       
    </div>
  )
}

export default FavoriteButton
