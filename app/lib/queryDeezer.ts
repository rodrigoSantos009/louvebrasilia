import axios from "axios"

export async function getSongs(song: string) {

  const options = {
    method: "GET",
    url: "https://deezerdevs-deezer.p.rapidapi.com/search",
    params: { q: song },
    headers: {
      "X-RapidAPI-Key": "533bb382eamshcabd5eff42053ddp1c7668jsne954f62090d9",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  };
  
  try {
    const response = await axios.request(options);
    const data = response.data.data;

    return data;
  } catch (error) {
    console.error(error);
  }
}
