import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { StackNavigator, StackType } from "./CreateSchedule";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "../../lib/supabase";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type SongsProps = {
  id: string,
  name: string;
  artist: string;
  tone: string;
}[];

type MusicsProps = NativeStackScreenProps<StackNavigator, "Musics">;

export function Musics({ route }: MusicsProps) {
  const { navigate } = useNavigation<StackType>();
  const [songs, setSongs] = useState<SongsProps>([]);
  const [selectedSongs, setSelectedSongs] = useState<Array<string>>([]);

  const fetchSelectedSongs = async () => {
    try {
      const store = await AsyncStorage.getItem("selectedMusics");
      if (store !== null) {
        const parsedSelectedMusics = JSON.parse(store);
        setSelectedSongs(parsedSelectedMusics);
        fetchMusics(parsedSelectedMusics);
      }
    } catch (error) {
      console.error("Erro ao recuperar os músicas selecionadas:", error);
    }  
  };

  const fetchMusics = async (ids: string[]) => {
    try {
      const { data, error } = await supabase
        .from("Musics")
        .select("*")
        .in("id", ids);
      if (error) {
        throw error;
      }
      setSongs(data);
      console.log(data)
    } catch (error) {
      console.error("Error fetching musics:", error);
    }
  };

  const deleteUser = async (id: string) => {
    try {
      const musicsUpdate = selectedSongs.filter((song_id) => song_id !== id);
      await AsyncStorage.setItem("selectedMusics", JSON.stringify(musicsUpdate));
      setSelectedSongs(musicsUpdate);
      fetchSelectedSongs();
    } catch (error) {
      return error;
    }
  };


  useEffect(() => {
    fetchSelectedSongs();
  }, [route.params])

  return (
    <View
      style={{
        flex: 1,
        paddingTop: 10,
        paddingHorizontal: 10,
        backgroundColor: "#121212",
      }}
    >
      <View>
        <TouchableOpacity
          onPress={() => navigate("AddMusic")}
          style={{
            width: 200,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#018786",
            padding: 10,
            borderRadius: 20,
            marginBottom: 25,
          }}
        >
          <MaterialIcons size={20} color="white" name="add" />
          <Text style={{ color: "white", fontWeight: "bold" }}>
            Incluir Músicas
          </Text>
        </TouchableOpacity>
      </View>
      {songs.length > 0 ? (
        <View style={{ justifyContent: "center" }}>
          {songs.map((song, index) => (
            <View
              key={index}
              style={{
                paddingHorizontal: 20,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                height: 80,
                backgroundColor: "#1E1E1E",
                marginBottom: 10,
                borderRadius: 10
              }}
            >
              <MaterialIcons size={30} name="menu" color="#018786" />
              <View style={{ width: 200 }}>
                <Text style={{ color: "#E1E1E1", fontSize: 18 }}>{song.name}</Text>
                <Text style={{ color: "#E1E1E1", fontSize: 14 }}>{song.artist}</Text>
              </View>
              <MaterialIcons 
                onPress={() => deleteUser(song.id)} 
                size={30} name="delete" 
                color="#B00020" 
              />
            </View>
          ))}
        </View>
      ) : (
        <>
          <Text>
            <Feather name="music" />
          </Text>
          <Text>Lista vazia...</Text>
          <Text>Para cadastrar uma escala, clique no botão</Text>
          <Text>( + )</Text>
        </>
      )}
    </View>
  );
}
