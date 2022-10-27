import React, { useEffect, useRef } from 'react';
import { View, ViewStyle, StyleSheet, Dimensions } from 'react-native';
import { Button } from './Button';
import { FadeInImage } from './FadeInImage';
import { Typography } from './Typography';
import { CoverSearchMusicArtist } from '../interfaces';

interface CoverMusicArtistCard {
    typeCard: 'button' | 'view';
    onPress?: () => void;
    style?: ViewStyle;
    musicArtist: CoverSearchMusicArtist;
}

const widthWindow = Dimensions.get('window').width;

export const CoverMusicArtistCard = ({ typeCard = 'button', onPress, style, musicArtist }: CoverMusicArtistCard ) => {
    const isMounted = useRef(true);
    useEffect(() => {
        
        if( musicArtist ){
            if ( !isMounted.current ) return;
        }


        return () => {
            isMounted.current = false
        }

    }, [])
    const ContentMusicArtist = () => {
        return (
            <>
                <View style={[styles.cardImage]}>
                    <FadeInImage 
                        uri={ musicArtist.thumbnail }
                        style={{
                            width: '100%',
                            height: '100%',
                            resizeMode: 'cover',
                        }}
                    />
                </View>
                <View style={[styles.cardContent]}>
                    <Typography title={musicArtist.name} fontFamily='Poppins-Medium' cl='#efefef' fs={13} numberOfLines={2} />
                    { musicArtist.artist?.second_name && <Typography  numberOfLines={1} title={musicArtist.artist.second_name} cl='#858585' fs={12} fontFamily='Poppins-Regular' /> }
                </View>
            </>
        )
    };

    if( typeCard === 'button' && onPress != undefined){
        return (
            <Button
                onPress={() => onPress()}
                height='auto'
                width={'100%'}
                style={{
                    ...styles.cardContainer,
                    ...style,
                    marginVertical: 0,
                    justifyContent: 'flex-start'
                }}
            >
                <ContentMusicArtist />
            </Button>
        )
    }

    return (
        <View
            style={[
                styles.cardContainer,
                { ...style }
            ]}
        >
            <ContentMusicArtist />
        </View>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center', 
        paddingVertical: 5, 
        paddingHorizontal: 20, 
        marginTop: 10, 
        backgroundColor: 'transparent'
    },
    cardImage: {
        width: 60, 
        height: 60, 
        marginRight: 15
    },
    cardContent: {
        height: '100%', 
        display: 'flex', 
        justifyContent: 'flex-start', 
        alignContent: 'flex-start', 
        paddingVertical: 2
    }
});
