import React, { useContext, useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { View, ScrollView, KeyboardAvoidingView, Dimensions } from 'react-native';
import { Formik } from 'formik';
import * as Yup from "yup";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RootStackParams } from '../../navigator';
import { CustomInput, Typography, Button, Avatar} from '../../components';
import { LibraryContext } from '../../context';
import { colors, stylesGlobal } from '../../theme';
import { Music } from '../../interfaces';


interface Props extends StackScreenProps<RootStackParams, 'AddPlayList'>{};

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .max(40, 'Maximo, 40 caracteres')
    .required('Nombre requerido')
});

type FormData = {
  name: string,
};

const { width } = Dimensions.get('window');

export const AddPlayList = ({route, navigation}: Props) => {
  const { arrayPlayList, addPlayList } = useContext(LibraryContext);
  const params = route.params;

  const sendPlayListMussic = async ({name} : FormData) => {
    add(params.music, name);
  }

  const add = (music: Music, name: string, id?: number) => {
    addPlayList(music, name, id);
    navigation.goBack();
  }

  const playListAdd = async(id: number) => {
    console.log(id)
    add(params.music, '', id);
  }

  return (
    <View style={[stylesGlobal.container, { paddingTop: 15 }]}>
      <Typography title='Agregar a Playlist' fs={15} cl={colors.white} fontFamily='Poppins-SemiBold' mb={10} />
      <KeyboardAvoidingView
        behavior='height'
      >
        <Formik
          initialValues={{ name: '' }}
          onSubmit={values => sendPlayListMussic(values)}
          validationSchema={SignupSchema}
        >
          {({ handleChange, handleSubmit, values, errors }) => (
            <>
              <View style={[stylesGlobal.mb25]}>
                <CustomInput
                  labelText='Nueva PlayList'
                  value={values.name}
                  onChangeText={handleChange('name')}
                  isError={ errors.name ? true : false}
                  messageError={errors.name}
                />
              </View>
              <View>
                <Button
                  onPress={() => handleSubmit()}
                  backgroundColor={colors.primary}
                  style={{borderRadius: 50}}
                >
                  <Typography title='Nuevo PlayList' textTransform='uppercase' fontFamily='Poppins-Medium' cl={colors.white} fs={15} style={{ marginTop: 5, letterSpacing: 0.8 }} />
                </Button>
              </View>
            </>
          )}
        </Formik>
      </KeyboardAvoidingView>
      <ScrollView style={{paddingTop: 10}}>
        {
          arrayPlayList != null && arrayPlayList.length > 0 &&
          (
            arrayPlayList.map((item, index) => (
              <View style={[stylesGlobal.row, stylesGlobal.justifyContentSpaceBetween, { marginVertical: 10 }]} key={index}>
                <Avatar 
                  typeView='view'
                  height={61}
                  width={62}
                  text={item.name.charAt(0)}
                  textProps={{fs: 28, cl: colors.white}}
                  style={{borderRadius: 4, paddingTop: 4}}
                />
                <View style={{paddingHorizontal: 10, width: (width - 30) - (62 + 40), paddingVertical: 2}}>
                      <Typography title={item.name} fs={12} fontFamily='Poppins-Medium' cl={colors.white} numberOfLines={2}  />
                      <View style={[stylesGlobal.row, stylesGlobal.alignItemsCenter]}>
                        <Ionicons name='musical-notes-outline' size={11} color={colors.grisTwo} style={{marginRight: 5}} />
                        <Typography title={`${item.countMusic}`} fs={12} fontFamily='Poppins-Regular' cl={colors.grisTwo} numberOfLines={1} />
                      </View>
                  </View>
                <Button
                    onPress={() => playListAdd(item.id)}
                    width={40}
                    height={40}
                  >
                      <Ionicons name='add-circle-outline' size={24} color={colors.white} />
                  </Button>
              </View>
            ))
          )
        }
      </ScrollView>
    </View>
  );
}
