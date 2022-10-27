import React from 'react';
import { Text, TextStyle } from 'react-native';

interface StylesProps{
  lineHeight?: number,
}

export interface TypographyProps {
  width?: string,
  title?: string,
  fs?: number,
  cl?: string,
  textAlign?: 'auto' | 'center' | 'justify' | 'left' | 'right',
  textTransform?: 'capitalize' | 'lowercase' | 'none' | 'uppercase'
  pt?: number,
  mb?: number,
  letterSpacing?: number,
  fontFamily?: 'Poppins-Light' | 'Poppins-Regular' | 'Poppins-Medium' | 'Poppins-SemiBold',
  style?: TextStyle;
  numberOfLines?: number;
}

export const Typography = ( { title = '', fs = 12, cl = '#71839B', fontFamily = 'Poppins-Light', letterSpacing = 0, pt = 0, mb = 0, textTransform = 'none', textAlign = 'auto', width = 'auto', style = {}, numberOfLines} : TypographyProps ) => {
  return (
    <Text
        numberOfLines={numberOfLines}
        style={{
            ...style,
            fontSize: fs,
            color: cl,
            letterSpacing: letterSpacing,
            paddingTop: pt,
            marginBottom: mb,
            textTransform: textTransform,
            width: width,
            textAlign: textAlign,
            fontFamily: ( fontFamily == 'Poppins-Medium' ) ? 'Poppins-Medium' : ( fontFamily == 'Poppins-SemiBold' ) ? 'Poppins-SemiBold' : ( fontFamily == 'Poppins-Regular' ) ? 'Poppins-Regular' : 'Poppins-Light'
        }}
    >
        {title}
    </Text>
  )
}
