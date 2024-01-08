import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Feather } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigator, StackType } from '../screens/createSchedule/CreateSchedule';
import { supabase } from '../lib/supabase';
import { SongStackType } from '../routes/createMusicStack.routes';

type MusicData = {
  id: string;
  name: string;
  artist: string;
  tone: string;
};

type MusicsData = {
  Musics: MusicData;
  schedule_id: string;
};

type MusicsProps = MusicsData[] | null;

export function MusicsSchedule() {
  const route = useRoute<RouteProp<StackNavigator, "MusicsSchedule">>(); 
  const { navigate } = useNavigation<StackType>()
  const [musics, setMusics] = useState<MusicsProps>([]);

  const getScheduleMusic = async () => {
    const { data, error } = await supabase
      .from("Schedules_Musics")
      .select(
        `
      schedule_id, 
      Musics ( id, name, artist, tone )
    `
      )
      .eq("schedule_id", route.params.id);

    setMusics(data as MusicsProps);
  };

  useEffect(() => {
    getScheduleMusic();
  }, []);

  return (
    <View style={styles.container}>
      {musics?.map((music, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => navigate("ScheduleMusicDetails", {music_id: music.Musics.id})}
        >
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 1,
                marginBottom: 10
              }}
            >
              <View>
                <Text style={{ fontSize: 20, color: "#1eb2a6" }}>
                  {music.Musics.name}
                </Text>
                <Text style={{ color: "#9e9fa4" }}>{music.Musics.artist}</Text>
                <Text style={{ color: "#6c6f74" }}>
                  Louvor, Tom: {music.Musics.tone}
                </Text>
              </View>
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
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingHorizontal: 20,
    paddingTop: 20
  }
})