import { Feather } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

import { MaterialIcons } from "@expo/vector-icons";
import { StackType } from "./CreateSchedule";
import { supabase } from "../../lib/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function Informations() {
  const { navigate } = useNavigation<StackType>();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState<"date" | "time">("date");
  const [currentUser, setCurrentUser] = useState<string | undefined>("")

  const onChange = (e: DateTimePickerEvent, selectedDate?: Date) => {
    if (e?.type === "set") {
      const current = selectedDate || date;
      setShow(false);
      setDate(current);
    } else {
      setShow(false);
    }
  };

  const showMode = (modeToShow: "date" | "time") => {
    setMode(modeToShow);
    setShow(true);
  };

  const getCurrentUser = async () => {
    const {data: { user }} = await supabase.auth.getUser();
    setCurrentUser(user?.id)
  }

  const saveScheduleMembers = async (schedule_id: string) => {
    const data = await AsyncStorage.getItem("selectedUsers");
    let members = [];
    if(data !== null) members = JSON.parse(data);
    
    if (schedule_id !== null) {
      const dataToInsert = members.map((user_id: string) => ({
        schedule_id,
        user_id
      }));

      const { error } = await supabase
        .from("Schedules_Members")
        .upsert(dataToInsert);
    }
  }

  const saveScheduleSongs = async (schedule_id: string) => {
    const data = await AsyncStorage.getItem("selectedMusics");
    let songs = [];
    if(data !== null) songs = JSON.parse(data);
    
    if (schedule_id !== null) {
      const dataToInsert = songs.map((music_id: string) => ({
        schedule_id,
        music_id
      }));

      const { error } = await supabase
        .from("Schedules_Musics")
        .upsert(dataToInsert);
      console.log(error);
    }

  }

  const saveSchedule = async (title: string, date: Date) => {
    if(title === "") {
      return
    }

    const dateObj = new Date(date);
    const day = String(dateObj.getUTCDate()).padStart(2, "0");
    const month = String(dateObj.getUTCMonth() + 1).padStart(2, "0");
    const year = dateObj.getUTCFullYear();
    const formattedDate = `${month}-${day}-${year}`;

    const hours = String(dateObj.getUTCHours()).padStart(2, "0");
    const minutes = String(dateObj.getUTCMinutes()).padStart(2, "0");
    const formattedTime = `${hours}:${minutes}`;
    
    const { data, error } = await supabase
      .from("Schedules")
      .insert({
        title: title,
        schedule_date: formattedDate,
        schedule_time: formattedTime,
        user_id: currentUser,
      })
      .select("id");
    let scheduleId;
    data ? scheduleId = data[0].id : null

    await saveScheduleMembers(scheduleId);
    await saveScheduleSongs(scheduleId);

    await AsyncStorage.clear();
    
    navigate("Schedules");
  }

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <View
      style={{
        paddingHorizontal: 10,
        flexDirection: "column",
        backgroundColor: "#121212",
        flex: 1,
      }}
    >
      <TextInput
        style={styles.input}
        placeholder="Título"
        placeholderTextColor="#E1E1E1"
        value={title}
        onChangeText={(text) => setTitle(text)}
      ></TextInput>
      <View>
        <View style={styles.container}>
          <TouchableOpacity
            style={[styles.button, { width: 200 }]}
            onPress={() => showMode("date")}
          >
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <MaterialIcons size={20} name="calendar-today" color="#E1E1E1" />
              <Text style={{ fontSize: 20, color: "#E1E1E1" }}>
                {date.toDateString()}
              </Text>
            </View>
            {show && (
              <DateTimePicker
                value={date}
                mode={mode}
                is24Hour={true}
                onChange={onChange}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { width: 120 }]}
            onPress={() => showMode("time")}
          >
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <MaterialIcons size={20} name="alarm-on" color="#E1E1E1" />
              <Text style={{ fontSize: 20, color: "#E1E1E1" }}>
                {date.getHours()}:{date.getMinutes()}
              </Text>
            </View>
            {show && (
              <DateTimePicker
                value={date}
                mode={mode}
                is24Hour={true}
                onChange={onChange}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <TextInput
        style={[styles.input, { height: 110 }]}
        placeholder="Observações"
        placeholderTextColor="#E1E1E1"
      ></TextInput>
      <TouchableOpacity
        onPress={() => saveSchedule(title, date)}
        style={{
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
        }}
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
    </View>
  );
}
  
const styles = StyleSheet.create({
  input: {
    marginTop: 10,
    backgroundColor: "#121212",
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "white",
    outlineStyle: "none",
    fontSize: 16,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    marginTop: 10,
    backgroundColor: "#121212",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "white",
    outlineStyle: "none",
    fontSize: 16,
  },
});