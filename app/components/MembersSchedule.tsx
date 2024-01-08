import { View, Text, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { RouteProp, useRoute } from "@react-navigation/native";
import { StackNavigator } from "../screens/createSchedule/CreateSchedule";

type ProfileData = {
  full_name: string;
};

type MemberData = {
  profiles: ProfileData;
  schedule_id: string;
};

type MembersProps = MemberData[] | null;

export function MembersSchedule() {
  const route = useRoute<RouteProp<StackNavigator, "MembersSchedule">>()
  const [members, setMembers] = useState<MembersProps>([])
  
  const getScheduleMembers = async () => {
    try {
      const { data, error } = await supabase
        .from("Schedules_Members")
        .select("profiles(full_name)")
        .eq("schedule_id", route.params.id);

      setMembers(data as MembersProps);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    getScheduleMembers();
  }, []);
  
  return (
    <View style={styles.container}>
      {members?.map((member, index) => (
        <View
          key={index}
          style={{
            marginBottom: 20,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Image
              style={{ width: 40, height: 40, borderRadius: 50 }}
              source={require("../../assets/img_avatar.png")}
              alt="Avatar"
            />
            <Text
              style={{ fontSize: 16, fontWeight: "bold", color: "#E1E1E1" }}
            >
              {member.profiles.full_name}
            </Text>
          </View>
        </View>
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
