import React, { useState, useContext } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import CheckBox from '@react-native-community/checkbox';
import { AuthContext } from '../../context/auth';
import { Typography, Button, CustomInput, TypeAlertModa, AuthLayout } from '../../components';
import { stylesGlobal, colors } from '../../theme/appTheme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import IconGoogle from '../../assets/icons/google.svg';
import { Formik } from 'formik';
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
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
  email: string,
  password: string,
};
interface RspStruct extends TypeAlertModa {
  show: boolean; 
  message?: string;
}

export const Login = ({ navigation }: Props) => {
  const [secureTexPass, onChangeShowPass] = useState(true);
  const [ isLoanding, setIsLoanding ] = useState(false);
  const [remember, setRemember] = useState(false);
  const { signIn } = useContext(AuthContext);
  const [ rsp, setRsp ] = useState<RspStruct>({
    show : false,
    type: 'success',
    message: ''
  });


  const onSignIn = async( {email, password} : FormData) => {
    setIsLoanding(true);
    const isValidLogin = await signIn(email, password);
    console.log(isValidLogin, 'saasas')

    if ( !isValidLogin.ok ) {
      setTimeout(() => {
        setIsLoanding(false);
        setRsp({ show: true, type: 'error', message: isValidLogin.message })
      }, 1500);
      
      return;
    }
  }
      
  return (
    <AuthLayout
      rsp={rsp}
      navigator={() => navigation.navigate('Register')}
      setRsp={setRsp}
      root='Register'
      titleRoot='Regístrate gratis'
      title='¿No tienes una cuenta?'
    >
      <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={values => onSignIn(values)}
          validationSchema={SignupSchema}
        >
          {({ handleChange, handleSubmit, values, errors }) => (
            <>
              <View style={[stylesGlobal.mb25]}>
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
                 <View style={[stylesGlobal.row, stylesGlobal.alignItemsCenter, stylesGlobal.justifyContentSpaceBetween, stylesGlobal.mt15]}>
                    <Button 
                      style={{...stylesGlobal.row, ...stylesGlobal.alignItemsCenter, width: 'auto', marginVertical: 0, height: 'auto'}} 
                      onPress={() => setRemember(remember ? false : true)}
                    >
                      <CheckBox 
                        hideBox
                        style={{ marginLeft: -8,transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }} 
                        tintColors={{true: colors.primary, false: colors.white}} 
                        value={remember} 
                        onValueChange={(newValue) => setRemember(newValue)} 
                      />
                      <Typography title='Recordarme' fs={12} fontFamily={remember ? 'Poppins-Medium' : 'Poppins-Light'} cl={remember ? colors.primary : colors.white} pt={2} />
                    </Button>
                    <Button 
                      style={{width: 'auto', marginVertical: 0, height: 'auto'}} 
                      onPress={() => navigation.navigate('Forgout')}
                    >
                      <Typography title='Olvidé mi clave' fs={12} fontFamily='Poppins-SemiBold' cl={colors.primary} pt={2} />
                    </Button>
                 </View>
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
                  <Typography title='Iniciar sesión' textTransform='uppercase' fontFamily='Poppins-Medium' cl={colors.white} fs={15} style={{ marginTop: 5, letterSpacing: 0.8 }} />
                </Button>
                <Button
                  onPress={() => null}
                  style={{borderRadius: 50, borderWidth: 1, borderColor: '#fff'}}
                >
                    <IconGoogle  style={{position: 'absolute', left: 10}} />
                    <Typography title='Continúar con Google' fontFamily='Poppins-Medium' cl={colors.white} fs={14} style={{ marginTop: 5, letterSpacing: 0.8 }} />
                </Button>
              </View>
            </>
          )}
        </Formik>
    </AuthLayout>
  );
}
