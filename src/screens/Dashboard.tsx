import React from 'react';
import { View, Dimensions, ScrollView } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { LoandingIndicator, CoverMusicCard, SliderHorizontalCard, SlideHorizontalCategorias } from '../components';
import { stylesGlobal } from '../theme';
import { useCoverMusic, useCoverAlbums, usePlayLists } from '../hooks';

interface Props extends BottomTabScreenProps<any, any>{};
const widthWindow = Dimensions.get('window').width;

export const Dashboard = ({ navigation }: Props) => {
    const { coverAlbums, isLoadingCoverAlbums } = useCoverAlbums('albums');
    const { coverPlayLists, isLoadingCoverPlayLists } = usePlayLists('playlists_app');
    const { coverMusicsList, isLoadingCoverMusics } = useCoverMusic('/musics?limit=10');
    const onAlbum = (id:string) => navigation.navigate('AlbumMusics', {_id: id});
    const onPlayList = (id:string) => navigation.navigate('PlayListMusics', {_id: id});

    return (
        <ScrollView horizontal={false}>
            <View style={[stylesGlobal.container, { paddingTop: 15 }]}>
                <SlideHorizontalCategorias style={{...stylesGlobal.mb22}} />
                <SliderHorizontalCard isLoanding={isLoadingCoverAlbums} datos={coverAlbums} tagTitle='Álbumes' tagSubTitle='Los mejores albunes de salsas' tagButtonAction={() => navigation.navigate('Albums')} onPresscard={(id) => onAlbum(id)} />
                <SliderHorizontalCard style={{marginTop: 15}} isLoanding={isLoadingCoverPlayLists} datos={coverPlayLists} tagTitle='PlayLists' tagSubTitle='Los mejores playlists de La Voz Salsa' tagButtonAction={() => navigation.navigate('PlayLists')} onPresscard={(id) => onPlayList(id)} />
                <View style={[stylesGlobal.mt15]}>
                    <View style={[stylesGlobal.row]}>
                        {   coverMusicsList.map((item, index) => (
                                <CoverMusicCard 
                                    key={item.position}
                                    width={( widthWindow - 40 ) / 2}
                                    typeCard='button'
                                    onPress={() => navigation.navigate('Player', { _id: item._id})}
                                    title={item.name}
                                    urlImage={item.thumbnail}
                                    subTitle={`${item.artist.first_name} ${item.artist.second_name}`}
                                    style={{marginRight: index%2==0 ? 5 : 0, marginLeft: index%2!=0 ? 5 : 0,flexDirection: 'column', height: 'auto', alignItems: 'flex-start', paddingTop: 0, justifyContent: 'flex-start'}}
                                />
                            ))
                        }
                    </View>
                    {isLoadingCoverMusics && <View style={[stylesGlobal.row, stylesGlobal.alignItemsCenter]}><LoandingIndicator size={21} /></View>}
                </View>
            </View>
        </ScrollView>
    );
}