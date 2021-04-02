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
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/core";
import { FaStar } from "react-icons/fa"
import {LaunchItem} from "./launches"

//Context API
import { useDataLayerValue }  from './DataLayer'

function FavoritesDrawer() {

  const [ {favorites}] = useDataLayerValue();

  const favoritesCategories = Object.keys(favorites)

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <>
      <Tooltip  hasArrow placement="bottom" label="Favorites" zIndex="200">
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

            <Accordion allowToggle >
              {favoritesCategories && favoritesCategories.map((category)=> (
                    <AccordionItem >
                    <AccordionHeader _focus={{outline:"none"}}>
                    <Box flex="1" textAlign="left">
                    {category}({favorites[category]?.length})
                    </Box>
                    <AccordionIcon />
                    </AccordionHeader>
                    <AccordionPanel pb={4}>
                      { favorites[category]?.length? (
                        <>
                      <SimpleGrid columns={1} spacing="5" >
                      {/* for now this section has to be copied and adapted for each category of favorites that is added to the drawer */}
                      {category === "launches" &&
                      favorites[category]
                      .flat()
                      .map((favorite) => (
                        <LaunchItem launch={favorite} key={favorite.flight_number} drawer/>
                      ))}
                       {/* ************ */}
                      </SimpleGrid>
                        </>
                      ):(
                      <Flex  justify="center" marginTop="50px">
                      <Heading as="h3" fontSize="1rem" fontWeight="500">
                      You have no favorites at the moment.
                      </Heading>
                      </Flex>
                      )}
                    </AccordionPanel>
                  </AccordionItem>
              ))}
            
            </Accordion>
           
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default FavoritesDrawer
