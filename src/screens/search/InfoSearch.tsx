import { StackScreenProps } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Dimensions  } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FadeInImage, Typography, Button } from '../../components';
import { RootStackParams } from '../../navigator';
import { stylesGlobal, colors } from '../../theme';
import { useMusicArtistSearch } from '../../hooks';

interface Props extends StackScreenProps<RootStackParams, 'InfoSearch'>{};
const widthWindow = Dimensions.get('window').width;

export const InfoSearch = ( { route, navigation } : Props) => {
  const params = route.params;
  console.log('id search', params._id)
  const [anchoContAction, setAnchoContAction] = useState(0);
  const { isLoadingMusicArtistSearch, loadMusicArtist, musicArtistList } = useMusicArtistSearch();
  
  useEffect(() => {
    loadMusicArtist(params._id);
  }, []);

  console.log('musicArtistList', musicArtistList);
  
  return (
    <ScrollView style={[stylesGlobal.mt15]}>
      <View style={[stylesGlobal.flex1,stylesGlobal.bg1, stylesGlobal.row, stylesGlobal.justifyContentSpaceBetween,stylesGlobal.alignItemsCenter, stylesGlobal.positioRelative,  stylesGlobal.mt25,stylesGlobal.ph15,{zIndex: 0}]}>
        <View style={[styles.img]}>
            <FadeInImage
              uri='https://i.ytimg.com/vi/J4P8PeZMyM4/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLBL7KwNYEIHNozgzqDBPtJ7xLO6_g'
              style={{
                marginTop: -15,
                height: '100%',
                width: '100%',
                position: 'absolute',
                resizeMode: 'cover',
                borderRadius: 5,
              }}
            />
        </View>
        <View style={[stylesGlobal.flexDirectionColumn, stylesGlobal.justifyContentSpaceBetween,{width: ( widthWindow - 30 ) - 140, paddingLeft: 15, marginVertical: 5}]}>
            <View>
              <Typography title='Oscar D’León' fs={12}  cl={ colors.grisTwo } fontFamily='Poppins-Regular' numberOfLines={1} />
              <Typography title='El Malo' fs={14}  cl={ colors.white } fontFamily='Poppins-SemiBold' numberOfLines={1} />
            </View>
            <View style={[stylesGlobal.row, stylesGlobal.justifyContentSpaceBetween, stylesGlobal.mb8]} onLayout={(event) => setAnchoContAction(event.nativeEvent.layout.width)}>
              <Button 
                onPress={() => null}
                width={anchoContAction / 2}
                style={{...stylesGlobal.justifyContenStart, marginVertical: 5}}
              >
                <Ionicons name="play-circle-outline"  size={28} color={ colors.primary } style={{marginRight: 8}} />
                <Typography title='1.5 K' fs={12}  cl={ colors.grisTwo } fontFamily='Poppins-Regular' numberOfLines={1} />
              </Button>
              <Button 
                onPress={() => null}
                width={anchoContAction / 2}
                style={{...stylesGlobal.justifyContenEnd, marginVertical: 5}}
              >
                <Ionicons name="heart-outline"  size={28} color={ colors.white } />
              </Button>
            </View>
            <Typography title='Provided to YouTube by' fs={11} fontFamily='Poppins-Light' cl={ colors.grisTwo } />
        </View>
      </View>
      <View style={[stylesGlobal.container, stylesGlobal.flex3]}>
         
      </View>
    </ScrollView>
  )
};
const styles = StyleSheet.create({
  img: {
    zIndex: 999,
    position: 'relative',
    width: 140,
    height: 160,
  },
})
