import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { StatusBar } from 'react-native';
import { stylesGlobal } from '../../theme';
 
type PropsAppLayout = {
  children: JSX.Element | JSX.Element[];
  colorTop?: string;
  colorBottom?: string;
  backgroundColor?: string;
}

export const AppLayout = ({ children, colorTop = 'rgba(0, 0, 0, 0.2)', colorBottom = 'rgba(255, 0, 50, 0.25)', backgroundColor = 'transparent' } : PropsAppLayout) => {
  return (
    <LinearGradient
        colors={[colorTop, colorBottom]}
        style={[stylesGlobal.container, { backgroundColor: backgroundColor } ]}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 0.98}}
    >
        <StatusBar barStyle={'light-content'} translucent={true} backgroundColor="transparent"/>
        { children }
    </LinearGradient>
  )
}


