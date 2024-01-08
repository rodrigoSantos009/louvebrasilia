import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native";
import SingIn from "./SingIn";
import SignUp from "./SignUp";

export default function Auth() {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  return (
    <View style={{ flex: 1, backgroundColor: "#1E1E1E" }}>
      {isLogin ? <SingIn /> : <SignUp />}
      <View style={{ paddingHorizontal: 10 }}>
        <TouchableOpacity
          style={{ backgroundColor: "#23036A", padding: 10, borderRadius: 5 }}
          onPress={() => setIsLogin((prevVal) => !prevVal)}
        >
          {<Text style={styles.text}>{isLogin ? "Cadastre-se" : "Entrar"}</Text>}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    color: "#E2E2E2",
    fontWeight: "bold",
  }
})