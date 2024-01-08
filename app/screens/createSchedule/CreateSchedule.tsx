import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Participants } from "./Participants";
import { Informations } from "./Informations";
import { Musics } from "./Musics";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

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

export function CreateSchedule() { 
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
