import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import { StackNavigator, StackType } from "../screens/createSchedule/CreateSchedule";
import { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { supabase } from "../lib/supabase";

export function EditScheduleMusicDetails() {
  const route = useRoute<RouteProp<StackNavigator, "EditScheduleMusicDetails">>();
  const { navigate } = useNavigation<StackType>();
  const [musicId, setMusicId] = useState(route.params.music_id)
  const [name, setName] = useState<string>("");
  const [artist, setArtist] = useState<string>("");
  const [informations, setInformations] = useState<string>("");

  const findMusicById = async () => {
    const { data } = await supabase
      .from("Musics")
      .select("*")
      .eq("id", musicId);

    if (data) {
      setName(data[0].name);
      setArtist(data[0].artist);
      setInformations(data[0].informations)
    }
  };

  const editMusicDetails = async () => {
    const musicData = {
      name,
      artist,
      informations
    }
    const { data, error } = await supabase
      .from("Musics")
      .update(musicData)
      .eq("id", musicId);  
  }

  useEffect(() => {
    findMusicById();
  }, [])

  return (
    <View style={styles.container}>
      <Text style={{ color: "#E1E1E1" }}>Título</Text>
      <TextInput style={styles.input} placeholder="Título" textColor="white" value={name} />
      <Text style={{ color: "#E1E1E1" }}>Artista</Text>
      <TextInput style={styles.input} placeholder="Artista" textColor="white" value={artist} />
      <Text style={{ color: "#E1E1E1" }}>Título</Text>
      <TextInput
        style={styles.input}
        multiline={true}
        numberOfLines={4}
        placeholder="Informações Gerais"
        placeholderTextColor="#E1E1E1"
        textColor="white"
        value={informations}
        onChangeText={(text) => setInformations(text)}
      />
      <View>
        <TouchableOpacity
          style={styles.buttonLinks}
          onPress={() =>
            navigate("EditLinksScheduleMusicDetails", {
              music_id: route.params.music_id,
            })
          }
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              color: "white",
              textAlign: "center",
            }}
          >
            Inserir links
          </Text>
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
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={editMusicDetails}>
        <Feather
          size={25}
          color={"white"}
          style={{ textAlign: "center", lineHeight: 43 }}
          name="check"
        />
        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
          Salvar
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingHorizontal: 20,
  },
  input: {
    backgroundColor: "#121212",
    borderColor: "#E1E1E1",
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    color: "red",
  },
  buttonLinks: {
    backgroundColor: "#1E1E1E",
    padding: 15,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderColor: "#A1A1A1",
    borderWidth: 1,
  },
  button: {
    width: 85,
    height: 60,
    backgroundColor: "#018786",
    position: "absolute",
    bottom: 30,
    right: 20,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});