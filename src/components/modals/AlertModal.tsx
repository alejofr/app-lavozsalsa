import React from 'react';
import { View, Modal, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { Typography } from '../Typography';

export interface TypeAlertModa {
    type: 'error' | 'success' | 'warning';
}

interface PropsAlertModal extends TypeAlertModa {
    isVisible?: boolean;
    title?: string;
    paragraph: string;
    stateChange: () => void;
    actionAccept?: () => void;
}

export const AlertModal = ({ type, isVisible = false, title = '', paragraph, stateChange, actionAccept}: PropsAlertModal ) => {

    const onPressAccept = () => {
        if( actionAccept !== undefined ){
            actionAccept();
            return;
        }

        stateChange();
    }

    return (
        <Modal
            visible={isVisible}
            transparent={true}
            animationType='fade'
        >
      
        <View
            style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center', 
            paddingHorizontal: 15,
            flex: 1
            }}
        >
            <LinearGradient
                colors={['rgba(0, 0, 0, 0.2)', 'rgba(255, 0, 50, 0.25)']}
                style={{
                    backgroundColor: '#000',
                    borderRadius: 4
                }}
                start={{x: 0, y: 0}}
                end={{x: 0, y: 0.98}}
            >
                <View 
                    style={{
                        borderTopWidth: 3,
                        borderTopColor: type === 'error' ? 'rgba(255, 0, 50, 1)' : type === 'warning' ? '#f59f00' : '#2fb344'
                    }} 
                />
                <View 
                    style={{
                        marginTop: 15,
                        marginBottom: 5
                    }}
                >
                    <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={stateChange}
                        style={{
                            position: 'absolute',
                            backgroundColor: '#000',
                            height: 30,
                            width: 30,
                            borderRadius: 20,
                            marginRight: 15,
                            right: 0,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Icon name='close' size={24} color='#fff' />
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        width: '100%',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 15
                    }}
                >
                    <Icon 
                        name={ type === 'error' || type === 'warning' ? 'alert-circle-outline' : 'checkmark-circle-outline'} 
                        size={82} 
                        color={type === 'error' ? 'rgba(255, 0, 50, 1)' : type === 'warning' ? '#f59f00' : '#2fb344' } 
                        style={{textAlign: 'center'}} 
                    />
                    <Typography 
                        title={ title != '' ? title : ( type === 'error' ) ? 'Error...' : ( type === 'warning' ? 'Advertencia...' : 'Éxito...' ) } 
                        fontFamily='Poppins-SemiBold'
                        fs={22}
                        letterSpacing={0.6}
                        cl={type === 'error' ? 'rgba(255, 0, 50, 1)' : type === 'warning' ? '#f59f00' : '#2fb344'}
                        textAlign='center'
                        mb={15}
                    />
                    <Typography 
                        title={paragraph}
                        fontFamily='Poppins-SemiBold'
                        fs={13}
                        textAlign='center'
                        cl='#fff'
                        mb={10}
                    />
                    <View 
                        style={{
                            marginTop: 40,
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}

                    >
                        <ButtonsAlertModal  
                            positionButton='start' 
                            onPress={stateChange} 
                            title='Cerrar'
                        />
                        <ButtonsAlertModal  
                            positionButton='end' 
                            onPress={onPressAccept} 
                            title='Aceptar' 
                            background={ type === 'error' ? 'rgba(255, 0, 50, 1)' : type === 'warning' ? '#f59f00' : '#2fb344' }
                            color='#fff'
                        />
                    </View>
                </View>
            </LinearGradient>
        </View>
        </Modal>
    );
}

type PropsButton = {
    background?: string;
    color?: string;
    title: string;
    positionButton: 'start' | 'end';
    onPress: () => void
}

const ButtonsAlertModal = ({ title, background = 'transparent', color = '#fff', positionButton = 'start', onPress }: PropsButton) => {
    return (
        <TouchableOpacity
            activeOpacity={0.6}
            onPress={onPress}
            style={{
                backgroundColor: background,
                width: '48%',
                height: 40,
                display: 'flex',
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 3,
                borderWidth: (positionButton == 'start') ? 1 : 0, 
                borderColor: '#DFE1E3',
                marginRight: ( positionButton === 'start' ) ? 5 : 0,
                marginLeft: ( positionButton === 'end'  ) ? 5 : 0
            }}
        >
            <Typography title={title} fs={13}  fontFamily='Poppins-SemiBold' cl={color} /> 
        </TouchableOpacity>
    )
}