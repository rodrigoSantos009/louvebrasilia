import { Feather } from "@expo/vector-icons";
import { TouchableOpacity, View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackType } from "../../screens/createSchedule/CreateSchedule";
import { SongsProps } from "../SongsItems";

export function RenderSongsView(song: SongsProps) {
  const { navigate } = useNavigation<StackType>();

  return (
    <View>
      <TouchableOpacity
        onPress={() => navigate("ScheduleMusicDetails", { music_id: song.id })}
      >
        <View
          style={{
            width: "100%",
            padding: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 1,
            marginBottom: 10,
          }}
        >
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <Image
              source={{ uri: song.cover }}
              style={{ width: 56, height: 56 }}
            />
            <View>
              <Text style={{ fontSize: 16, color: "#1eb2a6" }}>
                {song.name}
              </Text>
              <Text style={{ color: "#9e9fa4" }}>{song.artist}</Text>
              <Text style={{ color: "#6c6f74" }}>Louvor, Tom: {song.tone}</Text>
            </View>
          </View>
          <View style={{}}>
            <View style={{ flexDirection: "row", gap: 4 }}>
              <Feather size={18} color="#d4943a" name="user" />
              <Feather size={18} color="#4bac4d" name="list" />
            </View>
            <View style={{ flexDirection: "row", gap: 4 }}>
              <Feather size={18} color="#2298f4" name="music" />
              <Feather size={18} color="#f34136" name="video" />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#9e9fa4",
  },
});
