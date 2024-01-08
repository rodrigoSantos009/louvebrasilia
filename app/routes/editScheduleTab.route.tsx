import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Informations } from "../screens/createSchedule/Informations";
import { Musics } from "../screens/createSchedule/Musics";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Participants } from "../screens/createSchedule/Participants";

export type StackNavigator = {
  Informations: undefined;
  AddMember: undefined;
  AddMusic: undefined;
  Participants: {
    selectedUserIds: string[];
  };
  Musics: {
    selectedSongsIds: string[];
  };
  Schedules: undefined;
  CreateSchedule: undefined;
  CreateMusic: undefined;
  ScheduleDetails: {
    id: string;
  };
  MusicsSchedule: {
    id: string;
  };
  MembersSchedule: {
    id: string;
  };
  ScheduleMusicDetails: {
    music_id: string;
  };
  EditScheduleMusicDetails: {
    music_id: string;
  };
  EditLinksScheduleMusicDetails: {
    music_id: string;
  };
};

export type StackType = NativeStackNavigationProp<StackNavigator>;

const Tab = createMaterialTopTabNavigator<StackNavigator>();

export function EditScheduleTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: "#121212" },
        tabBarLabelStyle: { color: "#E1E1E1", fontWeight: "800", fontSize: 12 },
        tabBarIndicatorStyle: { backgroundColor: "#018786" },
      }}
    >
      <Tab.Screen
        name="Informations"
        component={Informations}
        options={{ title: "Informações" }}
      />
      <Tab.Screen
        name="Participants"
        component={Participants}
        options={{ title: "Participantes" }}
      />
      <Tab.Screen
        name="Musics"
        component={Musics}
        options={{ title: "Músicas" }}
      />
    </Tab.Navigator>
  );
}
