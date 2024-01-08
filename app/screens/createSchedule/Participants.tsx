import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity , Image, Alert, BackHandler} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackNavigator, StackType } from "./CreateSchedule";
import { supabase } from "../../lib/supabase";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";

type UserProps = {
  id: string;
  avatar: string;
  full_name: string;
}[];

type ParticipantsProps = NativeStackScreenProps<StackNavigator, "Participants">;

export function Participants({ route }: ParticipantsProps) {
  const { navigate } = useNavigation<StackType>();
  const [users, setUsers] = useState<UserProps>([]);
  const [members, setMembers] = useState<Array<string>>([]);

  useNavigation<NativeStackNavigationProp<StackNavigator>>();

  const fetchSelectedUser = async () => {
   try {
      const store = await AsyncStorage.getItem("selectedUsers");
      if (store !== null) {
        const parsedSelectedUser = JSON.parse(store);
        setMembers(parsedSelectedUser);
        fetchUsers(parsedSelectedUser);
      } 
    } catch (error) {
      console.error("Erro ao recuperar os usuários selecionados:", error);
    }  
  };

  const fetchSheduleMembers = async () => {
    try {
      const { data, error } = await supabase
        .from("Schedules_Members")
        .select("profiles(id, avatar, full_name)")
        .eq("schedule_id", route.params);
    } catch (error) {
      console.log(error);
    }
  }
  
  const fetchUsers = async (ids: string[]) => {  
    try {
      const { data, error } = await supabase.from("profiles").select("*").in("id", ids);
      if (error) {
        throw error;
      }
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const deleteUser = async (id: string) => {
    try {
      const usersUpdate = members.filter((members_id) => members_id !== id);
      await AsyncStorage.setItem("selectedUsers", JSON.stringify(usersUpdate));
      setMembers(usersUpdate);
      fetchSelectedUser();
    } catch (error) {
      return error;
    } 
  }

  useEffect(() => {
    fetchSelectedUser();
  }, [route.params]);

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Atenção", "Deseja cancelar?", [
        {
          text: "Cancelar",
          onPress: () => null,
          style: "cancel",
        },
        { text: "Sim", onPress: () => navigate("Schedules") },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        paddingTop: 10,
        paddingHorizontal: 20,
        backgroundColor: "#121212",
      }}
    >
      <View>
        <TouchableOpacity
          onPress={() => navigate("AddMember")}
          style={{
            width: 200,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#018786",
            padding: 10,
            borderRadius: 20,
            marginBottom: 25,
          }}
        >
          <MaterialIcons size={20} color="white" name="add" />
          <Text style={{ color: "white", fontWeight: "bold" }}>
            Incluir Participantes
          </Text>
        </TouchableOpacity>
      </View>
      {users.length > 0 ? (
        <View style={{ justifyContent: "center" }}>
          {users.map((user, index) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 10,
                paddingHorizontal: 15,
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
              >
                <Image
                  style={{ width: 40, height: 40, borderRadius: 50 }}
                  source={require("../../../assets/img_avatar.png")}
                  alt="Avatar"
                />
                <Text
                  style={{ fontSize: 16, fontWeight: "bold", color: "#E1E1E1" }}
                >
                  {user.full_name}
                </Text>
              </View>
              <MaterialIcons
                onPress={() => deleteUser(user.id)}
                size={25}
                name="delete"
                color="#B00020"
              />
            </View>
          ))}
        </View>
      ) : (
        <View
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        >
          <MaterialIcons size={30} name="person" color="#E1E1E1" />
          <Text style={{ color: "#E1E1E1" }}>
            Para adicionar um participante, clique no botão
          </Text>
          <Text style={{ color: "#E1E1E1" }}>( + Incluir Participante )</Text>
        </View>
      )}
    </View>
  );
}
