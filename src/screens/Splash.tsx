import React from 'react';
import { ActivityIndicator, View, StatusBar } from 'react-native';

export const Splash = () => {
  return (
    <View
        style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#000'
        }}
    >
        <StatusBar barStyle={'light-content'} translucent={true} backgroundColor="transparent"/>
        <ActivityIndicator 
            size={50}
            color='#fff'
        />
    </View>
  )
}