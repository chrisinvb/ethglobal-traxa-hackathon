import {
  Image,
  HStack,
  Box,
  Badge,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";

const now = new Date().getTime();

function ContainerCard({ container }) {
  const elapsed = now - parseInt(container[3]);
  const elapsedString = (it) => {
    it = it / 1000;

    if (it <= 0) return "Right now";
    if (it < 60) return it + " seconds ago";
    if (it > 60 && it < 3600) return Math.floor(it / 60) + " minutes ago";
    if (it > 3600 && it < 24 * 3600)
      return Math.floor(it / 3600) + " hours ago";
    return "More than 1 day ago";
  };

  return (
    <Box p="5" minW="300px" borderWidth="1px" className="h-20 rounded-md">
      <HStack>
        <Image
          className="w-12 bg-gray-200 rounded-full aspect-square"
          src={container[7]}
        ></Image>
        <div className="pl-2 text-gray-600">
          <span className="font-medium text-black">{container[1]}</span>{" "}
          <Badge variant="outline" colorScheme="orange">
            {container[2] === "V" ? "Vertical" : "Horizontal"}
          </Badge>
          <br />
          {elapsedString(elapsed)}
        </div>
      </HStack>
    </Box>
  );
}

function SkeletonCard() {
  return (
    <Box p="5" minW="300px" borderWidth="1px" className="h-20 rounded-md">
      <HStack>
        <SkeletonCircle className="aspect-square" size="10" />
        <SkeletonText className="w-full" ml="2" noOfLines={2} spacing="1" />
      </HStack>
    </Box>
  );
}

export { ContainerCard, SkeletonCard };