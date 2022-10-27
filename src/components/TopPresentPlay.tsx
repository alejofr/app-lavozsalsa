import React, { useState, useEffect } from 'react';
import { View, Dimensions, ViewStyle } from 'react-native';
import { stylesGlobal, colors } from '../theme';
import { Typography } from './Typography';
import { Button } from './Button';
import { LoandingIndicator } from './LoandingIndicator';
import Ionicons from 'react-native-vector-icons/Ionicons';
const widthWindow = Dimensions.get('window').width;

interface TopPresentPlayProps {
    title: string;
    onPress: () => void;
    subTitle?: string | null;
    style?: ViewStyle;
    isLoanding?: boolean;
}

export const TopPresentPlay = ({title, onPress, subTitle, style, isLoanding} : TopPresentPlayProps) => {
    const [ loanding, setLoanding ] = useState(true);

    useEffect(() => {
      if(!isLoanding){
        setTimeout(() => {
            setLoanding(false);
        }, 1500);
      }
    }, [loanding])
    
    return (
        <View style={[stylesGlobal.mb15, stylesGlobal.mt15, {...style}]}>
            { loanding && <LoandingIndicator size={21} /> }
            { !loanding && 
            <View style={[stylesGlobal.row, stylesGlobal.justifyContentSpaceBetween, stylesGlobal.alignItemsCenter, stylesGlobal.w100p]}>
                <View style={{width: (widthWindow - 70)}}>
                    <Typography title={title} fontFamily='Poppins-SemiBold' fs={14} cl={colors.white} numberOfLines={1} />
                    {
                        subTitle && subTitle != null && <Typography title={subTitle} cl={colors.grisTwo} numberOfLines={1} fs={12} fontFamily='Poppins-Light' />
                    }
                </View>
                <View>
                    <Button
                        onPress={onPress}
                        height={'auto'}
                        width='auto'
                        style={{
                            marginVertical: 0
                        }}
                    >
                        <Ionicons name="play-circle-outline"  size={28} color={ colors.primary } />
                    </Button>
                </View>
            </View>}
        </View>
    )
}
