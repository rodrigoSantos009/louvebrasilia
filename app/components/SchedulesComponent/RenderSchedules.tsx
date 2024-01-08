import { Feather } from "@expo/vector-icons";
import { TouchableOpacity, View, Text, StyleSheet, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackType } from "../../screens/createSchedule/CreateSchedule";
import { SchedulesProps } from "../Prev";

export function RenderSchedules(schedules: SchedulesProps) {
  const navigation = useNavigation<StackType>();
  const windowWidth = Dimensions.get("window").width;
  return (
    <View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ScheduleDetails", { id: schedules.id })
        }
        style={{
          backgroundColor: "#1C1C1C",
          borderRadius: 15,
          marginBottom: 10,
        }}
      >
        <View
          style={{
            width: windowWidth,
            padding: 10,
            flexDirection: "row",
            gap: 10,
          }}
        >
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text style={{ color: "#017374" }}>1</Text>
            <Text style={styles.text}>SET</Text>
            <Text style={{ color: "#6c6f74" }}>SEX</Text>
          </View>
          <View style={{ width: 260 }}>
            <Text style={{ fontSize: 20, color: "#E2E2E2" }}>
              {schedules.title}
            </Text>
            <Text style={styles.text}>{schedules.schedule_date}</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={styles.text}>
                <Feather color="#9e9fa4" name="moon" />
                {schedules.schedule_time}
              </Text>
              <Text style={{ color: "#017374" }}>
                <Feather name="user" />5
              </Text>
              <Text style={{ color: "#BB86FC" }}>
                <Feather name="music" />4
              </Text>
              <Text style={styles.text}>
                <Feather name="edit-2" />
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#9e9fa4",
  },
});
