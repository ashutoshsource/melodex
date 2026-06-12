const API_KEY = "924b23309e9961cee80436aba31c7b71";
const BASE_URL = "https://ws.audioscrobbler.com/2.0/";

export const fetchData = (params) => {
  const url = new URLSearchParams({
    ...params,
    api_key: API_KEY,
    format: "json",
  });
  return fetch(`${BASE_URL}?${url}`).then((res) => res.json());
};