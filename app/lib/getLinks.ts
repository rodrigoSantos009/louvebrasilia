import { getYouTubeUrl } from "./queryYouTube";

export async function getLinks(title: string, artist: string) {
  const youtubeLink = await getYouTubeUrl(title, artist);

  return youtubeLink;
}