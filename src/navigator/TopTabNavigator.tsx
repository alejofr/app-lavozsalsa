import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {
    PlayList,
    Favorites
} from '../screens/user';
import { Typography } from '../components';
import { colors } from '../theme/appTheme';

const Tab = createMaterialTopTabNavigator();

export const TopTabNavigator = () => {

    return (
      <Tab.Navigator
        sceneContainerStyle={{
          backgroundColor: '#000'
        }}
        screenOptions={ ({ route }) => ({
          tabBarLabel: ({focused }) => <Typography title={ route.name === 'UserPlayList' ? 'PlayList' : 'Mis Gustos'} fs={13} cl={ focused ? colors.white : colors.opacoNegro } fontFamily='Poppins-Medium' />,
          tabBarStyle: { backgroundColor: 'transparent' },
          tabBarIndicatorStyle: { backgroundColor: colors.white, elevation: 0, height: 0.5 }
        })}
       
      >
        <Tab.Screen name="UserPlayList" options={{title: 'PlayList'}} component={ PlayList } />
        <Tab.Screen name="UserFavorites" options={{title: 'Mis Gustos'}} component={ Favorites } />
      </Tab.Navigator>
    );
}