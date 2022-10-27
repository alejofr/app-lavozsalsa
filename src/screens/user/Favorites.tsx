import React, { useContext } from 'react';
import { View, ScrollView } from 'react-native';
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { LibraryContext } from '../../context';
import { LoandingIndicator, Typography, CoverMusicLibraryCard } from '../../components';
import { colors, stylesGlobal } from '../../theme';

interface Props extends MaterialTopTabScreenProps<any, any>{};

export const Favorites = ({navigation}:Props) => {
  const { arrayFavorites, isLoading, removeFavorites } = useContext(LibraryContext);

  return (
    <View style={[stylesGlobal.container, {paddingTop: 15}]}>
      <ScrollView>
        {
          !isLoading && 
          <View style={[stylesGlobal.row]}>
              {  
                arrayFavorites != null && (
                  arrayFavorites.map((item, index) => (
                    <CoverMusicLibraryCard 
                      key={item._id}
                      onPress={()=> navigation.navigate('Player', { _id: item._id})}
                      urlImage={item.thumbnail}
                      title={item.name}
                      subtitle={`${item.artist.first_name} ${item.artist.second_name}`}
                      onClickIcon={() => removeFavorites(item._id)}
                    />
                  )) 
                )          
              }
          </View>
        }
        {isLoading && <View style={[stylesGlobal.row, stylesGlobal.alignItemsCenter]}><LoandingIndicator size={21} /></View>}
      </ScrollView>
    </View>
  )
}
