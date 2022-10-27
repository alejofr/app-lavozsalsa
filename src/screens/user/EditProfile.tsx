import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext, useEffect, useState } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import { RootStackParams } from '../../navigator';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { stylesGlobal, colors } from '../../theme';
import { showUser, updateUser, deleteUser } from '../../api';
import { RspStruct, UserInfo, EditUser } from '../../interfaces';
import { LoandingIndicator, AlertModal, CustomInput, Typography, Button, Avatar } from '../../components';
import { AuthContext } from '../../context';


interface Props extends StackScreenProps<RootStackParams, 'EditProfile'>{};
const reuserName = new RegExp(/^[a-zA-Z0-9_]+$/);
const SignupSchema = Yup.object().shape({
    first_name: Yup.string()
        .required('Primer nombre requerido'),
    second_name: Yup.string()
        .required('Segundo nombre requerido'),   
    userName: Yup.string()
      .required('Nombre de usuario requerido')
      .max(12, 'Maximo 12 caracteres')
      .test('regex', 'Nombre de usuario no valido', value => reuserName.test(value ? value : '')),
    email: Yup.string()
      .email('Correo no valido')
      .required('Correo requerido'),
    password: Yup.string()
      .min(5, 'Minimo 5 caracteres')
      .max(10, 'Maximo, 10 caracteres'),
    confirmPassword: Yup.string().when("password", {
        is: (val : string ) => (val && val.length > 0 ? true : false),
        then: Yup.string()
        .min(5, 'Minimo 5 caracteres')
        .max(10, 'Maximo, 10 caracteres')
        .required('Confirmar contraseña requerido')
        .oneOf(
          [Yup.ref("password")],
          "La contraseña no coincide."
        )
    })
});

const { width } = Dimensions.get('window');

