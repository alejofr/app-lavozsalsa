import React from 'react';
import { FlatList, Dimensions } from 'react-native';
import { LoandingIndicator, CoverMusicCard } from '../components';
import { useCoverMusic } from '../hooks';

const widthWindow = Dimensions.get('window').width;
interface FlatListMusicsProps{
  params?: any;
  onNavigation: (_id: string) => void;
}

export const FlatListMusics = ({params = {}, onNavigation}:FlatListMusicsProps) => {
  const { coverMusicsList, loadMusicsCover, isLoadingCoverMusics, isNextPageMusics } = useCoverMusic('/musics?limit=10', params);
  return (
    <FlatList
        nestedScrollEnabled={true}
        data={ coverMusicsList }
        keyExtractor={ (coverMusic) => coverMusic.position }
        showsVerticalScrollIndicator={ false }
        numColumns={2}
        renderItem={({ item, index }) => (
            <CoverMusicCard 
                width={( widthWindow - 40 ) / 2}
                typeCard='button'
                onPress={() => onNavigation(item._id)}
                title={item.name}
                urlImage={item.thumbnail}
                subTitle={`${item.artist.first_name} ${item.artist.second_name}`}
                style={{marginRight: index%2==0 ? 5 : 0, marginLeft: index%2!=0 ? 5 : 0,flexDirection: 'column', height: 'auto', alignItems: 'flex-start', paddingTop: 0, justifyContent: 'flex-start'}}
            />
        )}
        onEndReached={ isNextPageMusics ? loadMusicsCover : null }
        onEndReachedThreshold={ 0.4 }
        ListFooterComponent={ isLoadingCoverMusics ? <LoandingIndicator size={21} /> : null}
      />
  )
}
