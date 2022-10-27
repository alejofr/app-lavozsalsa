import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { 
  Splash,
  Home,
  Login,
  Register,
  Forgout,
  EditProfile,
  InfoSearch,
  Musics,
  PlayLists,
  PlayListMusics,
  Albums,
  AlbumMusics,
  Player,
  AddPlayList,
  MusicPlayList 
} from '../screens';
import { BottomsTabsNavigator } from './BottomTabsNavigator';
import { Header } from '../components';
import { AuthContext } from '../context/auth/AuthContext';
import { Music } from '../interfaces/Musics';

export type RootStackParams = {
  InicioApp: undefined,
  Login: undefined,
  Register: undefined,
  Forgout: undefined,
  Dashboard: undefined,
  BottomsTabsNavigator: undefined;
  EditProfile: { _id: string }
  InfoSearch: { _id: string }
  Musics: undefined;
  PlayLists: { artist_id?: string };
  PlayListMusics: { _id: string };
  Albums: { artist_id?: string };
  AlbumMusics: { _id: string };
  Player: { _id: string };
  AddPlayList: {music: Music};
  MusicPlayList: { id: number }
}

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = ( ) => {
    const { status } = useContext(AuthContext);  
    console.log('asdas ', status)
    if( status === 'checking'  ) return <Splash />

    return (
      <Stack.Navigator
        initialRouteName='InicioApp'
        screenOptions={{header: (props) => <Header {...props} />}}
      >
       {
          status === 'not-authenticated' && (
            <>
              <Stack.Screen name="InicioApp" options={{title: 'Inicio', headerShown: false}} component={Home} />
              <Stack.Screen name="Login" options={{ title: 'Acceso' }} component={Login} />
              <Stack.Screen name="Register" options={{ title: 'Registro' }} component={Register} />
              <Stack.Screen name="Forgout" options={{ title: 'Recuperar clave' }} component={Forgout} />
            </>
          )
       }
       {
        status === 'authenticated' && (
          <>
            <Stack.Screen name="BottomsTabsNavigator" options={{ headerShown: false }} component={BottomsTabsNavigator} />
            <Stack.Screen name="EditProfile" options={{ title: 'Editar Mi Perfil' }} component={EditProfile} />
            <Stack.Screen name="InfoSearch" options={{ title: 'Ver info de busquedad' }} component={InfoSearch} />
            <Stack.Screen name="Musics" options={{ title: 'Musicas' }} component={Musics} />
            <Stack.Screen name="PlayLists" options={{ title: 'PlayLists' }} component={PlayLists} />
            <Stack.Screen name="Albums" options={{ title: 'Albunes' }} component={Albums} />
            <Stack.Screen name="AlbumMusics" options={{ title: 'Albun Musicas' }} component={AlbumMusics} />
            <Stack.Screen name="PlayListMusics" options={{ title: 'PlayList Musicas' }} component={PlayListMusics} />
            <Stack.Screen name="Player" options={{ title: 'Player' }} component={Player} />
            <Stack.Screen name="AddPlayList" options={{ title: 'AddPlayList' }} component={AddPlayList} />
            <Stack.Screen name="MusicPlayList" options={{ title: 'MusicPlayList' }} component={MusicPlayList} />
          </>
        )
       }
      </Stack.Navigator>
    );
};