export const EditProfile = ({ route, navigation }: Props) => {
    const params = route.params;
    const { user, logout, updateDataUser } = useContext(AuthContext);  
    const [secureTexPass, onChangeShowPass] = useState(true);
    const [ isLoandingData, setIsLoandingData ] = useState(true);
    const [ isLoanding, setIsLoanding ] = useState(false);
    const [ userInfo, setUserInfo] = useState<EditUser>({
        userName: '',
        first_name: '',
        second_name: '',
        email: '',
        password: ''
    });
    const [ rsp, setRsp ] = useState<RspStruct>({
        show : false,
        type: 'success',
        message: ''
    });

    const request = async(id: string) => {
        const resp = await showUser(id);

        if( !resp.ok ) {
            setTimeout(() => {
                setIsLoandingData(false);
                setRsp({ show: true, type: 'error', message: resp.message })
            }, 1500);
            return;
        }

       
        setTimeout(() => {
            setIsLoandingData(false);
            if( resp.user != undefined ){
                const { first_name, second_name, userName, email } = resp.user;
                setUserInfo( { ...userInfo, first_name, second_name, email, userName});
            }
        }, 1500);
        
    }

    useEffect(() => {
        request(params._id);
    }, []);


    const onUpdate = async( { first_name, second_name, email, userName, password } : EditUser) => {
        setIsLoanding(true);
        const resp = await updateUser(user?._id, { first_name, second_name, email, userName, password });
        

        if ( !resp.ok ) {
            setTimeout(() => {
              setIsLoanding(false);
              setRsp({ show: true, type: 'error', message: resp.message })
            }, 1500);
            
            return;
        }


        

        if( resp.user != undefined ){
            const { first_name, second_name, userName, email, _id, roles, perfilUrl } = resp.user;
            setUserInfo( { ...userInfo, first_name, second_name, email, userName});
            updateDataUser({ userName, email, _id, roles: roles[0], perfilUrl});
        }

        setTimeout(() => {
            setRsp({ show: true, type: 'success', message: resp.message });
            setIsLoanding(false);
        }, 1500);
        
    };

    const destroyCount = async() => {
        const resp = await deleteUser(user?._id);

        if ( !resp.ok ) {
            setTimeout(() => {
              setRsp({ show: true, type: 'error', message: resp.message })
            }, 1500);
            
            return;
        }

        setTimeout(() => {
            setRsp({ show: true, type: 'success', message: resp.message });
        }, 1500);

        setTimeout(() => {
            logout();
        }, 3000);

    }
    

    return (
    <>
        {
            isLoandingData && <LoandingIndicator />
        }
        {
            !isLoandingData && userInfo.email != '' && 
            <ScrollView>
                <View
                    style={[
                        stylesGlobal.row,
                        stylesGlobal.justifyContentSpaceBetween,
                        {
                            backgroundColor: '#101316',
                            paddingHorizontal: 15,
                            paddingVertical: 20
                        }
                    ]}
                >
                    <View style={[stylesGlobal.h100p, stylesGlobal.dFlex, stylesGlobal.alignItemsCenter, ]}>
                        <Avatar 
                            height={84} width={84} typeView='view' 
                            urlImage={ user?.perfilUrl  && user.perfilUrl != null ? user.perfilUrl : null} 
                            text={user?.userName ? user.userName.charAt(0) : ''} 
                            textProps={{fontFamily: 'Poppins-Medium', cl: '#fff', fs: 28 ,style: { marginTop: 6 } }} 
                            style={{backgroundColor: '#303234', borderRadius: 50, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}
                        />
                    </View>
                    <View
                        style={[stylesGlobal.dFlex, stylesGlobal.alignItemsStart, stylesGlobal.justifyContenCenter, {paddingHorizontal: 10, width: ( width - 30 ) - 130 }]}
                    >
                        <Typography title={user?.userName ? user.userName : ''} cl='#fff' fontFamily='Poppins-Medium' fs={14} />
                    </View>
                    <View
                        style={{width: 30}}
                    >
                        <Button
                            height={'auto'}
                            width={'auto'}
                            onPress={() => logout()}
                            style={{
                                marginVertical: 0,
                                display: 'flex',
                                alignItems: 'flex-start'
                            }}
                        >
                            <Ionicons name='exit-outline' size={24} color={colors.primary} />
                        </Button>
                    </View>
                </View>
                <View style={[stylesGlobal.container]}>
                    <Formik
                        initialValues={{ 
                            userName: userInfo.userName,
                            email: userInfo.email, 
                            password: '', 
                            confirmPassword: '',
                            first_name: userInfo.first_name, 
                            second_name: userInfo.second_name,
                        }}
                        onSubmit={values => onUpdate(values)}
                        validationSchema={SignupSchema}
                    >
                        {({ handleChange, handleSubmit, values, errors }) => (
                        <>
                            <View style={[stylesGlobal.mt25]}>
                                <CustomInput
                                    labelText='Primer nombre'
                                    value={values.first_name}
                                    onChangeText={handleChange('first_name')}
                                    isError={ errors.first_name ? true : false}
                                    messageError={errors.first_name}
                                />
                                <CustomInput
                                    labelText='Segundo nombre'
                                    value={values.second_name}
                                    onChangeText={handleChange('second_name')}
                                    isError={ errors.second_name ? true : false}
                                    messageError={errors.second_name}
                                />
                                <CustomInput
                                    labelText='Nombre de usuario'
                                    value={values.userName}
                                    onChangeText={handleChange('userName')}
                                    isError={ errors.userName ? true : false}
                                    messageError={errors.userName}
                                />
                                <CustomInput
                                    labelText='Correo electrónico'
                                    value={values.email}
                                    onChangeText={handleChange('email')}
                                    isError={ errors.email ? true : false}
                                    messageError={errors.email}
                                />
                                <Typography title='Cambiar Contraseña' fontFamily='Poppins-Medium' cl='#fff' style={{marginVertical: 10}} />
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
                                <CustomInput 
                                    labelText='Confirmar contraseña'
                                    value={values.confirmPassword}
                                    onChangeText={handleChange('confirmPassword')}
                                    textInputProps={{
                                        secureTextEntry: secureTexPass
                                    }}
                                    isError={ errors.confirmPassword ? true : false}
                                    messageError={errors.confirmPassword}
                                />
                            </View>
                            <View
                            style={[stylesGlobal.mt15, stylesGlobal.mb25]}
                            >
                                <Button
                                    onPress={() => handleSubmit()}
                                    backgroundColor={colors.primary}
                                    style={{borderRadius: 50}}
                                    loanding={isLoanding}
                                >
                                    <Typography title='Actualizar Cuenta' textTransform='uppercase' fontFamily='Poppins-Medium' cl={colors.white} fs={15} style={{ marginTop: 5, letterSpacing: 0.8 }} />
                                </Button>
                            </View>
                        </>
                        )}
                    </Formik>
                    <View style={{display: 'flex', justifyContent: 'flex-end', width: '100%', alignItems: 'flex-end', marginTop: 5, marginBottom: 25}}>
                        <Button
                            height={'auto'}
                            width={'auto'}
                            onPress={() => destroyCount()}
                            style={{
                                marginVertical: 0,
                            }}
                        >
                            <Typography title='Eliminar Cuenta' fs={12} fontFamily='Poppins-Light' cl='#fff' />
                        </Button>
                    </View>
                </View>
            </ScrollView>
        }
        <AlertModal 
            type={rsp.type === 'success' ? 'success' : 'error'}
            isVisible={rsp.show}  
            stateChange={() => setRsp({show: false, type: 'error', message: '' })} 
            paragraph={rsp.message ? rsp.message : ''}
        />
    </>
    )
}
