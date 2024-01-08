import { Alert, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { MusicsSchedule } from './MusicsSchedule';
import { MembersSchedule } from './MembersSchedule';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigator, StackType } from '../screens/createSchedule/CreateSchedule';
import { MaterialIcons } from '@expo/vector-icons';
import { supabase } from '../lib/supabase';

const Tab = createMaterialTopTabNavigator();

export function ScheduleDetails({ navigation }: { navigation: any }) {
  const route = useRoute<RouteProp<StackNavigator, "ScheduleDetails">>();
  const { navigate } = useNavigation<StackType>();

  const deleteSchedule = async () => {
    const { error } = await supabase
      .from("Schedules")
      .delete()
      .eq("id", route.params.id)

      navigate("Schedules");
  }

  const handleDeleteSchedule = () => {
    Alert.alert("Atenção!", "Deseja excluir a música?", [
      {
        text: "Cancelar",
        onPress: () => null,
        style: "cancel",
      },
      { text: "Sim", onPress: () => deleteSchedule() },
    ]);
    return true;
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: "row", gap: 15 }}>
          <MaterialIcons
            name="edit"
            size={22}
            color="#EDEDED"
            onPress={() =>
              navigate("Schedules")
            }
          />

          <MaterialIcons
            name="delete"
            size={22}
            color="#EDEDED"
            onPress={handleDeleteSchedule}
          />
        </View>
      ),
    });
  }, []);

  return (
    <>
      <Text
        style={{
          paddingHorizontal: 20,
          color: "#018786",
          backgroundColor: "#121212",
          fontSize: 30,
          paddingVertical: 20,
        }}
      >
        Test
      </Text>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: "#121212" },
          tabBarLabelStyle: {
            color: "#E1E1E1",
            fontWeight: "800",
            fontSize: 12,
          },
          tabBarIndicatorStyle: { backgroundColor: "#018786" },
        }}
      >
        <Tab.Screen
          initialParams={{ id: route.params.id }}
          name="Musics Schedule"
          component={MusicsSchedule}
          options={{ title: "Músicas" }}
        />
        <Tab.Screen
          initialParams={{ id: route.params.id }}
          name="Members Schedule"
          component={MembersSchedule}
          options={{ title: "Participantes" }}
        />
      </Tab.Navigator>
    </>
  );
}