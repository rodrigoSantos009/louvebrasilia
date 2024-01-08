import { View, Image, Text, TouchableOpacity } from "react-native";
import { SongsProps } from "../screens/CreateSong/AddSongToList";
import { useNavigation } from "@react-navigation/native";
import { SongStackType } from "../routes/createMusicStack.routes";

export function RenderSongs(song: SongsProps) {
  const { navigate } = useNavigation<SongStackType>();

  return (
    <View>
      <TouchableOpacity
        onPress={() =>
          navigate("SongDetails", {
            title: song.title,
            artist: song.artist.name,
            cover: song.album.cover,
            artist_picture: song.artist.picture,
            album_title: song.album.title
          })
        }
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Image
            source={{ uri: song.album.cover || undefined }}
            style={{ width: 50, height: 50 }}
          />
        </View>
        <View style={{ width: 170 }}>
          <Text style={{ color: "#DDE6ED" }}>{song.title}</Text>
          <Text style={{ color: "#183D3D" }}>{song.artist.name}</Text>
        </View>
        <View>
          <Image
            source={{ uri: song.artist.picture || undefined }}
            style={{ width: 40, height: 40, borderRadius: 50 }}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}
