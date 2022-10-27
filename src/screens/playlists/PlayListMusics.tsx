import React, { useEffect } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigator';
import { View, Dimensions } from 'react-native';
import { TopPresentPlay, FlatListMusics, LoandingIndicator } from '../../components';
import { usePlayLists } from '../../hooks';
import { stylesGlobal } from '../../theme';

interface Props extends StackScreenProps<RootStackParams, 'PlayListMusics'>{};

export const PlayListMusics = ({ route, navigation }: Props) => {
    const params = route.params;
    const playlist_id = route.params._id;
    const { coverPlayLists, isLoadingCoverPlayLists, getPlayList } = usePlayLists('', {}, false);

    useEffect(() => {
        getPlayList(params._id)
    }, []);

    if( isLoadingCoverPlayLists ){
        return (<LoandingIndicator />)
    }

    const navigator = (_id: string) => {

    }

    return (
        <View style={[stylesGlobal.container]}>
            <TopPresentPlay title={coverPlayLists[0].name} isLoanding={isLoadingCoverPlayLists} subTitle={coverPlayLists[0].description}  onPress={() => null} />
            <FlatListMusics params={{playlist_id}} onNavigation={(_id) => navigator(_id)} />
        </View>
    )
}
