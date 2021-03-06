import React, { useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";

//Chakra UI components
import { Flex, Text, Image } from "@chakra-ui/core";

//App components
import { Launches } from "./launches";
import Launch from "./launch";
import Home from "./home";
import LaunchPads from "./launch-pads";
import LaunchPad from "./launch-pad";
import FavoritesDrawer from "./FavoritesDrawer";

//Context API
import { useDataLayerValue } from "./DataLayer";

export default function App() {
  const [{ favorites }, dispatch] = useDataLayerValue();

  //retrieves the favorites stored in localStorage each time the app opens
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites"));
    dispatch({
      type: "SET_FAVORITES",
      favorites: storedFavorites,
    });
  }, [dispatch]);
  ///////
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/launches" element={<Launches />} />
        <Route path="/launches/:launchId" element={<Launch />} />
        <Route path="/launch-pads" element={<LaunchPads />} />
        <Route path="/launch-pads/:launchPadId" element={<LaunchPad />} />
      </Routes>
    </div>
  );
}

function NavBar() {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="6"
      bg="gray.800"
      color="white"
      position="sticky"
      top="0"
      zIndex="2"
    >
      <Link to="/">
        <Flex align="center">
          <Image
            src="../rocket-128.png"
            alt="Rocket"
            size="45px"
            marginRight="20px"
          />
          <Text
            fontFamily="mono"
            letterSpacing="2px"
            fontWeight="bold"
            fontSize="lg"
          >
            ¡SPACE·R0CKETS!
          </Text>
        </Flex>
      </Link>
      <FavoritesDrawer />
    </Flex>
  );
}
