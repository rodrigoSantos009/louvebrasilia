import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from 'react'
import { getSongs } from '../../lib/queryDeezer'
import { RouteProp, useRoute } from '@react-navigation/native'
import { StackNavigator } from '../../routes/createMusicStack.routes'
import { StyleSheet } from 'react-native'
import { RenderSongs } from '../../components/RenderSongs'
import { TextInput } from 'react-native-paper'
import { MaterialIcons } from '@expo/vector-icons'

export type SongsProps = {
  id: string,
  title: string
  artist: {
    name: string,
    picture: string,
    picture_small: string
  },
  album: {
    title: string,
    cover: string
  }
}

export function AddSongToList() {
  const route = useRoute<RouteProp<StackNavigator, 'AddSong'>>();
  const [title, setTitle] = useState<string>(route.params?.title);
  const [songs, setSongs] = useState<SongsProps[]>([]);
  const [loading, setLoading] = useState(false);

  const foundSongs = async () => {
    try {
      setLoading(true)
      if(title) {
      const data = await getSongs(title);
      setSongs(data);
    }
    }catch(e) {
      console.log(e);
    }finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    foundSongs();
  }, [])

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Título ou Artista"
      ></TextInput>
      <TouchableOpacity style={styles.button} onPress={foundSongs}>
        <MaterialIcons color="#E1E1E1" size={20} name="search" />
        <Text style={{ color: "#E1E1E1" }}>Buscar</Text>
      </TouchableOpacity>
      <ActivityIndicator size={"large"} animating={loading} />
      <FlatList
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        data={songs}
        renderItem={({ item }) => <RenderSongs {...item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: "#121212",
  },
  button: {
    position: "absolute",
    right: 25,
    top: 10,
    backgroundColor: "#374045",
    borderRadius: 30,
    height: 40,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 4,
  },
  input: {
    height: 50,
    backgroundColor: "#121212",
    borderColor: "#E1E1E1",
    borderWidth: 1,
    marginTop: 5,
    marginBottom: 15,
    borderRadius: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    color: "#E1E1E1",
  },
});