import React, { useState, useContext } from 'react';
import { View, ScrollView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthContext } from '../../context/auth';
import { Typography, Button, CustomInput, TypeAlertModa, AuthLayout } from '../../components';
import { stylesGlobal, colors } from '../../theme/appTheme';
import { Formik } from 'formik';
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email('Correo no valido')
    .required('Correo requerido'),
});

interface Props extends StackScreenProps<any, any>{};

type FormData = {
  email: string,
};

interface RspStruct extends TypeAlertModa {
    show: boolean; 
    message?: string;
  }

export const Forgout = ({ navigation } : Props) => {
    const [ isLoanding, setIsLoanding ] = useState(false);
    const { onForgout } = useContext(AuthContext);
    const [ rsp, setRsp ] = useState<RspStruct>({
        show : false,
        type: 'success',
        message: ''
    });

    const onForgoutCount = async({ email } : FormData) => {
        setIsLoanding(true);
        const isValid = await onForgout(email);
    
        if ( !isValid.ok ) {
            setTimeout(() => {
            setIsLoanding(false);
            setRsp({ show: true, type: 'error', message: isValid.message })
            }, 1500);
            
            return;
        }

        setTimeout(() => {
            setIsLoanding(false);
            setRsp({ show: true, type: 'success', message: 'correo enviado exitosamente' })
        }, 1500);
    }

    return (
        <AuthLayout
            rsp={rsp}
            setRsp={setRsp}
            title='Por favor, introduzca su nombre de usuario o dirección de correo electrónico. Recibirá un enlace para crear una nueva contraseña por correo electrónico.'
        >
            <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={values => onForgoutCount(values)}
          validationSchema={SignupSchema}
        >
          {({ handleChange, handleSubmit, values, errors }) => (
            <>
              <View style={[stylesGlobal.mb25]}>
                <CustomInput
                  labelText='Correo electronico'
                  value={values.email}
                  onChangeText={handleChange('email')}
                  isError={ errors.email ? true : false}
                  messageError={errors.email}
                />
              </View>
              <View
                style={[stylesGlobal.mt25]}
              >
                <Button
                  onPress={() => handleSubmit()}
                  backgroundColor={colors.primary}
                  style={{borderRadius: 50}}
                  loanding={isLoanding}
                >
                  <Typography title='Obtener nueva clave' textTransform='uppercase' fontFamily='Poppins-Medium' cl={colors.white} fs={15} style={{ marginTop: 5, letterSpacing: 0.8 }} />
                </Button>
                <View style={[stylesGlobal.dFlex, stylesGlobal.row, stylesGlobal.justifyContenCenter, stylesGlobal.alignItemsCenter, stylesGlobal.mt25]}>
                    <Typography title='Volver a' fs={12} cl={colors.white} fontFamily='Poppins-Light' />
                    <Button
                        onPress={() => navigation.navigate('Login')}
                        height='auto'
                        width={'auto'}
                        style={{marginLeft: 8}}
                    >
                        <Typography title='Iniciar Sesión' fs={12} cl={colors.primary} fontFamily='Poppins-Medium'  />
                    </Button>
                    </View>
              </View>
            </>
          )}
        </Formik>
        </AuthLayout>
    )
}
