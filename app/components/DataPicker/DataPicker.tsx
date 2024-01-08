import { StyleSheet, Button, View, Text, TouchableOpacity } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";

export function DataPicker() {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState<"date" | "time">("date");

  const onChange = (e: DateTimePickerEvent, selectedDate?: Date) => {
    if(e?.type === "set") {
      const current = selectedDate || date;
      setShow(false);
      setDate(current);
    } else {
      setShow(false)
    }
  };

  const showMode = (modeToShow: "date" | "time") => {
    setMode(modeToShow);
    setShow(true); 
  }

  return (
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
          <MaterialIcons size={20} name="calendar-today" />
          <Text style={{ fontSize: 20 }}>{date.toDateString()}</Text>
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
          <MaterialIcons size={20} name="alarm-on" />
          <Text style={{ fontSize: 20 }}>
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
  );
}

const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-between"
    },
    button: {
      marginTop: 10,
      backgroundColor: "#fff",
      paddingVertical: 15,
      paddingHorizontal: 15,
      borderWidth: 1,
      borderColor: "#ccc",
      outlineStyle: "none",
      fontSize: 16,
    },
});