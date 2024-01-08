import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { supabase } from "../lib/supabase";
import { StackType } from "../screens/createSchedule/CreateSchedule";

import dayjs from "dayjs";
import { FlatList } from "react-native-gesture-handler";
import { RenderSchedules } from "./SchedulesComponent/RenderSchedules";

type SchedulesProps = {
  id: string
  title: string,
  schedule_date: string,
  schedule_time: string
}[]

export function Next() {
  const [schedules, setSchedules] = useState<SchedulesProps>([]);
  const navigation = useNavigation<StackType>();
  const isFocused = useIsFocused();

  const today = dayjs()

  const getSchedules = async () => {
    try {
      const { data, error } = await supabase.from("Schedules").select().gte("schedule_date", today);
      if(error) throw error;
      setSchedules(data);
    } catch (error) {
      
    }
  }

  useEffect(() => {
    isFocused && getSchedules();
  }, [isFocused])

  return (
    <View
      style={styles.container}
    >
      {schedules.length > 0 ? (
        <View style={{ gap: 4, marginBottom: 80 }}>
          <FlatList 
            ItemSeparatorComponent={() => <View style={{ height: 8 }}></View>}
            data={schedules}
            renderItem={({ item }) => <RenderSchedules {...item} /> }
          />
        </View>
      ) : (
        <View
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        >
          <Text style={{ color: "#E1E1E1" }}>Lista vazia...</Text>
          <Text style={{ color: "#E1E1E1" }}>
            Para cadastrar uma escala, clique no botão
          </Text>
          <Text style={{ color: "#E1E1E1" }}>( + )</Text>
        </View>
      )}
      <TouchableOpacity
        onPress={() => navigation.navigate("CreateSchedule")}
        style={styles.buttonCreate}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 10,
    backgroundColor: "#121212",
    paddingHorizontal: 20,
  },
  text: {
    color: "#9e9fa4",
  },
  buttonCreate: {
    width: 50,
    height: 50,
    backgroundColor: "#018786",
    position: "absolute",
    bottom: 60,
    right: 20,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});