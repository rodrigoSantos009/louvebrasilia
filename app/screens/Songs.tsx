import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { SongsItems } from "../components/SongsItems";
import { Artist } from "../components/ArtistItems";

const Tab = createMaterialTopTabNavigator()

export function Songs() {
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
        name="Musícas" 
        component={SongsItems} 
      />
      <Tab.Screen 
        name="Artistas" 
        component={Artist} 
      />
    </Tab.Navigator>   
  );
}
