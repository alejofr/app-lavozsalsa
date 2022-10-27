import React from 'react';
import { View, Dimensions, FlatList } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { LoandingIndicator, CoverMusicCard, SlideHorizontalCategorias} from '../../components';
import { useCoverAlbums } from '../../hooks';
import { stylesGlobal } from '../../theme';
interface Props extends StackScreenProps<any, any>{};
const widthWindow = Dimensions.get('window').width;


export const Albums = ({ navigation }: Props) => {
  const { coverAlbums, isLoadingCoverAlbums, getAlbunes, isNextPageAlbums } = useCoverAlbums('albums?limit=8');
  const onNavigator = (id:string) => navigation.navigate('AlbumMusics', {_id: id});
  
  return (
    <View style={[stylesGlobal.container, { paddingTop: 15 }]}>
      <SlideHorizontalCategorias style={{...stylesGlobal.mb12}} isActiveName='Albunes' />
      <FlatList
        nestedScrollEnabled={true}
        data={ coverAlbums }
        keyExtractor={ (coverAlbum) => coverAlbum.position }
        showsVerticalScrollIndicator={ false }
        numColumns={2}
        renderItem={({ item, index }) => (
            <CoverMusicCard 
                width={( widthWindow - 40 ) / 2}
                typeCard='button'
                onPress={() => onNavigator(item._id)}
                title={item.name}
                numberOfLinesTitle={1}
                numberOfLinesSubTitle={1}
                subTitle={item.artist.first_name}
                urlImage={item.image}
                style={{marginRight: index%2==0 ? 5 : 0, marginLeft: index%2!=0 ? 5 : 0,flexDirection: 'column', height: 'auto', alignItems: 'flex-start', paddingTop: 0, justifyContent: 'flex-start'}}
            />
        )}
        onEndReached={ isNextPageAlbums ? getAlbunes : null }
        onEndReachedThreshold={ 0.4 }
        ListFooterComponent={ isLoadingCoverAlbums ? <LoandingIndicator size={21} /> : null}
      />
    </View>
  )
}
