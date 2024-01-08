import React, { useState } from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import { supabase } from "../../lib/supabase";
import { Input } from "react-native-elements";
import { Text } from "react-native";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function saveProfile(userId: string | undefined) {
    const profile = {
      id: userId,
      full_name: name,
    };
    const { error } = await supabase.from("profiles").upsert(profile);
  }

  async function signUpWithEmail() {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    await saveProfile(data.user?.id);
  }

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          label="Nome"
          labelStyle={{ color: "#E2E2E2" }}
          leftIcon={{
            type: "font-awesome",
            name: "envelope",
            color: "#E2E2E2",
          }}
          onChangeText={(text) => setName(text)}
          value={name}
          placeholder="Joao"
          placeholderTextColor="#E1E1E1E1"
          autoCapitalize={"none"}
          inputStyle={{ color: "#E2E2E2" }}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          label="Email"
          labelStyle={{ color: "#E2E2E2" }}
          leftIcon={{
            type: "font-awesome",
            name: "envelope",
            color: "#E2E2E2",
          }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          placeholderTextColor="#E1E1E1E1"
          autoCapitalize={"none"}
          inputStyle={{ color: "#E2E2E2" }}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Password"
          labelStyle={{ color: "#E2E2E2" }}
          leftIcon={{ type: "font-awesome", name: "lock", color: "#E2E2E2" }}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          placeholderTextColor="#E1E1E1E1"
          autoCapitalize={"none"}
          inputStyle={{ color: "#E2E2E2" }}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <TouchableOpacity
          style={{ backgroundColor: "#23036A", padding: 10, borderRadius: 5 }}
          onPress={() => signUpWithEmail()}
        >
          <Text
            style={{
              textAlign: "center",
              color: "#E2E2E2",
              fontWeight: "bold",
            }}
          >
            Registrar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
    backgroundColor: "#1E1E1E",
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
});
