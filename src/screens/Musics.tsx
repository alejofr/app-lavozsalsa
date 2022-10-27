import React from 'react';
import { View, Dimensions } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { SlideHorizontalCategorias, FlatListMusics } from '../components';
import { stylesGlobal } from '../theme';
interface Props extends StackScreenProps<any, any>{};
const widthWindow = Dimensions.get('window').width;

export const Musics = ({ navigation }: Props) => {
  const navigator = (_id: string) => navigation.navigate('Player', { _id: _id});

  return (
    <View style={[stylesGlobal.container, { paddingTop: 15 }]}>
      <SlideHorizontalCategorias style={{...stylesGlobal.mb12}} isActiveName='Musicas' />
      <FlatListMusics  onNavigation={(_id) => navigator(_id)} />
    </View>
  )
}
