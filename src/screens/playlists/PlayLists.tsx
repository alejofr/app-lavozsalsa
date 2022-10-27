import React from 'react';
import { View, Dimensions, FlatList } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { LoandingIndicator, CoverMusicCard, SlideHorizontalCategorias } from '../../components';
import { usePlayLists } from '../../hooks';
import { stylesGlobal } from '../../theme';
interface Props extends StackScreenProps<any, any>{};
const widthWindow = Dimensions.get('window').width;

export const PlayLists = ({ navigation }: Props) => {
  const { coverPlayLists, isLoadingCoverPlayLists, getPlayLists, isNextPagePlayLists } = usePlayLists('playlists_app?limit=8');
  const onPlayList = (id:string) => navigation.navigate('PlayListMusics', {_id: id});
  return (
    <View style={[stylesGlobal.container, { paddingTop: 15 }]}>
      <SlideHorizontalCategorias style={{...stylesGlobal.mb12}} isActiveName='PlayLists' />
      <FlatList
        nestedScrollEnabled={true}
        data={ coverPlayLists }
        keyExtractor={ (coverPlayList) => coverPlayList.position }
        showsVerticalScrollIndicator={ false }
        numColumns={2}
        renderItem={({ item, index }) => (
            <CoverMusicCard 
                width={( widthWindow - 40 ) / 2}
                typeCard='button'
                onPress={() => onPlayList(item._id)}
                title={item.name}
                numberOfLinesTitle={1}
                numberOfLinesSubTitle={1}
                subTitle={item.description}
                urlImage={item.thumbnail}
                style={{marginRight: index%2==0 ? 5 : 0, marginLeft: index%2!=0 ? 5 : 0,flexDirection: 'column', height: 'auto', alignItems: 'flex-start', paddingTop: 0, justifyContent: 'flex-start'}}
            />
        )}
        onEndReached={ isNextPagePlayLists ? getPlayLists : null }
        onEndReachedThreshold={ 0.4 }
        ListFooterComponent={ isLoadingCoverPlayLists ? <LoandingIndicator size={21} /> : null}
      />
    </View>
  )
}
