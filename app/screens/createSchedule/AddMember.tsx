import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";

import AsyncStorage, { useAsyncStorage } from "@react-native-async-storage/async-storage";

import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Switch,
} from "react-native";

// selectUser => filtrar os usúarios que estão no agendamento === todos os usúarios

import img_avatar from "../../../assets/img_avatar.png";
import { StackType } from "./CreateSchedule";
import { supabase } from "../../lib/supabase";

type UserProps = {
  id: string;
  avatar: string;
  full_name: string;
}[];

type ParamsProps = {
  scheduleDate: Date;
  scheduleHour: Date;
};

export function AddMember() {
  const [isEnabled, setIsEnabled] = useState(false);
  const { navigate } = useNavigation<StackType>();

  const [users, setUsers] = useState<UserProps>([]);
  const [membersGroup, setMembersGroup] = useState([])
  const [selectedUser, setSelectedUser] = useState<string[]>([]);

  const toggleSwitch = async (id: string) => {
    let updatedUserList: string[];
    if(selectedUser.includes(id)) {
      updatedUserList = selectedUser.filter(userId => userId !== id);
    } else {
      updatedUserList = [...selectedUser, id];
    }
      
    setSelectedUser(updatedUserList); 
  }

  const saveMembers = async () => {
     try {
       const json = JSON.stringify(selectedUser);
       await AsyncStorage.setItem("selectedUsers", json);
       navigate("Participants", { selectedUserIds: selectedUser });
     } catch (error) {
       console.log("Error => ", error);
     }
  }

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase.from("profiles").select("*");
      if (error) {
        throw error;
      }
      setUsers(data)
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchSelectedUser = async () => {
    try {
      const storedSelectedUser = await AsyncStorage.getItem("selectedUsers");
      if (storedSelectedUser !== null) {
        setSelectedUser(JSON.parse(storedSelectedUser));
      }
    } catch (error) {
      console.error("Erro ao recuperar os usuários selecionados:", error);
    }
  };

  useEffect(() => {
    fetchSelectedUser();
    fetchUsers()
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
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TextInput
          placeholder="Buscar por nome"
          placeholderTextColor="#E1E1E1"
          style={{
            color: "#E1E1E1",
            marginVertical: 10,
            backgroundColor: "#121212",
            paddingLeft: 40,
            paddingVertical: 8,
            borderWidth: 1,
            borderColor: "#E1E1E1",
            fontSize: 16,
            borderRadius: 10,
            width: 370,
          }}
        />
        <MaterialIcons
          color="#E1E1E1"
          size={30}
          style={{ position: "absolute", marginLeft: 5 }}
          name="search"
        />
      </View>
      {users.length > 0 ? (
        <View style={{ justifyContent: "center" }}>
          {users?.map((user, index) => (
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
              <Switch
                trackColor={{ false: "#767577", true: "#018786" }}
                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => toggleSwitch(user.id)}
                value={selectedUser.includes(user.id)}
              />
            </View>
          ))}
        </View>
      ) : (
        <View
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        >
          <MaterialIcons size={30} name="person" />
          <Text>Para adicionar um participante, clique no botão</Text>
          <Text>( + Incluir Participante )</Text>
        </View>
      )}
      <TouchableOpacity
        onPress={saveMembers}
        style={{
          width: 45,
          height: 45,
          backgroundColor: "#1eb2a6",
          position: "absolute",
          bottom: 60,
          right: 20,
          borderRadius: 15,
        }}
      >
        <Feather
          size={25}
          color={"white"}
          style={{ textAlign: "center", lineHeight: 43 }}
          name="plus"
        />
      </TouchableOpacity>
    </View>
  );
}
