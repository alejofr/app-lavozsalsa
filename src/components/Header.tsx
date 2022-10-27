import React, { useMemo, useContext } from 'react';
import { View, StatusBar } from 'react-native';
import { getHeaderTitle } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/core';
import { StackHeaderProps } from '@react-navigation/stack';
import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import { AuthContext } from '../context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Typography, Button, Avatar } from '../components';
import LogoSvg from '../assets/images/logonew.svg';



const heigthBar = StatusBar.currentHeight !== undefined ? StatusBar.currentHeight : 15;
export const Header = ( { navigation, route, options } : StackHeaderProps | BottomTabHeaderProps ) => {

    const title = useMemo(() => getHeaderTitle(options, route.name), [route.name]);
    const { status, user } = useContext(AuthContext);  
    const sd = useNavigation();
   
   

    //console.log(route.name, 'name', getHeaderTitle(options, route.name), options, 'options')
    console.log( route.name)
    console.log(navigation.getState());
    console.log(user, 'user')

    //const title = getHeaderTitle(options, route.name);

    return (
        <>  
            <StatusBar barStyle={'light-content'} translucent={true} backgroundColor="transparent"/>
            <View
                style={{
                    paddingTop: heigthBar + 15,
                    backgroundColor: '#000',
                }}
            >
                <View
                    style={{
                        height: 50,
                        backgroundColor: 'transparent',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingHorizontal: 15
                    }}
                >
                    {
                        route.name != 'Dashboard' && 
                        <Button
                            onPress={navigation.goBack}
                            height={'auto'}
                            width={'auto'}
                            style={{
                                marginVertical: 0
                            }}
                        >
                            <Ionicons name="arrow-back-outline"  size={24} color="white" />
                        </Button>
                    }
                    <View>
                        {
                            status === 'not-authenticated' && <Typography title={title} cl='#fff' fs={16} fontFamily='Poppins-Medium' />
                        }
                        {
                            status === 'authenticated' && 
                            <Button
                                onPress={() => navigation.navigate('Dashboard')}
                                height={'auto'}
                                width={'auto'}
                                style={{
                                    marginVertical: 0
                                }}
                            >
                                <LogoSvg width={130} />
                            </Button>
                        }
                    </View>
                    <View>
                        {
                            status === 'authenticated' &&
                            <Avatar 
                                height={28} width={28} typeView='button' 
                                onPress={() => navigation.navigate('EditProfile', {_id: user?._id})} 
                                urlImage={ user?.perfilUrl  && user.perfilUrl != null ? user.perfilUrl : null} 
                                text={user?.userName ? user.userName.charAt(0) : ''} textProps={{fontFamily: 'Poppins-Medium', cl: '#fff' ,style: { fontSize: 12, marginTop: 2 } }} 
                                style={{backgroundColor: '#303234', borderRadius: 50, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}
                            />
                        }
                    </View>
                </View>
            </View>
        </>
       
    );
}
