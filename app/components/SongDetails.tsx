import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import { SongStackType, StackNavigator } from "../routes/createMusicStack.routes";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { supabase } from "../lib/supabase";

export function SongDetails() {
  const route = useRoute<RouteProp<StackNavigator, "SongDetails">>();
  const navigate = useNavigation<SongStackType>();
  const [title, setTitle] = useState<string>(route.params?.title);
  const [artist, setArtist] = useState<string>(route.params?.artist);
  const [cover, setCover] = useState<string>(route.params.cover);
  const [artistPicture, setArtistPicture] = useState<string>(route.params.artist_picture);
  const [albumTitle, setAlbumTitle] = useState<string>(route.params.album_title);
  const [informations, setInformations] = useState<string>("");

  async function saveMusic() {
    try {
      const { data, error } = await supabase.from("Musics").insert({
        name: title,
        artist: artist,
        informations: informations,
        cover: cover,
        artist_picture: artistPicture,
        album_title: albumTitle,
      });
      navigate.popToTop();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={{ color: "#E1E1E1" }}>Título</Text>
      <TextInput
        style={styles.input}
        placeholder="Colossenses e suas linhas de amor"
        textColor="white"
        value={title}
      />
      <Text style={{ color: "#E1E1E1" }}>Artista</Text>
      <TextInput
        style={styles.input}
        placeholder="fhop music"
        textColor="white"
        value={artist}
      />
      <Text style={{ color: "#E1E1E1" }}>Informações</Text>
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
          onPress={() =>
            navigate.navigate("InsertLinks", {
              title: title,
              artist: artist,
              informations: informations,
              cover: cover,
              artist_picture: artistPicture,
              album_title: albumTitle,
            })
          }
          style={styles.buttonLinks}
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
      <TouchableOpacity onPress={saveMusic} style={styles.button}>
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