import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { TabRoutes } from "./tab.routes";
import { ScheduleDetails } from "../components/ScheduleDetails";
import { CreateMusicStack } from "./createMusicStack.routes";
import { CreateScheduleStack } from "./createScheduleStack.routes";
import { ScheduleMusicDetails } from "../components/ScheduleMusicDetails";
import { EditScheduleMusicDetails } from "../components/EditScheduleMusicDetails";
import { EditLinksScheduleMusicDetails } from "../components/EditLinksScheduleMusic";

export function StackRoutes() {
  const Stack = createNativeStackNavigator();
  
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#121212" },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen
        name="home"
        component={TabRoutes}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateSchedule"
        component={CreateScheduleStack}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CreateMusic"
        component={CreateMusicStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ScheduleDetails"
        component={ScheduleDetails}
        options={{ title: "Escala" }}
      />
      <Stack.Screen
        name="ScheduleMusicDetails"
        component={ScheduleMusicDetails}
        options={{
          title: "Música",
        }}
      />
      <Stack.Screen
        name="EditScheduleMusicDetails"
        component={EditScheduleMusicDetails}
        options={{
          title: "Editar Música",
        }}
      />
      <Stack.Screen
        name="EditLinksScheduleMusicDetails"
        component={EditLinksScheduleMusicDetails}
        options={{
          title: "Editar versão"
        }}
      />
    </Stack.Navigator>
  );
}