const tableLandBase = "https://testnet.tableland.network/query?s=";

async function fetchAllContainers(query) {
  const res = await fetch(tableLandBase + query);

  return await res.json();
}

async function fetchLatestContainers(limit = 10) {
  const res = await fetch(
    tableLandBase +
      "select * from TRAXA_NFT_REPOSITORY_80001_1923 ORDER BY container_time DESC LIMIT " +
      limit
  );

  return await res.json();
}

export { fetchAllContainers, fetchLatestContainers };
