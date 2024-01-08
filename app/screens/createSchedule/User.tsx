import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, Image } from "react-native";
import { supabase } from "../../lib/supabase";
import { MaterialIcons } from "@expo/vector-icons";

type UserProps = {
  id: string;
  avatar: string;
  username: string;
}[];

export function Users() {
  const [users, setUsers] = useState<UserProps>([]);
  const [members, setMembers] = useState<UserProps>([]);
  
  const fetchSelectedUser = async () => {
    try {
      const storedSelectedUser = await AsyncStorage.getItem("selectedUsers");
      if (storedSelectedUser !== null) {
        const parsedSelectedUser = JSON.parse(storedSelectedUser);
        return parsedSelectedUser;
      } 
    } catch (error) {
      console.error("Erro ao recuperar os usuários selecionados:", error);
    }
  };
  
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

  const fetchUserData = async () => {
    const ids = (await fetchSelectedUser()) as string[];
    fetchUsers(ids);
  };

  const deleteUser = (id: string) => {
    const usersUpdate = members.filter((user) => user.id !== id);
    const ids = usersUpdate.map((user) => user.id);
    AsyncStorage.setItem("selectedUsers", JSON.stringify(ids));
    setMembers(usersUpdate);
  };

  useEffect(() => {  
    fetchUserData();
  }, [users]);

  return (
    <View>
      {users.length > 0 ? (
        <View style={{ width: 300 }}>
          {users.map((user, index) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 10,
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
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  {user.username}
                </Text>
              </View>
              <MaterialIcons
                onPress={() => deleteUser(user.id)}
                size={25}
                name="delete"
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
    </View>
  );
}