import React, { useState, useEffect, useRef } from 'react';
import { ActivityIndicator, Animated, ImageErrorEventData, ImageStyle, NativeSyntheticEvent, StyleProp, View, Image } from 'react-native';
import { useAnimation } from '../hooks/useAnimation';


interface Props {
    uri: string;
    style?: StyleProp<ImageStyle>;
}

export const FadeInImage = ({ uri, style = {} } : Props) => {

    const { opacity, fadeIn } = useAnimation();
    const [ isLoading, setIsLoading ] = useState( false );

    const finishLoading = () => {
        setIsLoading(false);
        fadeIn();
    }

    const onError = (err: NativeSyntheticEvent<ImageErrorEventData>) => {
        setIsLoading( false );
    }
    
    useEffect(() => {
        const loanding = () => setIsLoading(true);
        
        loanding();
        return () => {
            loanding();
        }

    }, []);

    return (
        <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            ...style as any,
        }}>
            
            {
               isLoading && 
                <ActivityIndicator 
                    style={{ position: 'absolute' }} 
                    color="#fff"
                    size={ 30 }
                />
            }

            <Animated.Image 
                source={{ uri }}
                onError={ onError } 
                onLoad={ finishLoading }
                style={{
                    ...style as any,
                    opacity
                }}
            />

        </View>
    )
}