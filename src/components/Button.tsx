import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle, ActivityIndicator } from 'react-native';

type ButtonProps = {
    onPress: () => void;
    children: JSX.Element | JSX.Element[];
    height?: number | string;
    width?: number | string;
    backgroundColor?: string;
    loanding?: boolean;
    style?: ViewStyle;
}

export const Button = ({ onPress, children, height = 50, width = '100%', backgroundColor = 'transparent', loanding = false, style } : ButtonProps) => {

    return (
        <TouchableOpacity
            onPress={ onPress }
            activeOpacity={ 0.75 }
            disabled={loanding}
            style={[
                styles.button,
                { 
                    height: height,
                    width: width,
                    backgroundColor: backgroundColor,
                    opacity: loanding ? 0.5 : 1
                },
                style !== undefined && {...style},
            ]}
        >
            {
                loanding && <ActivityIndicator size={21} color='#fff' style={{marginRight: 10}} />
            }
            { children }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center',
        marginVertical: 10
    },
})