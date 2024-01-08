import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Next } from "../components/Next";
import { Prev } from "../components/Prev";

const Tab = createMaterialTopTabNavigator();

export function Schedules() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: "#121212" },
        tabBarLabelStyle: {
          color: "#E2E2E2",
          fontWeight: "700",
        },
        tabBarIndicatorStyle: { backgroundColor: "#E2E2E2" },
      }}
    >
      <Tab.Screen 
        name="Next" 
        component={Next} 
      />
      <Tab.Screen 
        name="Prev" 
        component={Prev} 
      />
    </Tab.Navigator>
  );
}
