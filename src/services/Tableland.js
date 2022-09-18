const tableLandBase = "https://testnet.tableland.network/query?s=";

async function fetchAllContainers(query) {
  const res = await fetch(tableLandBase + query);

  const data = await res.json();
  return data.rows;
}

async function fetchLatestContainers(limit = 10) {
  const res = await fetch(
    tableLandBase +
      "select * from TRAXA_NFT_REPOSITORY_80001_1923 ORDER BY container_time DESC LIMIT " +
      limit
  );

  const data = await res.json();
  return data.rows;
}

export { fetchAllContainers, fetchLatestContainers };
