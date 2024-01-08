import { View, Button, StyleSheet } from "react-native";
import { supabase } from "../lib/supabase";

export function Home() {
  return (
    <View style={styles.container}>
      <View style={styles.verticallySpaced}>
        <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    padding: 12,
    backgroundColor: "#121212",
    flex: 1
  },
  verticallySpaced: {
    paddingTop: 50,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
});