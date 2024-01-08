import { Feather } from "@expo/vector-icons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Dimensions } from "react-native";
import { StackType } from "../screens/createSchedule/CreateSchedule";
import { supabase } from "../lib/supabase";
import { RenderSongsView } from "./Songs/RenderSongsView";

export type SongsProps = {
  id: string,
  name: string,
  artist: string,
  cover: string,
  tone: string
}

export function SongsItems() {
  const windowWidth = Dimensions.get("window").width;
  const navigation = useNavigation<StackType>();
  const isFocused = useIsFocused();
  const [songs, setSongs] = useState<SongsProps[]>([]);

  async function getMusics() {
    try {
      const { data, error } = await supabase
        .from("Musics")
        .select()
      if(error) throw error;
      setSongs(data);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    isFocused && getMusics();
  }, [isFocused])

  return (
    <View style={[styles.container, {width: windowWidth }]}>
      {songs.length > 0 ? (
        <View style={{ marginBottom: 80 }}>
          <FlatList
            ItemSeparatorComponent={() => <View style={{ height: 14 }}></View>}
            data={songs}
            renderItem={({ item }) => <RenderSongsView {...item} />}
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
        onPress={() => navigation.navigate("CreateMusic")}
        style={styles.button}
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