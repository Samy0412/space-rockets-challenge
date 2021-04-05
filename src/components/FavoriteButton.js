import React, { useRef, useEffect } from "react";
import { IconButton, Tooltip } from "@chakra-ui/core";
import { FaRegStar, FaStar, FaTimes } from "react-icons/fa";
import mojs from "@mojs/core";

//Context API
import { useDataLayerValue } from "./DataLayer";

function FavoriteButton({
  id,
  item,
  category,
  drawer,
  left,
  right,
  top,
  bottom,
}) {
  const [{ favorites }, dispatch] = useDataLayerValue();

  //***handling the addition of removal of a favorite***//
  const addFavorite = (item, category) => {
    dispatch({
      type: "ADD_FAVORITE",
      favorite: item,
      category,
    });
  };
  const removeFavorite = (id, item, category) => {
    dispatch({
      type: "DELETE_FAVORITE",
      favorite: item,
      category,
      id,
    });
  };

  const isFavorite = (id, item, category) => {
    let isFavorite = false;
    favorites &&
      favorites[category].forEach((favorite) => {
        if (favorite[id] === item[id]) isFavorite = true;
      });
    return isFavorite;
  };

  //*******************************************************/

  //****Handling animation with Mojs******/
  const animDom = useRef();
  const animation = useRef();
  const star = useRef();
  const RADIUS = 60;

  class Star extends mojs.CustomShape {
    getShape() {
      return '<path d="M5.51132201,34.7776271 L33.703781,32.8220808 L44.4592855,6.74813038 C45.4370587,4.30369752 47.7185293,3 50,3 C52.2814707,3 54.5629413,4.30369752 55.5407145,6.74813038 L66.296219,32.8220808 L94.488678,34.7776271 C99.7034681,35.1035515 101.984939,41.7850013 97.910884,45.2072073 L75.9109883,63.1330483 L82.5924381,90.3477341 C83.407249,94.4217888 80.4739296,97.6810326 77.0517236,97.6810326 C76.0739505,97.6810326 74.9332151,97.3551083 73.955442,96.7032595 L49.8370378,81.8737002 L26.044558,96.7032595 C25.0667849,97.3551083 23.9260495,97.6810326 22.9482764,97.6810326 C19.3631082,97.6810326 16.2668266,94.4217888 17.4075619,90.3477341 L23.9260495,63.2960105 L2.08911601,45.2072073 C-1.98493875,41.7850013 0.296531918,35.1035515 5.51132201,34.7776271 Z" />';
    }
  }
  mojs.addShape("star", Star);

  useEffect(() => {
    if (animation.current) return;

    const circle = new mojs.Shape({
      parent: animDom.current,
      x: 0,
      y: 0,
      stroke: "rgb(223, 205, 9)",
      strokeWidth: { [2 * RADIUS]: 0 },
      fill: "none",
      scale: { 0: 1, easing: "quad.out" },
      radius: RADIUS,
      duration: 500,
    });
    star.current = new mojs.Shape({
      parent: animDom.current,
      x: 0,
      y: 0,
      shape: "star",
      fill: "rgb(223, 205, 9)",
      scale: { 0: 1 },
      duration: 3000,
      delay: 400,
      radius: RADIUS / 4,
      easing: "elastic.out",
      isShowEnd: false,
    });
    const burst = new mojs.Burst({
      parent: animDom.current,
      left: "50%",
      top: "50%",
      count: 5,
      radius: { 0: RADIUS + 10 },
      angle: { 0: 30 },
      children: {
        shape: "star",
        radius: RADIUS / 3,
        fill: "rgb(223, 205, 9)",
        duration: 2000,
        delay: 200,
        easing: "quad.out",
      },
    });

    animation.current = new mojs.Timeline({ speed: 2 });
    animation.current.add(burst, circle, star.current);
  });

  const handleFavoriteClick = (id, item, category) => {
    if (isFavorite(id, item, category)) {
      removeFavorite(id, item, category);
    } else {
      addFavorite(item, category);
      animation.current.play();
    }
  };

  return (
    <div>
      {!drawer ? (
        <IconButton
          backgroundColor="black"
          size="lg"
          fontSize="30px"
          borderRadius="50%"
          position="absolute"
          top={top}
          left={left}
          right={right}
          bottom={bottom}
          icon={!isFavorite(id, item, category) ? FaRegStar : FaStar}
          color={
            !isFavorite(id, item, category) ? "#DFE5F0" : "rgb(223, 205, 9)"
          }
          _hover={{ transform: "scale(1.05)" }}
          _focus={{ outline: "none" }}
          onClick={() => handleFavoriteClick(id, item, category)}
          zindex="3"
          ref={animDom}
        ></IconButton>
      ) : (
        <Tooltip
          label="remove from favorites"
          aria-label="A tooltip"
          placement="bottom"
        >
          <IconButton
            backgroundColor="black"
            color="#dfe5f0"
            position="absolute"
            minWidth="2rem"
            height="2rem"
            top={top}
            left={left}
            right={right}
            bottom={bottom}
            borderRadius="50%"
            icon={FaTimes}
            _hover={{ transform: "scale(1.05)" }}
            _focus={{ outline: "none" }}
            onClick={() => handleFavoriteClick(id, item, category)}
            zIndex="3"
          ></IconButton>
        </Tooltip>
      )}
    </div>
  );
}

export default FavoriteButton;
