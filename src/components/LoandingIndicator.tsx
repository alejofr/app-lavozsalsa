import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { stylesGlobal } from '../theme';

type PropsActivityIndicator = {
  size?: number;
}

export const LoandingIndicator = ({size = 50}: PropsActivityIndicator) => {
  return (
    <View style={[stylesGlobal.flex1, stylesGlobal.alignItemsCenter, stylesGlobal.justifyContenCenter]}>
        <ActivityIndicator 
            size={size}
            color='#fff'
        />
    </View>
  )
}
