import {
  Center,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
  HStack,
  Stack,
  Image,
  Badge,
  Button,
  CircularProgress,
  useDisclosure,
} from "@chakra-ui/react";
import { createRef, useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useSearchParams } from "react-router-dom";
import { ContainerNotFoundDialog } from "../components/ContainerNotFoundDialog";
import { containerIcon } from "../components/Icons";
import { fetchAllContainers } from "../services/Tableland";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";

function Map() {
  const [searchParams] = useSearchParams();

  const [containers, setContainers] = useState([]);
  const [containerId, setContainerId] = useState(
    searchParams.get("containerId")
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const map = useRef();
  const searchBar = useRef();

  //container id -> marker
  const markers = useMemo(() => {
    const refs = {};
    containers.forEach((container) => {
      refs[container.container_gps] = createRef(null);
    });
    return refs;
  }, [containers]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAllContainers(
        "select * from TRAXA_NFT_REPOSITORY_80001_1923"
      );

      setContainers(data);
    };

    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    searchBar.current.value = containerId;

    //Find container
    if (containerId && containers.length > 0) {
      const container = containers.find(
        (it) => containerId === it.container_id
      );

      if (container && map.current) {
        var position = container.container_gps
          .split(" ")
          .map((x) => parseFloat(x));
        position[0] += 0.0013;

        //Fly to container position
        map.current.flyTo(position, 18, {
          animate: true,
          duration: 0.5,
        });

        //Open container popup
        markers[container.container_gps].current.openPopup();
      } else {
        //Show dialog
        onOpen();
      }
    }
  }, [containers, containerId]);

  useEffect(
    () => setContainerId(searchParams.get("containerId")),
    [searchParams]
  );

  function search(query) {
    if (query && query !== "") navigate("/map?containerId=" + query);
  }

  return (
    <div>
      <ContainerNotFoundDialog
        onClose={onClose}
        isOpen={isOpen}
        containerId={containerId}
      />

      {containers.length > 0 || (
        <Center className="w-screen h-screen z-[5000] fixed bg-white">
          <VStack spacing={4}>
            <CircularProgress isIndeterminate color="orange.500" className="" />
            <span>Loading map</span>
          </VStack>
        </Center>
      )}

      <HStack className="fixed top-4 z-[900] w-screen px-2 sm:px-0 sm:w-6/12 sm:translate-x-1/2 rounded-md">
        <InputGroup className="bg-white rounded-md">
          <InputLeftElement
            pointerEvents="none"
            children={<MagnifyingGlassIcon width={20} />}
          />
          <Input
            placeholder="Search container..."
            defaultValue={containerId}
            variant="outline"
            ref={searchBar}
            onKeyDown={(e) => {
              if (e.key === "Enter") search(searchBar.current.value);
            }}
            className="bg-white"
          />
        </InputGroup>
        <Button
          variant="solid"
          colorScheme="orange"
          children="Search"
          onClick={() => search(searchBar.current.value)}
        />
      </HStack>

      <MapContainer
        style={{ height: "100vh" }}
        center={[54.989, 73.369]}
        zoom={3}
        zoomControl={false}
        ref={map}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {containers.map((it) => (
          <Marker
            key={it}
            position={it.container_gps.split(" ").map((x) => parseFloat(x))}
            ref={markers[it.container_gps]}
            icon={containerIcon}
          >
            <Popup maxWidth={500} closeButton={false}>
              <Stack width={400} spacing={0}>
                <a href={it.filecoin_url} target="_blank" rel="noreferrer">
                  <Image
                    src={it.filecoin_url}
                    fallback={
                      <div className="w-full h-96 bg-gray-400 rounded-xl"></div>
                    }
                    className="object-cover w-full h-96 rounded-xl"
                  />
                </a>
                <Stack direction="row" alignItems="center" className="pt-2">
                  <h1 className="text-xl font-bold">{it.container_id}</h1>
                  <Badge variant="outline" colorScheme="orange">
                    {it.container_type === "V" ? "Vertical" : "Horizontal"}
                  </Badge>
                </Stack>
                <span>
                  Last seen:{" "}
                  {new Date(parseInt(it.container_time)).toLocaleString()}
                </span>
              </Stack>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;
