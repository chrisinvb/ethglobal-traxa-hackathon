import { Stack } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { fetchLatestContainers } from "../services/Tableland";
import { ContainerCard, SkeletonCard } from "./ContainerCard";

function LatestContainers({ containerClicked, direction, className }) {
  const [latestContainers, setLatestContainers] = useState([]);
  const cache = useRef();

  const getLatestContainers = async () => {
    if (cache.current) setLatestContainers(cache.current);
    else {
      const data = await fetchLatestContainers(5);
      cache.current = data;

      setLatestContainers(data);
    }
  };

  useEffect(() => {
    setTimeout(() => getLatestContainers().catch(console.error), 1000);
  }, []);

  return (
    <Stack
      direction={direction || "row"}
      className={"overflow-auto pb-2 w-full h-[6.5rem]" + (className || "")}
    >
      {latestContainers.length === 0
        ? [1, 2, 3, 4, 5].map((it) => <SkeletonCard key={it} />)
        : latestContainers.map((it) => (
            <Link
              key={it}
              to={"/map?containerId=" + it.container_id}
              onClick={containerClicked}
            >
              <ContainerCard container={it} />
            </Link>
          ))}
    </Stack>
  );
}

export { LatestContainers };
