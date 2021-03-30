import React, {useState} from "react";
import { Routes, Route } from "react-router-dom";
import { Flex, Text } from "@chakra-ui/core";

import {Launches} from "./launches";
import Launch from "./launch";
import Home from "./home";
import LaunchPads from "./launch-pads";
import LaunchPad from "./launch-pad";
import FavoriteButton from "./FavoriteButton";
import FavoritesDrawer from "./FavoritesDrawer";

export default function App() {
  //States
  const [favorites,setFavorites]=useState([])
  
  const addFavorite = (launch)=>{
    setFavorites([...favorites, launch])
  }
  const removeFavorite = (launch)=>{
    const newFavorites = favorites.filter((favorite)=> favorite.flight_number !== launch.flight_number )
    setFavorites(newFavorites);
  }
  
  return (
    <div>
      <NavBar favorites={favorites} removeFavorite={removeFavorite} FavoriteButton={FavoriteButton}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/launches" element={<Launches addFavorite={addFavorite} removeFavorite={removeFavorite} FavoriteButton={FavoriteButton} favorites={favorites}/>} />
        <Route path="/launches/:launchId" element={<Launch FavoriteButton={FavoriteButton} removeFavorite={removeFavorite} addFavorite={addFavorite} favorites={favorites}/>} />
        <Route path="/launch-pads" element={<LaunchPads />} />
        <Route path="/launch-pads/:launchPadId" element={<LaunchPad />} />
      </Routes>
    </div>
  );
}

function NavBar({favorites, removeFavorite, FavoriteButton}) {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="6"
      bg="gray.800"
      color="white"
    >
      <Text
        fontFamily="mono"
        letterSpacing="2px"
        fontWeight="bold"
        fontSize="lg"
      >
        ¡SPACE·R0CKETS!
      </Text>
      <FavoritesDrawer favorites={favorites} removeFavorite={removeFavorite} FavoriteButton={FavoriteButton}/>
    </Flex>
  );
}
