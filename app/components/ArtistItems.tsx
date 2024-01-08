import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Dimensions } from "react-native";
import { supabase } from "../lib/supabase";
import { RenderArtitsView } from "./Songs/RenderArtistsView";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { StackType } from "../screens/createSchedule/CreateSchedule";

export type ArtistProps = {
  artist: string;
  artist_picture: string,
  total_musics: number;
};

export function Artist() {
  const windowWidth = Dimensions.get("window").width;
  const { navigate } = useNavigation<StackType>();
  const isFocused = useIsFocused();
  const [artists, setArtists] = useState<ArtistProps[]>([]);

  const getTotalMusicsArtist = async () => {
    const { data } = await supabase
      .rpc("getmusics");

    setArtists(data);
  }

  useEffect(() => {
    getTotalMusicsArtist();
  }, [isFocused])

  return (
    <View
      style={[styles.container, {width: windowWidth}]}
    >
      {artists.length > 0 ? (
        <View style={{ marginBottom: 80 }}>
          <FlatList 
            ItemSeparatorComponent={() => <View style={{ height: 20 }}></View>}
            data={artists}
            renderItem={({ item }) => <RenderArtitsView { ...item } />}
          />
        </View>
      ) : (
        <>
          <Text>Lista vazia...</Text>
          <Text>Para cadastrar uma escala, clique no botão</Text>
          <Text>( + )</Text>
        </>
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigate("CreateMusic")}
      >
        <Feather
          size={25}
          color={"white"}
          style={{ textAlign: "center", lineHeight: 43 }}
          name="plus"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 10,
    backgroundColor: "#121212",
    paddingHorizontal: 20,
  },
  button: {
    width: 45,
    height: 45,
    backgroundColor: "#1eb2a6",
    position: "absolute",
    bottom: 60,
    right: 20,
    borderRadius: 15,
  },
});