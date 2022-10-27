import React, { useState, useContext } from 'react';
import { View, ScrollView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthContext } from '../../context/auth';
import { Typography, Button, CustomInput, TypeAlertModa, AuthLayout } from '../../components';
import { stylesGlobal, colors } from '../../theme/appTheme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import IconGoogle from '../../assets/icons/google.svg';
import { Formik } from 'formik';
import * as Yup from "yup";

const reUsername = new RegExp(/^[a-zA-Z0-9_]+$/);

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .required('Nombre de usuario requerido')
    .max(12, 'Maximo 12 caracteres')
    .test('regex', 'Nombre de usuario no valido', value => reUsername.test(value ? value : '')),
  email: Yup.string()
    .email('Correo no valido')
    .required('Correo requerido'),
  password: Yup.string()
    .min(5, 'Minimo 5 caracteres')
    .max(10, 'Maximo, 10 caracteres')
    .required('Contraseña requerido')
});

interface Props extends StackScreenProps<any, any>{};

type FormData = {
  username: string,
  email: string,
  password: string,
};
interface RspStruct extends TypeAlertModa {
  show: boolean; 
  message?: string;
}

export const Register = ( {  navigation } : Props) => {
    const [secureTexPass, onChangeShowPass] = useState(true);
    const [ isLoanding, setIsLoanding ] = useState(false);
    const { signUp } = useContext(AuthContext);
    const [ rsp, setRsp ] = useState<RspStruct>({
        show : false,
        type: 'success',
        message: ''
    });
    const onSignUp = async( {username, email, password} : FormData) => {
      setIsLoanding(true);
      const isValidLogin = await signUp(username,email, password);
  
      if ( !isValidLogin.ok ) {
        setTimeout(() => {
          setIsLoanding(false);
          setRsp({ show: true, type: 'error', message: isValidLogin.message })
        }, 1500);
        
        return;
      }

      setTimeout(() => {
        setIsLoanding(false);
        setRsp({ show: true, type: 'success', message: 'Cuenta creada exitosamente, redireccionando...' })
      }, 1500);
    }

    return (
      <AuthLayout
          rsp={rsp}
          navigator={() => navigation.navigate('Login')}
          setRsp={setRsp}
          root='Login'
          titleRoot='Inicia sesión'
          title='¿Ya tienes una cuenta?'
      >
        <ScrollView >
        <Formik
            initialValues={{ username: '',email: '', password: '' }}
            onSubmit={values => onSignUp(values)}
            validationSchema={SignupSchema}
          >
            {({ handleChange, handleSubmit, values, errors }) => (
              <>
                <View>
                  <CustomInput
                    labelText='Nombre de usuario'
                    value={values.username}
                    onChangeText={handleChange('username')}
                    isError={ errors.username ? true : false}
                    messageError={errors.username}
                  />
                  <CustomInput
                    labelText='Correo electrónico'
                    value={values.email}
                    onChangeText={handleChange('email')}
                    isError={ errors.email ? true : false}
                    messageError={errors.email}
                  />
                  <CustomInput 
                    labelText='Contraseña'
                    value={values.password}
                    onChangeText={handleChange('password')}
                    ElementIconRight={() => <Ionicons name={(secureTexPass == true) ? "eye-off-outline" : "eye-outline"} size={18} color="#fff" />}
                    onPressIcon={() => onChangeShowPass((secureTexPass) ? false: true)}
                    textInputProps={{
                      secureTextEntry: secureTexPass
                    }}
                    isError={ errors.password ? true : false}
                    messageError={errors.password}
                  />
                </View>
                <View
                  style={[stylesGlobal.mt15]}
                >
                  <Button
                    onPress={() => handleSubmit()}
                    backgroundColor={colors.primary}
                    style={{borderRadius: 50}}
                    loanding={isLoanding}
                  >
                    <Typography title='REGISTRATE' textTransform='uppercase' fontFamily='Poppins-Medium' cl={colors.white} fs={15} style={{ marginTop: 5, letterSpacing: 0.8 }} />
                  </Button>
                  <Button
                    onPress={() => null}
                    style={{borderRadius: 50, borderWidth: 1, borderColor: '#fff'}}
                  >
                      <IconGoogle  style={{position: 'absolute', left: 10}} />
                      <Typography title='Registrate con Google' fontFamily='Poppins-Medium' cl={colors.white} fs={14} style={{ marginTop: 5, letterSpacing: 0.8 }} />
                  </Button>
                </View>
              </>
            )}
          </Formik>
        </ScrollView>
      </AuthLayout>
    )
}
