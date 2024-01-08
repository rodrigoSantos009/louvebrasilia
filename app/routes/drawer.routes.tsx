import "react-native-gesture-handler";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { Routes } from ".";
import { TabRoutes } from "./tab.routes";

const Drawer = createDrawerNavigator();

export function MyDrawer() {
  return (
    <Drawer.Navigator screenOptions={{ headerTintColor: "white", title: "", headerStyle: {backgroundColor: "#121212" }}}>
      <Drawer.Screen name="Feed" component={TabRoutes} />
    </Drawer.Navigator>
  );
}