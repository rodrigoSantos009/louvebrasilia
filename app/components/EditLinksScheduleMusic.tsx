import { Feather, MaterialIcons } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import {
  StackNavigator,
  StackType,
} from "../screens/createSchedule/CreateSchedule";
import { ScrollView } from "react-native-gesture-handler";
import { supabase } from "../lib/supabase";

export function EditLinksScheduleMusicDetails() {
  const navigate = useNavigation<StackType>();
  const route = useRoute<RouteProp<StackNavigator, "EditLinksScheduleMusicDetails">>();

  const [musicId, setMusicId] = useState(route.params.music_id);
  const [comments, setComments] = useState<string>("");
  const [lyrics, setLyrics] = useState<string>("");
  const [cipher, setCipher] = useState<string>("");
  const [video, setVideo] = useState<string>("");
  const [tone, setTone] = useState<string>("");
  const [bpm, setBpm] = useState<string>(""); 

  const findMusicById = async () => {
    const { data } = await supabase.from("Musics").select("*").eq("id", musicId);

    if (data) {
      setComments(data[0].comments);
      setLyrics(data[0].lyrics_url);
      setCipher(data[0].cipher_url)
      setVideo(data[0].youtube_url);
      setTone(data[0].tone);
      setBpm(data[0].bpm)
    }
  };

  const editLinksMusicDetails = async () => {
    const musicData = {
      lyrics_url: lyrics,
      cipher_url: cipher,
      youtube_url: video,
      comments,
      tone,
      bpm,
    };

    const { data, error } = await supabase
      .from("Musics")
      .update(musicData)
      .eq("id", musicId);

    navigate.goBack();
  };

  useEffect(() => {
    findMusicById();
  }, [])

  return (
    <ScrollView style={styles.container}>
      <View style={{ flexDirection: "row", gap: 10, marginBottom: 20 }}>
        <View
          style={{
            backgroundColor: "#018786",
            justifyContent: "center",
            alignItems: "center",
            width: 40,
            height: 40,
            borderRadius: 50,
          }}
        >
          <MaterialIcons color={"#FFA500"} size={30} name="music-note" />
        </View>
        <View>
          <Text style={{ fontSize: 17, color: "#E1E1E1", fontWeight: "bold" }}>
          </Text>
          <Text style={{ color: "#E1E1E1" }}></Text>
        </View>
      </View>
      <View>
        <Text style={styles.text}>Nome da versão</Text>
        <TextInput
          placeholderTextColor="#E1E1E1"
          style={styles.input}
          value={"Original"}
        />
        <Text style={styles.text}>Classificação</Text>
        <TextInput
          placeholderTextColor="#E1E1E1"
          style={styles.input}
          value="Louvor"
        />
        <TextInput
          style={styles.input}
          multiline={true}
          numberOfLines={8}
          placeholder="Observações"
          placeholderTextColor="#E1E1E1"
          onChangeText={(text) => setComments(text)}
          value={comments}
        />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View>
            <Text style={styles.text}>Tom</Text>
            <TextInput
              placeholderTextColor="#E1E1E1"
              style={styles.input}
              onChangeText={(text) => setTone(text)}
              value={tone}
            />
          </View>
          <View>
            <Text style={styles.text}>BPM</Text>
            <TextInput
              placeholderTextColor="#E1E1E1"
              style={styles.input}
              onChangeText={(text) => setBpm(text)}
              value={bpm}
            />
          </View>
        </View>
      </View>
      <View>
        <Text style={{ fontSize: 20, color: "#E1E1E1", marginBottom: 10 }}>
          Referências
        </Text>
      </View>
      <Text style={styles.text}>Link YouTube</Text>
      <TextInput
        onChangeText={(text) => setVideo(text)}
        placeholder="Link YouTube"
        placeholderTextColor="#E1E1E1"
        style={styles.input}
        value={video}
      />
      <Text style={styles.text}>Link Cifra</Text>
      <TextInput
        onChangeText={(text) => setCipher(text)}
        placeholder="Link Cifra"
        placeholderTextColor="#E1E1E1"
        style={styles.input}
        value={cipher}
      />
      <Text style={styles.text}>Link Letra</Text>
      <TextInput
        onChangeText={(text) => setLyrics(text)}
        placeholder="Link Letra"
        placeholderTextColor="#E1E1E1"
        style={styles.input}
        value={lyrics}
      />
      <TouchableOpacity 
        style={styles.button}
        onPress={editLinksMusicDetails}
      >
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#121212",
  },
  input: {
    padding: 10,
    borderRadius: 15,
    borderColor: "#E1E1E1",
    backgroundColor: "#121212",
    borderWidth: 1,
    color: "white",
    marginBottom: 20,
    fontWeight: "bold",
    fontSize: 16,
  },
  text: {
    color: "#E1E1E1",
    fontSize: 12,
  },
  button: {
    width: 85,
    height: 60,
    backgroundColor: "#018786",
    bottom: 10,
    left: 230,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});