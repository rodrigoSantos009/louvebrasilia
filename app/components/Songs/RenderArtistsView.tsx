import { Feather } from "@expo/vector-icons";
import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import { ArtistProps } from "../ArtistItems";

export function RenderArtitsView(artist: ArtistProps) {
  return (
    <View>
      <TouchableOpacity>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <Image
              source={{ uri: artist.artist_picture }}
              style={{ width: 40, height: 40, borderRadius: 50 }}
            />
            <View>
              <Text style={{ fontSize: 16, color: "#8ab2ff" }}>
                {artist.artist}
              </Text>
              <Text style={{ color: "#6c6f74" }}>
                {artist.total_musics} Músicas
              </Text>
            </View>
          </View>
          <View>
            <Feather color="#6c6f74" size={25} name="arrow-right" />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
