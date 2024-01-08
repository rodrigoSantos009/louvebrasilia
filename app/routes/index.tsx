import { NavigationContainer } from "@react-navigation/native"
import { TabRoutes } from "./tab.routes"
import { MyDrawer } from "./drawer.routes"
import { StackRoutes } from "./stack.routes";
import { SafeAreaProvider } from "react-native-safe-area-context";

export function Routes() {
  return (
    <SafeAreaProvider>
      <StackRoutes />
    </SafeAreaProvider>
  );
}