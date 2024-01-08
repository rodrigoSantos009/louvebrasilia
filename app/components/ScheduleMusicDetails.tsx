import { Feather, MaterialIcons } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Alert, Image, Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { StackNavigator, StackType } from "../screens/createSchedule/CreateSchedule";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { SongStackType } from "../routes/createMusicStack.routes";

type MusicProps = {
  id: string,
  cover: string
  name: string,
  album_title: string,
  artist_picture: string,
  artist: string,
  tone: string,
  bpm: string,
  lyrics_url: string,
  cipher_url: string,
  youtube_url: string
}

export function ScheduleMusicDetails({ navigation }: { navigation: any }) {
  const { navigate } = useNavigation<StackType>();
  const route = useRoute<RouteProp<StackNavigator, "ScheduleMusicDetails">>();
  const [musicId, setMusicId] = useState<string>(route.params.music_id);
  const [music, setMusic] = useState<MusicProps | null>(null);

  const getMusicById = async () => {
    const { data, error } = await supabase
      .from("Musics")
      .select("*")
      .eq("id", musicId);
      if(data) setMusic(data ? data[0] : null);
  }

  const openLink = (url: string) => {
    if(url !== "") Linking.openURL(url);
  }

  const deleteMusic = async () => {
    const { error } = await supabase
      .from("Schedules_Musics")
      .delete()
      .eq("music_id", musicId)
  }

  const handleDeleteMusic = () => {
    Alert.alert("Atenção!", "Deseja excluir a música?", [
      {
        text: "Cancelar",
        onPress: () => null,
        style: "cancel",
      },
      { text: "Sim", onPress: () => deleteMusic() },
    ]);
    return true;
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: "row", gap: 15 }}>
          <MaterialIcons
            name="edit"
            size={22}
            color="#EDEDED"
            onPress={() =>
              navigate("EditScheduleMusicDetails", { music_id: musicId })
            }
          />

          <MaterialIcons
            name="delete"
            size={22}
            color="#EDEDED"
            onPress={handleDeleteMusic}
          />
        </View>
      ),
    });
  }, [])

  useEffect(() => {
    getMusicById();
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Image source={{ uri: music?.cover }} height={96} width={96} />
        </View>
        <View style={{ justifyContent: "space-between" }}>
          <Text style={{ color: "#EDEDED", fontSize: 17, fontWeight: "600" }}>
            {music?.name
              ? music?.name.length > 24
                ? music?.name.slice(0, 24) + "..."
                : music?.name
              : ""}
          </Text>
          <Text style={{ color: "#EDEDED", fontWeight: "500", fontSize: 14 }}>
            Álbum:{" "}
            {music?.album_title
              ? music!.album_title.length > 24
                ? music?.album_title.slice(0, 24) + "..."
                : music?.album_title
              : ""}
          </Text>
          <View style={{ flexDirection: "row", gap: 15, alignItems: "center" }}>
            <Image
              source={{ uri: music?.artist_picture }}
              height={35}
              width={35}
              style={{ borderRadius: 50 }}
            />
            <Text style={{ color: "#EDEDED" }}>{music?.artist}</Text>
          </View>
        </View>
      </View>
      <View
        style={{
          marginVertical: 20,
          backgroundColor: "#1C1C1C",
          padding: 20,
          borderRadius: 25,
          flexDirection: "row",
          gap: 5,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#EDEDED", fontSize: 20, fontWeight: "500" }}>
          Versão
        </Text>
        <Text style={{ color: "#7E7E7E" }}>(Original)</Text>
      </View>
      <View
        style={{ padding: 15, backgroundColor: "#1C1C1C", borderRadius: 20 }}
      >
        <Text style={{ color: "#7E7E7E", fontSize: 15 }}>Classificações</Text>
        <Text style={{ color: "#EDEDED", fontSize: 20 }}>Louvor</Text>
        <View
          style={{
            flexDirection: "row",
            gap: 5,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ marginVertical: 20 }}>
            <Text style={{ color: "#7E7E7E", fontSize: 18 }}>Tom</Text>
            <Text style={{ color: "#EDEDED", fontSize: 18 }}>
              {music?.tone ? music.tone : ""}
            </Text>
          </View>
          <View
            style={{
              borderColor: "#7E7E7E",
              borderWidth: 1,
              borderRadius: 20,
              paddingHorizontal: 30,
              paddingVertical: 10,
              flexDirection: "row",
              gap: 5,
            }}
          >
            <Text style={{ color: "#7E7E7E" }}>BPM:</Text>
            <Text style={{ color: "#EDEDED" }}>
              {music?.bpm ? music.bpm : ""}
            </Text>
          </View>
        </View>
        <Text style={{ fontSize: 15, color: "#7E7E7E", marginBottom: 15 }}>
          Referências
        </Text>
        <View>
          <View style={styles.links}>
            <Feather size={20} color="#4bac4d" name="list" />
            <TouchableOpacity
              style={{ width: 200 }}
              onPress={() =>
                openLink(music?.lyrics_url ? music.lyrics_url : "")
              }
            >
              <Text style={styles.itemLinks}>Letra</Text>
              <Text style={styles.url}>
                {music?.lyrics_url
                  ? music?.lyrics_url.length > 44
                    ? music?.lyrics_url.slice(0, 44) + "..."
                    : music?.lyrics_url
                  : ""}
              </Text>
            </TouchableOpacity>
            <Feather size={20} color="#EDEDED" name="arrow-right" />
          </View>
          <View style={styles.links}>
            <Feather size={20} color="#2298f4" name="music" />
            <TouchableOpacity
              style={{ width: 200 }}
              onPress={() =>
                openLink(music?.cipher_url ? music.cipher_url : "")
              }
            >
              <Text style={styles.itemLinks}>Cifra</Text>
              <Text style={styles.url}>
                {music?.cipher_url
                  ? music?.cipher_url.length > 44
                    ? music?.cipher_url.slice(0, 44) + "..."
                    : music?.cipher_url
                  : ""}
              </Text>
            </TouchableOpacity>
            <Feather size={20} color="#EDEDED" name="arrow-right" />
          </View>
          <View style={styles.links}>
            <Feather size={20} color="#f34136" name="video" />
            <TouchableOpacity
              style={{ width: 200 }}
              onPress={() =>
                openLink(music?.youtube_url ? music.youtube_url : "")
              }
            >
              <Text style={styles.itemLinks}>Vídeo</Text>
              <Text style={styles.url}>
                {music?.youtube_url
                  ? music?.youtube_url.length > 44
                    ? music?.youtube_url.slice(0, 44) + "..."
                    : music?.youtube_url
                  : ""}
              </Text>
            </TouchableOpacity>
            <Feather size={20} color="#EDEDED" name="arrow-right" />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingHorizontal: 20,
  },
  header: {
    paddingTop: 15,
    flexDirection: "row",
    gap: 15,
  },
  links: {
    flexDirection: "row",
    gap: 5,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  itemLinks: {
    fontSize: 15,
    color: "#EDEDED",
    fontWeight: "500",
  },
  url: {
    color: "#7E7E7E",
    fontSize: 10
  },
});