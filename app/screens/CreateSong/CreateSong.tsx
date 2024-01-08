import { View, Text, TouchableOpacity, StyleSheet, TextInput, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { AntDesign, Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import { SongStackType } from '../../routes/createMusicStack.routes';

export function CreateSong() {
  const navigate = useNavigation<SongStackType>();
  const [songTitle, setSongTitle] = useState<string>('');

  async function searchSongs(title: string) {
    if(title === "") return;
    navigate.navigate("AddSong", {title: title});
  } 

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.buttonCreate}>
        <Feather name="plus" size={25} color="#E1E1E1" />
        <Text style={{ color: "#E1E1E1", fontWeight: "bold", fontSize: 15 }}>
          Cadastrar manualmente
        </Text>
        <AntDesign name="right" size={25} color="#E1E1E1" />
      </TouchableOpacity>

      <Text style={styles.text}>Buscar</Text>
      
      <TouchableOpacity onPress={() => navigate.goBack()} style={{ backgroundColor: "white", padding: 10 }}>
        <Text>BACK</Text>
      </TouchableOpacity>

      <View style={[styles.search]}>
        <Text style={{ color: "#E1E1E1", fontWeight: "500", marginBottom: 8 }}>
          Pesquise aqui o louvor para adicionar ao repertório.
        </Text>
        <View
          style={{
            flexDirection: "row",
            gap: 8,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TextInput
            value={songTitle}
            onChangeText={(text) => setSongTitle(text)}
            placeholder="Pesquisar"
            placeholderTextColor="#E1E1E1"
            style={styles.input}
          ></TextInput>
          <TouchableOpacity
            onPress={() => searchSongs(songTitle)}
            style={styles.buttonSearch}
          >
            <AntDesign name="search1" size={20} color="#E1E1E1" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#121212",
    flex: 1,
    paddingHorizontal: 20,
  },
  text: {
    color: "#E1E1E1",
    textAlign: "left",
    fontSize: 18,
    fontWeight: "700",
  },
  search: {
    marginTop: 15,
    backgroundColor: "#1E1E1E",
    height: 120,
    padding: 8,
    borderRadius: 15,
    justifyContent: "center",
    alignSelf: "center",
    width: "100%"
  },
  input: {
    width: "85%",
    borderColor: "#E1E1E1",
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 50,
    color: "#E1E1E1",
  },
  buttonSearch: {
    backgroundColor: "#BB86FC",
    borderRadius: 25,
    width: 45,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonCreate: {
    backgroundColor: "#1E1E1E",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: 65,
    marginTop: 10,
    marginBottom: 40,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 15,
    alignSelf: "center",
  },
});