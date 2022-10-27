import React, { useState } from 'react';
import { View, FlatList, Dimensions, ViewStyle } from 'react-native';
import { Typography, Button, CoverMusicCard, LoandingIndicator } from '../components';
import { stylesGlobal, colors } from '../theme';

export interface SilderHorizontalCardProps {
    datos: any[];
    tagTitle?: string;
    tagSubTitle?: string;
    tagButtonAction?: () => void;
    style?: ViewStyle;
    isLoanding: boolean;
    onPresscard: (id:string) => void;
}

const widthWindow = Dimensions.get('window').width;

export const SliderHorizontalCard = ({datos, tagTitle, tagSubTitle, tagButtonAction, style, isLoanding = true, onPresscard} : SilderHorizontalCardProps) => {
    const [anchoRight, setAnchoRight] = useState(0);

    return (
        <View style={{...style}}>
            <View style={[stylesGlobal.mb15]}>
                <View style={[stylesGlobal.row, stylesGlobal.justifyContentSpaceBetween, stylesGlobal.alignItemsCenter]}>
                    { tagTitle != undefined && <View style={{width: (widthWindow - 30) - anchoRight}}>
                        <Typography title={tagTitle} fontFamily='Poppins-SemiBold' fs={14} cl={colors.white} numberOfLines={1} />
                    </View>}
                    { tagButtonAction != undefined && <View onLayout={(event) => setAnchoRight(event.nativeEvent.layout.width)}>
                        <Button
                            onPress={tagButtonAction}
                            height={'auto'}
                            width='auto'
                            style={{
                                marginVertical: 0
                            }}
                        >
                            <Typography title='Ver todos' fontFamily='Poppins-Regular' fs={12} cl={colors.white} />
                        </Button>
                    </View>}
                </View>
                { tagSubTitle != undefined && <Typography title={tagSubTitle} cl={colors.grisTwo} numberOfLines={1} fs={12} fontFamily='Poppins-Light' style={{marginRight: anchoRight}} />}
            </View>
            <FlatList 
                nestedScrollEnabled={true}
                data={ datos }
                keyExtractor={ (data) => data.position }
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <CoverMusicCard 
                        width={( widthWindow ) / 2.4}
                        typeCard='button'
                        onPress={() => onPresscard(item._id)}
                        title={item.name}
                        numberOfLinesSubTitle={1}
                        subTitle={item?.artist && item.artist?.first_name ? item.artist.first_name : item?.description}
                        urlImage={item.image ? item.image : item?.thumbnail}
                        style={{marginRight: (index === datos.length - 1 ) ? 0 : 10, flexDirection: 'column', height: 'auto', alignItems: 'flex-start'}}
                    />
                )}
            />
            {isLoanding && <View style={[stylesGlobal.row, stylesGlobal.alignItemsCenter]}><LoandingIndicator size={21} /></View>}
        </View>
    )
}
