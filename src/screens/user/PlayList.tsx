import React, { useContext } from 'react'
import { View, ScrollView, Dimensions } from 'react-native';
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { LibraryContext } from '../../context';
import { LoandingIndicator, Avatar, Typography, Button } from '../../components';

import { colors, stylesGlobal } from '../../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';

const widthWindow = Dimensions.get('window').width;

interface Props extends MaterialTopTabScreenProps<any, any>{};

export const PlayList = ({navigation}:Props) => {
  const { arrayPlayList, isLoading } = useContext(LibraryContext);

  return (
    <View style={[stylesGlobal.container, {paddingTop: 15}]}>
      <ScrollView>
        {
          !isLoading && 
          <View style={[stylesGlobal.row]}>
              {  
                arrayPlayList != null && (
                  arrayPlayList.map((item, index) => (
                    <Button
                      onPress={() => navigation.navigate('MusicPlayList', {id: item.id})}
                      key={index}
                      style={{
                        marginVertical: 0,
                        width: ( widthWindow - 40 ) / 2,
                        marginTop: 10,
                        marginBottom: 15,
                        marginRight: index%2==0 ? 5 : 0, marginLeft: index%2!=0 ? 5 : 0,
                        flexDirection: 'column', 
                        height: 'auto', 
                        alignItems: 'flex-start', 
                        paddingTop: 0, 
                        justifyContent: 'flex-start'
                      }}
                    >
                        <Avatar 
                          typeView='view'
                          height={135}
                          width={'100%'}
                          text={item.name.charAt(0)}
                          textProps={{fs: 28, cl: colors.white}}
                          style={{borderRadius: 4, paddingTop: 4}}
                        />
                        <Typography 
                            title={item.name}
                            cl='#fff'
                            fontFamily='Poppins-Medium'
                            style={{marginTop: 10}}
                            numberOfLines={2}
                            fs={12}
                        />
                        <View style={[stylesGlobal.row, stylesGlobal.alignItemsCenter]}>
                          <Ionicons name='musical-notes-outline' size={11} color={colors.grisTwo} style={{marginRight: 5}} />
                          <Typography 
                            title={`${item.countMusic}`}
                            cl='#858585'
                            fontFamily='Poppins-Light'
                            style={{marginTop: 0}}
                            numberOfLines={1}
                            fs={11}
                          />
                        </View>
                        
                    </Button>
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
