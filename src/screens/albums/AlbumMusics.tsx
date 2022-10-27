import React, { useEffect } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigator';
import { View } from 'react-native';
import { TopPresentPlay, FlatListMusics, LoandingIndicator } from '../../components';
import { useCoverAlbums } from '../../hooks';
import { stylesGlobal } from '../../theme';

interface Props extends StackScreenProps<RootStackParams, 'AlbumMusics'>{};

export const AlbumMusics = ({ route, navigation }: Props) => {
    const params = route.params;
    const album_id = route.params._id;
    const { coverAlbums, isLoadingCoverAlbums, getAlbun} = useCoverAlbums('', {}, false);


    useEffect(() => {
        getAlbun(params._id)
    }, []);

    if( isLoadingCoverAlbums ){
        return (<LoandingIndicator />)
    }

    const navigator = (_id: string) => {

    }

    return (
        <View style={[stylesGlobal.container]}>
            <TopPresentPlay title={coverAlbums[0].name} isLoanding={isLoadingCoverAlbums} subTitle={coverAlbums[0].artist.first_name}  onPress={() => null} />
            <FlatListMusics params={{album_id}} onNavigation={(_id) => navigator(_id)} />
        </View>
    )
}
