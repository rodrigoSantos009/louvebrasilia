import { BottomTabDescriptorMap, BottomTabNavigationEventMap } from "@react-navigation/bottom-tabs/lib/typescript/src/types";
import { NavigationHelpers, ParamListBase, TabNavigationState } from "@react-navigation/native";
import { Platform, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface TabBarProps {
  state: TabNavigationState<ParamListBase>;
  descriptors: BottomTabDescriptorMap;
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
}

export function CustomTabBar({ state, descriptors, navigation }: TabBarProps) {
  return (
    <View
      style={{ justifyContent: "center", alignItems: "center" }}
    >
      <View
        style={{
          flexDirection: "row",
          marginBottom: Platform.OS === "ios" ? 38 : 24,
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          bottom: 0,
          gap: 50,
          elevation: 8,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 3.8,
        }}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({
                name: route.name,
                params: route,
                merge: true,
              });
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
            >
              <View>
                <View>
                  <MaterialIcons
                    name={options.tabBarIcon}
                    size={30}
                    color={isFocused ? "#8f2abd" : "#535353"}
                  />
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}