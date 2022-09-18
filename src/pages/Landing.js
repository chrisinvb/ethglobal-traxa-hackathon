import { Input } from "@chakra-ui/react";
import { HStack } from "@chakra-ui/react";
import { Img } from "@chakra-ui/react";
import { VStack } from "@chakra-ui/react";
import { Button, Center } from "@chakra-ui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { Link } from "react-router-dom";
import { LatestContainers } from "../components/LatestContainers";

function Landing() {
  const [query, setQuery] = useState();

  return (
    <Center h="100vh" w="100vw">
      <VStack className="px-8 w-full sm:w-9/12" spacing="8">
        <Img
          src="https://static.wixstatic.com/media/3e9acd_78280a11f6a4412bb0047952361167fe~mv2.png/v1/fill/w_770,h_256,al_c,lg_1,q_85,enc_auto/Asset%208_4x.png"
          alt="Traxa logo"
          className="aspect-[770/256]"
          maxW="400px"
          width="50%"
        />

        <VStack className="relative w-full">
          <Input
            placeholder="Search container..."
            text={query}
            onChange={(e) => setQuery(e.currentTarget.value)}
            size="lg"
          />
          <LatestContainers />
        </VStack>

        <HStack>
          <Link to={query ? "/map?containerId=" + query : "/map"}>
            <Button
              variant="solid"
              colorScheme="orange"
              children="Find My Container"
              leftIcon={<MagnifyingGlassIcon width={20} />}
            />
          </Link>
          <Link to="/map">
            <Button
              variant="outline"
              colorScheme="orange"
              children="Explore map"
            ></Button>
          </Link>
        </HStack>
      </VStack>
    </Center>
  );
}

export default Landing;
