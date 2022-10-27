import React from 'react';
import { Button } from './Button';
import { Typography, TypographyProps } from './Typography';
import { View, ViewStyle, Image, StyleSheet } from 'react-native';

type AvatarProps = {
    typeView: 'button' | 'view';
    text?: string;
    urlImage?: string | null;
    style?: ViewStyle;
    textProps?: TypographyProps;
    height: number;
    width: number | string;
    onPress?: () => void;
}

export const Avatar = ( { typeView = 'button', onPress, style, text = '', urlImage = '', textProps, height, width } : AvatarProps ) => {
    
    const Texto = () => <Typography title={text != '' ? text.charAt(0) : 'k'}  fs={textProps?.fs} textTransform='uppercase' cl={textProps?.cl} fontFamily={ textProps?.fontFamily} style={{...textProps?.style}} />
    const Imagen = () => urlImage != '' && urlImage != null ? <Image source={{ uri: urlImage }} style={{ width: '100%', height: '100%' }} /> : <View></View>;

    if( typeView == 'button'){
        return (
            <Button style={{
                height: height,
                width: width,
                ...styles.buttonorView,
                ...style
            }} onPress={() => onPress ? onPress() : null}>
                { urlImage != '' && urlImage != null ? (<Imagen />) : (<Texto />) }
            </Button>
        )
    }else{
        return (
            <View
                style={{
                    height: height,
                    width: width,
                    ...styles.buttonorView,
                    ...style
                }}
            >
                { urlImage != '' && urlImage != null ? (<Imagen />) : (<Texto />) }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    buttonorView: {
        backgroundColor: '#101316',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 21,
    },
})
