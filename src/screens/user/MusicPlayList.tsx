import React, { useState, useContext, useEffect } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigator';
import { TopPresentPlay, LoandingIndicator, CoverMusicLibraryCard, Button, Typography } from '../../components';
import { colors, stylesGlobal } from '../../theme';
import { LibraryContext } from '../../context';
import { Music } from '../../interfaces';
import Ionicons from 'react-native-vector-icons/Ionicons';


interface Props extends StackScreenProps<RootStackParams, 'MusicPlayList'>{};
const widthWindow = Dimensions.get('window').width;

export const MusicPlayList = ({route, navigation}: Props) => {
  const params = route.params;
  const { checkPlayList, removeMusicPlayList, isLoading, removePlayList } = useContext(LibraryContext);
  const [loanding, setLoanding] = useState(true);
  const [musics, setMusics] = useState<Music[]>([]);
  const [playList, setPlayList] = useState({ id: 0, name: '', countMusic: 0 });
  
  useEffect(() => {
    const resp = checkPlayList(params.id);
    if( resp ){
      setMusics(resp[0].musics);
      setPlayList({id: resp[0].id, name: resp[0].name, countMusic: resp[0].countMusic});
      setTimeout(() => {
        setLoanding(false);
      }, 500);
    }
  }, [params.id])
  
  if( loanding ){
    return (<LoandingIndicator />)
  }

  const deleteMusic = async(_id: string) => {
    const resp = await removeMusicPlayList(_id, playList.id);
    if( resp[0].musics.length > 0 ){
      setMusics(resp[0].musics);
      setPlayList({id: resp[0].id, name: resp[0].name, countMusic: resp[0].countMusic});
    }else{
      setLoanding(true);
      await removePlayList(playList.id);
      navigation.goBack();
    }
    
  }

  const deletePlaylist = async (id: number) => {
    setLoanding(true);
    await removePlayList(playList.id);
    navigation.goBack();
  }

  return (
    <View style={[stylesGlobal.container]}>
        <View style={[stylesGlobal.mb15, stylesGlobal.mt15]}>
            <View style={[stylesGlobal.row, stylesGlobal.justifyContentSpaceBetween, stylesGlobal.alignItemsCenter, stylesGlobal.w100p]}>
                <View style={{width: (widthWindow - 100)}}>
                    <Typography title={playList.name} fontFamily='Poppins-SemiBold' fs={14} cl={colors.white} numberOfLines={1} />
                    <View style={[stylesGlobal.row, stylesGlobal.alignItemsCenter]}>
                      <Ionicons name='musical-notes-outline' size={11} color={colors.grisTwo} style={{marginRight: 5}} />
                      <Typography 
                        title={`${playList.countMusic}`}
                        cl='#858585'
                        fontFamily='Poppins-Light'
                        style={{marginTop: 0}}
                        numberOfLines={1}
                        fs={11}
                      />
                    </View>
                </View>
                <View style={[stylesGlobal.row, stylesGlobal.alignItemsCenter]}>
                    <Button
                        onPress={() => navigation.navigate('Player', { _id: `${playList.id}`})}
                        height={'auto'}
                        width='auto'
                        style={{
                            marginVertical: 0,
                            marginRight: 14
                        }}
                    >
                        <Ionicons name="play-circle-outline"  size={28} color={ colors.primary } />
                    </Button>
                    <Button
                        onPress={() => deletePlaylist(playList.id)}
                        height={'auto'}
                        width='auto'
                        style={{
                          marginVertical: 0,
                        }}
                    >
                        <Ionicons name="trash-outline"  size={26} color={ colors.grisTwo } />
                    </Button>
                </View>
            </View>
        </View>
        <ScrollView style={[stylesGlobal.mt15]}>
        {
          !isLoading && 
          <View style={[stylesGlobal.row]}>
              {  
                  musics.map((item, index) => (
                    <CoverMusicLibraryCard 
                      key={item._id}
                      onPress={()=> navigation.navigate('Player', { _id: item._id})}
                      urlImage={item.thumbnail}
                      title={item.name}
                      subtitle={`${item.artist.first_name} ${item.artist.second_name}`}
                      onClickIcon={() => deleteMusic(item._id)}
                    />
                  ))      
              }
          </View>
        }
        {isLoading && <View style={[stylesGlobal.row, stylesGlobal.alignItemsCenter]}><LoandingIndicator size={21} /></View>}
      </ScrollView>
    </View>
  )
}
