import React, { useEffect, useContext, useRef, useMemo } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Dimensions, View, Animated, StyleSheet} from 'react-native';
import Slider from '@react-native-community/slider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TrackPlayer, { useProgress } from 'react-native-track-player';
import { RootStackParams } from '../navigator';
import { CoverMusicCard, LoandingIndicator, Button, Typography } from '../components';
import { stylesGlobal, colors } from '../theme';
import { PlayerContext } from '../context';
import { secondsToHHMMSS } from '../helpers';



interface Props extends StackScreenProps<RootStackParams, 'Player'>{};
const width = Dimensions.get("window").width;

export const Player = ({ route, navigation }: Props) => {
    const params = route.params;
    const { isLoadingMusics, arrayMusics, next, prev, random, repeat, isFavorites, position, getIdMusics, changePositionMusic, changeRandom, changeRepeat, changeFavorites, } = useContext(PlayerContext);
    const refCarousel = useRef<any>(null);
    const progress = useProgress();
    const isMounted = useRef(true);
    const scrolX = useRef( new Animated.Value(0) ).current;
  
    useEffect(() => {
        getIdMusics(params._id);
    }, [params._id]);
    

    if( isLoadingMusics ){
        return (<LoandingIndicator />)
    }

    
    const setChangePosition = (index: number) => {
        changePositionMusic(index);
        refCarousel?.current?.scrollToOffset({
            offset: index * ( width - 30 ),
            animated: true
        });
    }

    return (
        <View style={[stylesGlobal.container]}>
            <View>
                <Animated.FlatList 
                    ref={refCarousel}
                    onMomentumScrollEnd={ev => {
                        setChangePosition(Math.floor(ev.nativeEvent.contentOffset.x / (width - 30)))
                    }}
                    onScroll={Animated.event(
                        [{nativeEvent: {
                            contentOffset: { x: scrolX }
                        }}],
                        {useNativeDriver: true}
                    )}
                    data={ arrayMusics }
                    keyExtractor={ (data) => data.position }
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    decelerationRate={0}
                    snapToInterval={width - 30}
                    scrollEventThrottle={16}
                    renderItem={({ item }) => {
                        return (
                            <CoverMusicCard 
                                width={width - 30}
                                title={item.name}
                                urlImage={item.thumbnail}
                                subTitle={`${item.artist.first_name} ${item.artist.second_name}`}
                                typeCard='view'
                                height={240}
                                borderRadiusImage={8}
                                marginBottomContent={10}
                            />
                        )
                    }}
                />
            </View>
            <View style={[stylesGlobal.row, stylesGlobal.justifyContentSpaceBetween, stylesGlobal.alignItemsCenter, stylesGlobal.mb25]}>
                <View style={{width: 40}}>
                    <Typography title={secondsToHHMMSS(progress.position)} fontFamily='Poppins-Light' fs={10} cl={colors.white} />
                </View>
                <Slider
                    style={[stylesGlobal.row, [{width: (width - 30) - 80 }]]}
                    value={progress.position}
                    minimumValue={0}
                    maximumValue={progress.duration}
                    thumbTintColor={colors.white}
                    minimumTrackTintColor={colors.primary}
                    maximumTrackTintColor={colors.opacoNegro}
                    onSlidingComplete={async (value) => await TrackPlayer.seekTo(value)}
                />
                <View style={{width: 40, justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                    <Typography title={secondsToHHMMSS(progress.duration - progress.position)} fontFamily='Poppins-Light' fs={10} cl={colors.white} />
                </View>
            </View>
            <View style={[stylesGlobal.row, stylesGlobal.justifyContentSpaceBetween, stylesGlobal.alignItemsCenter, stylesGlobal.mb25]}>
                <Button
                    onPress={() => changeRandom()}
                    width={'auto'}
                    height={'auto'}
                    style={{marginVertical: 0}}
                >
                    <Ionicons name="shuffle" size={21} color={ random ? colors.white : colors.opacoNegro } />
                </Button>
                <Button
                    onPress={() => prev != null ? setChangePosition(prev) : null}
                    width={'auto'}
                    height={'auto'}
                    style={{marginVertical: 0}}
                >
                    <Ionicons name="play-skip-back" size={21} color={ prev != null ? colors.white : colors.opacoNegro } />
                </Button>
                <Button
                    onPress={() => null}
                    width={55}
                    height={55}
                    style={{marginVertical: 0, ...stylesPlayer.playControl}}
                >
                    <Ionicons name={'play'} size={21} color="#fff"/>
                </Button>
                <Button
                    onPress={() => next != null ? setChangePosition(next) : null}
                    width={'auto'}
                    height={'auto'}
                    style={{marginVertical: 0}}
                >
                    <Ionicons name="play-skip-forward" size={21} color={ next != null ? colors.white : colors.opacoNegro } />
                </Button>
                <Button
                    onPress={() => changeRepeat()}
                    width={'auto'}
                    height={'auto'}
                    style={{marginVertical: 0}}
                >
                    <Ionicons name="repeat-outline" size={21} color={repeat ? colors.white : colors.opacoNegro}/>
                </Button>
            </View>
            <View style={[stylesGlobal.row, stylesGlobal.justifyContentSpaceBetween, stylesGlobal.alignItemsCenter]}>
                <Button
                    onPress={() => changeFavorites(position)}
                    width={'auto'}
                    height={'auto'}
                    style={{marginVertical: 0}}
                >
                    <Ionicons name={isFavorites ? 'heart-sharp' : 'heart-outline'} size={21} color={colors.white} />
                </Button>
                <View style={[stylesGlobal.row]}>
                    <Button
                        onPress={() => null}
                        width={'auto'}
                        height={'auto'}
                        style={{marginVertical: 0}}
                    >
                        <Ionicons name="share-social-outline" size={21} color={colors.white} />
                    </Button>
                    <Button
                        onPress={() => navigation.navigate('AddPlayList', { music: arrayMusics[position] })}
                        width={'auto'}
                        height={'auto'}
                        style={{marginVertical: 0, marginLeft: 15}}
                    >
                        <Ionicons name="musical-notes-outline" size={21} color={colors.white} />
                    </Button>
                </View>
            </View>
        </View>
    );
}

const stylesPlayer = StyleSheet.create({
    playControl: {
        backgroundColor: colors.grisSuaveOscuro,
        borderRadius: 50
    }
})

