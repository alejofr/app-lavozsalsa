import React, { useEffect, useRef } from 'react';
import { View, ViewStyle, StyleSheet, Dimensions } from 'react-native';
import { Button } from './Button';
import { FadeInImage } from './FadeInImage';
import { Typography } from './Typography';

interface CoverMusicCard {
    typeCard: 'button' | 'view';
    onPress?: () => void;
    style?: ViewStyle;
    width: number | string;
    urlImage: string;
    title: string;
    subTitle?: string | null;
    numberOfLinesTitle?: number;
    numberOfLinesSubTitle?: number;
    height?: number | string;
    borderRadiusImage?: number;
    marginBottomContent?: number;
}

const widthWindow = Dimensions.get('window').width;

export const CoverMusicCard = ( { typeCard = 'view', onPress, style, width = '100%', urlImage, title, subTitle, numberOfLinesSubTitle, numberOfLinesTitle = 2, height = 135, borderRadiusImage = 0, marginBottomContent = 0 } : CoverMusicCard ) => {
    const isMounted = useRef(true);
    useEffect(() => {
        console.log('dsadsa', 'dlsajbd iidhaiodb')
    }, []);

    const ContentMusicCard = () => {
        return (
            <>
                <View style={[styles.cardImage, { height: height, marginBottom: marginBottomContent }]}>
                    <FadeInImage 
                        uri={ urlImage }
                        style={{
                            width: '100%',
                            height: '100%',
                            resizeMode: 'cover',
                            borderRadius: borderRadiusImage
                        }}
                    />
                </View>
                <Typography 
                    title={title}
                    cl='#fff'
                    fontFamily='Poppins-Medium'
                    style={{marginTop: 10}}
                    numberOfLines={numberOfLinesTitle}
                    fs={12}
                />
                {
                    subTitle != undefined && subTitle != null && 
                    <Typography 
                        title={subTitle}
                        cl='#858585'
                        fontFamily='Poppins-Light'
                        style={{marginTop: 0}}
                        numberOfLines={numberOfLinesSubTitle}
                        fs={11}
                    />
                }
            </>
        )
    }

    if( typeCard === 'button' &&  onPress != undefined){
        return (
            <Button
                onPress={() => onPress()}
                style={{
                    ...styles.cardContainer,
                    ...style,
                    marginVertical: 0,
                    width: width,
                }}
            >
                <ContentMusicCard />
            </Button>
        )
    }

    return (
        <View
            style={[
                styles.cardContainer,
                { ...style },
                {width: width}
            ]}
        >
            <ContentMusicCard />
        </View>
    )
};

const styles = StyleSheet.create({
    cardContainer: {
        marginTop: 10,
        marginBottom: 15
    },
    cardImage: {
        backgroundColor: '#101316',
        width: '100%',
        shadowOffset: { width: 0.5, height: 0.5 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 5,
    },
});
