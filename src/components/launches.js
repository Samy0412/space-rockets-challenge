import React from "react";
import { Badge, Box, Image, SimpleGrid, Text, Flex } from "@chakra-ui/core";
import { format as timeAgo } from "timeago.js";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { useSpaceXPaginated } from "../utils/use-space-x";

import { formatDate } from "../utils/format-date";
import Error from "./error";
import Breadcrumbs from "./breadcrumbs";
import LoadMoreButton from "./load-more-button";
import FavoriteButton from "./FavoriteButton";

const PAGE_SIZE = 12;


//Motion framer props
const MotionGrid = motion(SimpleGrid);
const MotionBox = motion(Box);
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.3,
    },
  },
};
const item = {
  hidden: { y: 40, opacity: 0, scale: 0.9 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
  },
};


export function Launches() {
  const { data, error, isValidating, setSize, size } = useSpaceXPaginated(
    "/launches/past",
    {
      limit: PAGE_SIZE,
      order: "desc",
      sort: "launch_date_utc",
    }
  );
  console.log(data, error);

  return (
    <div>
      <Breadcrumbs
        items={[{ label: "Home", to: "/" }, { label: "Launches" }]}
      />
      <MotionGrid
        m={[2, null, 6]}
        minChildWidth="350px"
        spacing="4"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {error && <Error />}
        {data &&
          data
            .flat()
            .map((launch) => (
              <LaunchItem
                launch={launch}
                key={launch.flight_number}
                top={2}
                left={2}
              />
            ))}
      </MotionGrid>
      <LoadMoreButton
        loadMore={() => setSize(size + 1)}
        data={data}
        pageSize={PAGE_SIZE}
        isLoadingMore={isValidating}
      />
    </div>
  );
}

export function LaunchItem({ launch, drawer, top, left, right, bottom }) {
  return (
    <MotionBox
      boxShadow="md"
      borderWidth="1px"
      rounded="lg"
      overflow="visible"
      position="relative"
      variants={item}
    >
      <FavoriteButton
        id={"flight_number"}
        item={launch}
        category="launches"
        drawer={drawer}
        top={top}
        left={left}
        right={right}
        bottom={bottom}
      />
      <Box as={Link} to={`/launches/${launch.flight_number.toString()}`}>
        <Image
          src={
            launch.links.flickr_images[0]?.replace("_o.jpg", "_z.jpg") ??
            launch.links.mission_patch_small
          }
          alt={`${launch.mission_name} launch`}
          height={!drawer ? ["200px", null, "300px"] : "100px"}
          width="100%"
          objectFit="cover"
          objectPosition="bottom"
          roundedTop="lg"
        />

        <Image
          position="absolute"
          top="5"
          right="5"
          src={launch.links.mission_patch_small}
          height="75px"
          objectFit="contain"
          objectPosition="bottom"
        />

        <Box p="6">
          <Box d="flex" alignItems="baseline">
            {launch.launch_success ? (
              <Badge px="2" variant="solid" variantColor="green">
                Successful
              </Badge>
            ) : (
              <Badge px="2" variant="solid" variantColor="red">
                Failed
              </Badge>
            )}
            <Box
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              textTransform="uppercase"
              ml="2"
            >
              {launch.rocket.rocket_name} &bull; {launch.launch_site.site_name}
            </Box>
          </Box>

          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            {launch.mission_name}
          </Box>
          <Flex>
            <Text fontSize="sm">{formatDate(launch.launch_date_utc)} </Text>
            <Text color="gray.500" ml="2" fontSize="sm">
              {timeAgo(launch.launch_date_utc)}
            </Text>
          </Flex>
        </Box>
      </Box>
    </MotionBox>
  );
}
