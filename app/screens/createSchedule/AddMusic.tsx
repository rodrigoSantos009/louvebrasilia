import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { View, Text, TouchableOpacity, Image, TextInput, FlatList } from "react-native";

import BouncyCheckbox from "react-native-bouncy-checkbox";

// selectUser => filtrar os usúarios que estão no agendamento === todos os usúarios
import { StackType } from "./CreateSchedule";
import { supabase } from "../../lib/supabase";
import AvaiableSongs from "../../components/CreateSchedule/AvaiableSongs";

export type MusicProps = {
  id: string;
  name: string;
  artist: string;
  tone: string,
};

export function AddMusic() {
  const { navigate } = useNavigation<StackType>();
  const [musics, setMusics] = useState<MusicProps[]>([]);
  const [selectedMusic, setSelectedMusic] = useState<string[]>([]);

  const saveMusics = async () => {
    try {
      const json = JSON.stringify(selectedMusic);
      await AsyncStorage.setItem("selectedMusics", json);
      navigate("Musics", {selectedSongsIds: selectedMusic});
    } catch (error) {
      console.log("Error => ", error);
    }
  };

  const fetchMusics = async () => {
    try {
      const { data, error } = await supabase.from("Musics").select("*");
      if (error) {
        throw error;
      }
      setMusics(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchSelectedMusic = async () => {
    try {
      const storedSelectedMusic = await AsyncStorage.getItem("selectedMusics");
      if (storedSelectedMusic !== null) {
        setSelectedMusic(JSON.parse(storedSelectedMusic));
      } 
    } catch (error) {
      console.error("Erro ao recuperar os usuários selecionados:", error);
    }
  };

  useEffect(() => {
    fetchSelectedMusic();
    fetchMusics();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        paddingTop: 10,
        paddingHorizontal: 20,
        backgroundColor: "#121212",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TextInput
          placeholder="Buscar por nome"
          placeholderTextColor="#E1E1E1"
          style={{
            color: "#E1E1E1",
            marginVertical: 10,
            backgroundColor: "#121212",
            paddingLeft: 40,
            paddingVertical: 8,
            borderWidth: 1,
            borderColor: "#E1E1E1",
            fontSize: 16,
            borderRadius: 10,
            width: "100%"
          }}
        />
        <MaterialIcons color="#E1E1E1" size={30} style={{ position: "absolute", marginLeft: 5 }} name="search" />
      </View>
      {musics.length > 0 ? (
        <View style={{ marginBottom: 140 }}>
          <FlatList
            ItemSeparatorComponent={() => <View style={{ height: 20 }}></View>}
            data={musics}
            renderItem={({ item }) => <AvaiableSongs song={item} selectedMusic={selectedMusic} setSelectedMusic={setSelectedMusic} /> }
          />
        </View>
      ) : (
        <View
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        >
          <Feather size={30} name="music" />
          <Text>Para adicionar uma msica, clique no botão</Text>
          <Text>( + Incluir Música )</Text>
        </View>
      )}
      <TouchableOpacity
        onPress={saveMusics}
        style={{
          width: 45,
          height: 45,
          backgroundColor: "#1eb2a6",
          position: "absolute",
          bottom: 60,
          right: 20,
          borderRadius: 15,
        }}
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
