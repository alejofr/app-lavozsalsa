import React, { useState, useEffect, useRef } from 'react';
import { View, StatusBar, Dimensions, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Typography, Button, CoverMusicArtistCard, LoandingIndicator, SearchInput } from '../../components';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { stylesGlobal, colors } from '../../theme';
import { useMusicArtistSearch } from '../../hooks';

interface Props extends BottomTabScreenProps<any, any>{};
const heigthBar = StatusBar.currentHeight !== undefined ? StatusBar.currentHeight : 15;
const widthWindow = Dimensions.get('window').width;

export const Search = ({ navigation } : Props) => {
  const [search, setSearch] = useState('');
  const isMounted = useRef(true);
  const { isLoadingMusicArtistSearch, loadMusicArtist, musicArtistList } = useMusicArtistSearch();
 
  useEffect(() => {
    if( search != '' ){
      loadMusicArtist(search);
      isMounted.current = false;
    }
  }, [search]);

  const onNavigaterInfo = ( id: string ) => navigation.navigate('InfoSearch', {_id: id});
  
  return (
    <>
      <View style={[stylesGlobal.row, stylesGlobal.justifyContentSpaceBetween, stylesGlobal.ph15, stylesGlobal.alignItemsCenter,{ paddingTop: heigthBar}]}>
        <Button
          onPress={navigation.goBack}
          style={{...stylesGlobal.justifyContenStart, marginVertical: 0}}
          height={40}
          width={40}
        >
          <Ionicons name="arrow-back-outline"  size={24} color={colors.white} />
        </Button>
        <SearchInput 
          width={( widthWindow - 30 ) - 45}
          bgColor={colors.secundary}
          onDebounce={setSearch}
        />
      </View>
      <View style={[stylesGlobal.container, stylesGlobal.bg1, { paddingTop: 15 }]}>
          {
            !isMounted.current && musicArtistList.length === 0 && !isLoadingMusicArtistSearch && <Typography fs={13} cl='#fff' title='No se encontraron resultados...' width='100%' textAlign='center' />
          }
          <FlatList
            data={ musicArtistList }
            keyExtractor={ (coverMusic) => coverMusic.position }
            showsVerticalScrollIndicator={ false }
            renderItem={({ item }) => (
              <CoverMusicArtistCard 
                style={{paddingHorizontal: 0}}
                typeCard='button'
                onPress={() => null}
                musicArtist={item}
              />
            )}

            ListFooterComponent={ isLoadingMusicArtistSearch ? <LoandingIndicator size={21} /> : null}
          />
      </View>
    </>
  )
}
