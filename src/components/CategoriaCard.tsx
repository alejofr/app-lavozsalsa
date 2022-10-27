import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from './Button';
import { Typography } from './Typography';

export interface CategoriaCardProps {
    onPress: (valor: string) => void;
    title: string;
    isActive: boolean;
}

export const CategoriaCard = ({ onPress, title, isActive = false }:CategoriaCardProps) => {
    const onClick = () => onPress(title);
    return (
        <Button width={'auto'} height='auto' style={{...styles.cardView, backgroundColor: isActive ? '#373737' : '#121212', borderColor: isActive ? '#fff': '#858585'  }} onPress={onClick}>
            <Typography title={title} fontFamily='Poppins-Regular' cl={isActive ? '#fff': '#858585'} fs={13} />
        </Button>
    )
}


const styles = StyleSheet.create({
    cardView: {
        paddingHorizontal: 25,
        paddingVertical: 10,
        marginRight: 10,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0.5, height: 0.5 },
        shadowRadius: 3,
        elevation: 5,
        borderWidth: 1,
    },
})
