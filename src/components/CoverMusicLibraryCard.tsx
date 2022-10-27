import React, { useState } from 'react';
import { View, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button, Typography, FadeInImage } from './';
import { colors } from '../theme';

interface MusicLibraryCardProps {
    onPress: () => void;
    urlImage: string;
    title: string;
    subtitle: string;
    onClickIcon: () => void;
}
const { width } = Dimensions.get('window');

export const CoverMusicLibraryCard = ({onPress, onClickIcon, urlImage, title, subtitle}:MusicLibraryCardProps) => {
    const [anchoStart, setAnchoStart] = useState(0);
    return (
        <Button
            onPress={onPress}
            height={'auto'}
            style={{
                justifyContent: 'space-between',
            }}
        >
            <View 
                style={{backgroundColor: colors.default}}
                onLayout={(event) => {setAnchoStart(event.nativeEvent.layout.width)}}
            >
                <FadeInImage 
                    uri={ urlImage }
                    style={{
                        width: 62,
                        height: 61,
                        resizeMode: 'cover'
                    }}
                />
            </View>
            <View style={{paddingHorizontal: 10, width: (width - 30) - (anchoStart + 40), flexDirection: 'column', justifyContent: 'space-between', alignItems: 'stretch', height: 61}}>
                <Typography title={title} fs={12} fontFamily='Poppins-Medium' cl={colors.white} numberOfLines={2}  />
                <Typography title={subtitle} fs={11} fontFamily='Poppins-Regular' cl={colors.grisTwo} numberOfLines={1} />
            </View>
            <Button
                onPress={onClickIcon}
                width={40}
                height={40}
            >
                <Ionicons name={'heart-sharp'} size={21} color={colors.white} />
            </Button>
        </Button>
    );
};
