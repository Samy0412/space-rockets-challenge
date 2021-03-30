import React from 'react'
import {
  IconButton,
  Heading,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Box,
  Flex,
  SimpleGrid,
  Tooltip,
} from "@chakra-ui/core";
import { FaStar } from "react-icons/fa"
import {LaunchItem} from "./launches"

function FavoritesDrawer({favorites, removeFavorite, FavoriteButton}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <>
      <Tooltip  hasArrow placement="bottom" label="Favorites">
      <IconButton ref={btnRef} variant="outline" aria-label="favorites" onClick={onOpen} icon={FaStar} fontSize="30px" color="rgb(223, 205, 9)" _focus={{outline:"none"}}>
        Open
      </IconButton>
      </Tooltip>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size={"sm"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton _focus={{outline:"none"}}/>
          <Flex align="center" justify="center">
          <Box as={FaStar} size="25px" color="rgb(223, 205, 9)"/>
          <DrawerHeader textAlign="center">Your favorites</DrawerHeader>
          <Box as={FaStar} size="25px" color="rgb(223, 205, 9)"/>
          </Flex>
          
          <DrawerBody   marginTop="5" overflow="auto">
            {favorites.length? (
              <>
           <Heading as="h3" fontSize="1.1rem" fontWeight="500" marginBottom="5">
            Launches({favorites.length})
           </Heading>
           <SimpleGrid columns={1} spacing="5" >
           {favorites &&
             favorites
             .flat()
             .map((launch) => (
              <LaunchItem launch={launch} key={launch.flight_number} removeFavorite={removeFavorite} FavoriteButton={FavoriteButton} favorites={favorites} drawer/>
            ))}
          </SimpleGrid>
          </>
             ):(
            <Flex  justify="center" marginTop="50px">
          <Heading as="h3" fontSize="1rem" fontWeight="500">
          You have no favorites at the moment.
          </Heading>
          </Flex>
          )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default FavoritesDrawer
