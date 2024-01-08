import { useState, useEffect } from "react";
import { supabase } from "../louvebrasilia/app/lib/supabase";
import Auth from "../louvebrasilia/app/components/Auth/Auth";
import { Session } from "@supabase/supabase-js";
import { Routes } from "./app/routes";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <NavigationContainer>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar
          barStyle="light-content" 
          backgroundColor="#121212"
        />
        {session && session.user ? (<Routes />) : (<Auth />)}
      </GestureHandlerRootView>
    </NavigationContainer>
  );
}