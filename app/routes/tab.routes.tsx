import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../screens/Home";
import { Songs } from "../screens/Songs";
import { CustomTabBar } from "../components/customTabBar/CustomTabBar";
import { Schedules } from "../screens/Schedules";

const Tab = createBottomTabNavigator();

export function TabRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#121212" },
        headerTintColor: "#E1E1E1",
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen
        name="Início"
        component={Home}
        options={{
          tabBarIcon: "home",
        }}
      />
      <Tab.Screen
        name="Schedules"
        component={Schedules}
        options={{
          title: "Escalas",
          tabBarIcon: "schedule",
        }}
      />
      <Tab.Screen
        name="Repertório"
        component={Songs}
        options={{
          tabBarIcon: "music-note",
        }}
      />
    </Tab.Navigator>
  );
}
