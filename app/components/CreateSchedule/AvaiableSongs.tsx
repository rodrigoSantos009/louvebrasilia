import { View, Text } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { MusicProps } from '../../screens/createSchedule/AddMusic';

interface AvaiableSongsProps {
  song: MusicProps;
  selectedMusic: string[];
  setSelectedMusic: (updatedMusicList: string[]) => void;
}

export function AvaiableSongs({song, selectedMusic, setSelectedMusic}: AvaiableSongsProps) {
  const toggleSwitch = async (id: string) => {
    let updatedMusicList: string[];
    if (selectedMusic.includes(id)) {
      updatedMusicList = selectedMusic.filter((musicId) => musicId !== id);
    } else {
      updatedMusicList = [...selectedMusic, id];
    }

    setSelectedMusic(updatedMusicList);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
      }}
    >
      <View>
        <View
          style={{
            width: 300,
            borderRadius: 10,
            padding: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1,
          }}
        >
          <View>
            <Text style={{ fontSize: 20, color: "#1eb2a6" }}>{song.name}</Text>
            <Text style={{ color: "#9e9fa4" }}>{song.artist}</Text>
            <Text style={{ color: "#6c6f74" }}>Tom: {song.tone}</Text>
          </View>
          <View>
            <View style={{ flexDirection: "row", gap: 4 }}>
              <Feather size={18} color="#d4943a" name="user" />
              <Feather size={18} color="#4bac4d" name="list" />
            </View>
            <View style={{ flexDirection: "row", gap: 4 }}>
              <Feather size={18} color="#2298f4" name="music" />
              <Feather size={18} color="#f34136" name="video" />
            </View>
          </View>
        </View>
      </View>
      <BouncyCheckbox
        size={30}
        fillColor="#1eb2a6"
        iconStyle={{ borderColor: "red" }}
        innerIconStyle={{ borderWidth: 2 }}
        isChecked={selectedMusic.includes(song.id)}
        onPress={() => toggleSwitch(song.id)}
      />
    </View>
  );
}

export default AvaiableSongs