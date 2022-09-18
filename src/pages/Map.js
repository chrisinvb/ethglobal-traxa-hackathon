import { Badge } from "@chakra-ui/react";
import { Stack, Image } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useSearchParams } from "react-router-dom";
import { containerIcon } from "../components/Icons";

function Map() {
  const [searchParams] = useSearchParams();
  const containerId = searchParams.get("containerId");
  const [containers, setContainers] = useState([]);

  const map = useRef();
  const tableLandBase = "https://testnet.tableland.network/query?s=";

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        tableLandBase + "select * from TRAXA_NFT_REPOSITORY_80001_1923"
      );

      const data = await res.json();

      //Populate map
      setContainers(data.rows);

      //Find container
      if (containerId) {
        const container = data.rows.find((it) => containerId === it[1]);

        if (container) {
          var position = container[4].split(" ").map((x) => parseFloat(x));
          map.current.setView(position, 14);
        }
      }
    };

    fetchData().catch(console.error);
  }, [containerId]);

  return (
    <div>
      <MapContainer
        style={{ height: "100vh" }}
        center={[54.989, 73.369]}
        zoom={3}
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
            position={it[4].split(" ").map((x) => parseFloat(x))}
            icon={containerIcon}
          >
            <Popup maxWidth={500} closeButton={false}>
              <Stack width={400}>
                <a href={it[7]} target="_blank" rel="noreferrer">
                  <Image
                    src={it[7]}
                    fallback={
                      <div className="w-full h-96 bg-gray-400 rounded-xl"></div>
                    }
                    className="object-cover w-full h-96 rounded-xl"
                  />
                </a>

                <Stack direction="row" alignItems="center">
                  <h1 className="text-xl font-bold leading-10">{it[1]}</h1>
                  <Badge variant="outline">
                    {it[2] === "V" ? "Vertical" : "Horizontal"}
                  </Badge>
                </Stack>
              </Stack>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;
