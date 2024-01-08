import { NativeStackNavigationProp, createNativeStackNavigator } from "@react-navigation/native-stack";
import { CreateSong } from "../screens/CreateSong/CreateSong";
import { AddSongToList } from "../screens/CreateSong/AddSongToList";
import { SongDetails } from "../components/SongDetails";
import { InsertLinks } from "../components/InsertLinksToMusic";
import { ScheduleMusicDetails } from "../components/ScheduleMusicDetails";
import { EditScheduleMusicDetails } from "../components/EditScheduleMusicDetails";

export type StackNavigator = {
  CreateSong: {
    title: string;
  };
  AddSong: {
    title: string;
  };
  SongDetails: {
    title: string;
    artist: string;
    cover: string;
    artist_picture: string;
    album_title: string;
  };
  InsertLinks: {
    title: string;
    artist: string;
    informations: string;
    cover: string;
    artist_picture: string;
    album_title: string;
  };
};

export type SongStackType = NativeStackNavigationProp<StackNavigator>;

const Stack = createNativeStackNavigator<StackNavigator>();

export function CreateMusicStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#121212" },
        headerTintColor: "#E1E1E1",
      }}
    >
      <Stack.Screen
        name="CreateSong"
        component={CreateSong}
        options={{ title: "Adicionar Música" }}
      />
      <Stack.Screen
        name="AddSong"
        component={AddSongToList}
        options={{ title: "Buscar" }}
      />
      <Stack.Screen
        name="SongDetails"
        component={SongDetails}
        options={{ title: "Nova Música" }}
      />
      <Stack.Screen
        name="InsertLinks"
        component={InsertLinks}
        options={{ title: "Inserir Links" }}
      />
    </Stack.Navigator>
  );
}