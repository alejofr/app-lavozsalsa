import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import './ignoreWarnings';
import { StackNavigator } from './src/navigator';
import { AuthProvider, PlayerProvider, LibraryProvider } from './src/context';
import { colors } from './src/theme/appTheme';

const MyTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    background: colors.default
  },
};

export const App = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <AppState>
        <StackNavigator />
      </AppState>
    </NavigationContainer> 
  );
};

const AppState = ( {children}: any ) => {
  return (
    <AuthProvider>
      <LibraryProvider>
        <PlayerProvider>
          { children }
        </PlayerProvider>
      </LibraryProvider>
    </AuthProvider>
  );
}