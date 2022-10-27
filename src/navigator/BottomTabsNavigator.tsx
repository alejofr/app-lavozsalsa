import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { 
    Dashboard,
    Search,
} from '../screens';
import { TopTabNavigator } from './TopTabNavigator';
import { colors } from '../theme/appTheme';
import { Header } from '../components/Header';



export type RootBottomTabs = {
    Dashboard: undefined,
    Search: undefined,
    MusicLbrary: undefined
}

const BottomTabs = createBottomTabNavigator<RootBottomTabs>();

export const BottomsTabsNavigator = () => {
    return (
      <BottomTabs.Navigator
          sceneContainerStyle= {{
              backgroundColor: colors.default
          }}
          initialRouteName='Dashboard'
          
          screenOptions={ ({route}) => ({
            header: (props) => <Header {...props} />,
            tabBarStyle: {
                height: 50,
                elevation: 0,
                shadowColor: 'transparent',
                backgroundColor: colors.secundary,
                borderTopWidth: 0.4,
                borderTopColor: colors.gris
            },
            tabBarIcon: ({ focused }) => <IconLabel name={route.name} focused={focused} />,
            tabBarLabel: ({ focused }) => <TitleLabel name={route.name} focused={focused} />
          })}
      >
          <BottomTabs.Screen name="Dashboard"  component={Dashboard} />
          <BottomTabs.Screen options={{headerShown: false}} name="Search" component={Search} />
          <BottomTabs.Screen name="MusicLbrary" component={TopTabNavigator} />
      </BottomTabs.Navigator>
    );
  };
  
  interface PropsIconLabel{
      name: string,
      focused: boolean
  };
  
  const IconLabel = ({name,focused} : PropsIconLabel) => {
      let iconName: string;
      let size : number = 21;
      switch (name) {
          case 'Search':
              iconName = 'search-outline';
              break;
          case 'MusicLbrary':
              iconName = 'musical-notes-outline';
              size = 24;
              break;
          default:
              iconName = 'home-outline';
              break;
      }
  
      return <Icon name={iconName} size={size} style={[focused ? styles.focusedTrue : styles.focusedFalse ]} />
  }
  
  const TitleLabel = ({name,focused} : PropsIconLabel) => {
      let title: string;
      switch (name) {
          case 'Search':
              title = 'Buscador';
              break;
          case 'MusicLbrary':
              title = 'Biblioteca';
              break;
          default:
              title = 'Inicio';
              break;
      }
  
      return <Text style={[styles.label, focused ? styles.focusedTrue : styles.focusedFalse, {marginTop: 0} ]}>{title}</Text>
  }
  
  const styles = StyleSheet.create({
      focusedFalse: {
          fontFamily: 'Poppins-Medium',
          color: colors.gris,
      },
      focusedTrue: {
          fontFamily: 'Poppins-SemiBold',
          color: colors.white
      },
      label: {
          fontSize: 9,
          letterSpacing: 0.2,
          marginBottom: 1
      },
  }) 