const SERVER = "http://192.168.1.7:8096";
const API_KEY = "5684f5a7ca9342a2893952dcb70a6c9a";
const USER_ID = "79466600cf584ce0889c35aa45a5d245";

async function fetchItems() {
  const res = await fetch(
    `${SERVER}/Users/${USER_ID}/Items?api_key=${API_KEY}`
  );
  return await res.json();
}

export default {
  name: "Jellyfin Local",
  version: "1.0.0",

  async catalog() {
    const data = await fetchItems();

    return data.Items.map(item => ({
      id: item.Id,
      type: item.Type === "Movie" ? "movie" : "series",
      title: item.Name,
      poster: `${SERVER}/Items/${item.Id}/Images/Primary?api_key=${API_KEY}`
    }));
  },

  async stream(item) {
    return [{
      url: `${SERVER}/Videos/${item.id}/stream?api_key=${API_KEY}`
    }];
  }
};

