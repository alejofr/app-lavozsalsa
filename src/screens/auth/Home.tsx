import React from 'react';
import { View, ImageBackground } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { Typography, AppLayout, Button } from '../../components';
import LogoSvg from '../../assets/images/logonew.svg';
import IconGoogle from '../../assets/icons/google.svg';
import { stylesGlobal, colors  } from '../../theme';
interface Props extends StackScreenProps<any, any>{};

export const Home = ({ navigation }: Props) => {
    const onLoginGoogle = () => {

    }
  
    return (
        <ImageBackground
            source={require("../../assets/images/bg01.png")} 
            resizeMode="cover" 
            resizeMethod='auto'
            style={[stylesGlobal.flex1]}
        >
            <AppLayout>
                <View style={[stylesGlobal.flex1, stylesGlobal.justifyContenCenter, stylesGlobal.alignItemsCenter, stylesGlobal.w100p]}>
                    <View style={[stylesGlobal.flex1, stylesGlobal.alignItemsCenter, stylesGlobal.justifyContenEnd, stylesGlobal.mb25]}>
                        <LogoSvg width={240} />
                        <Typography fs={15} cl='#fff' title='Lorem ipsum frase slogan lorem ipsum
                            dolor sit amet consectur adipiscing' />
                    </View>
                    <View style={[stylesGlobal.flex1, stylesGlobal.alignItemsCenter, stylesGlobal.justifyContenEnd, stylesGlobal.mb22, stylesGlobal.w100p]}>
                        <Button
                            onPress={() => navigation.navigate('Register')}
                            backgroundColor={colors.primary}
                            style={{borderRadius: 50}}
                        >
                            <Typography title='Registrate Gratis' textTransform='uppercase' fontFamily='Poppins-Medium' cl={colors.white} fs={14} style={{ marginTop: 5, letterSpacing: 0.8 }} />
                        </Button>
                        <Button
                            onPress={onLoginGoogle}
                            backgroundColor={colors.default}
                            style={{borderRadius: 50}}
                        >
                            <IconGoogle  style={{position: 'absolute', left: 10}} />
                            <Typography title='Continúar con Google' fontFamily='Poppins-Medium' cl={colors.white} fs={14} style={{ marginTop: 5, letterSpacing: 0.8 }} />
                        </Button>
                        <Button
                            onPress={() => navigation.navigate('Login')}
                            height='auto'
                        >
                            <Typography title='INICIAR SESIÓN' textTransform='uppercase' fontFamily='Poppins-Medium' cl={colors.white} fs={14} style={{ marginTop: 5, letterSpacing: 0.8 }} />
                        </Button>
                    </View>
                </View>
            </AppLayout>
        </ImageBackground>
    );
}
