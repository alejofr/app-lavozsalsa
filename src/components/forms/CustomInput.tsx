import React from 'react';
import { View, TextInput, TextInputProps, StyleSheet, ViewStyle } from 'react-native';
import { Button } from '../Button';
import { Typography } from '../Typography';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../../theme';

type CustomInputProps = {
    styleFormControl?: ViewStyle;
    styleTextInput?: ViewStyle;
    isError?: boolean;
    messageError?: string;
    field?: any;
    value: any;
    onChangeText: (field : string) => void;
    textInputProps?: TextInputProps;
    onPressIcon?: () => void | null;
    ElementIconRight?: () => JSX.Element | null;
    labelText?: string;
}   

export const CustomInput = ( {
    styleFormControl,
    styleTextInput,
    isError,
    messageError = '',
    value = '',
    onChangeText,
    textInputProps,
    onPressIcon,
    ElementIconRight,
    labelText
} : CustomInputProps ) => {

    const IconRightButton = () =><Button onPress={() => onPressIcon ? onPressIcon() : null} style={{...styles.iconOrButton}}>{ElementIconRight ? <ElementIconRight /> : <Ionicons name='text' />}</Button>;

    const IconRightView =  () =><View style={{...styles.iconOrButton}}>{ElementIconRight && <ElementIconRight />}</View>;

    const RenderIconRight = () => onPressIcon ? <IconRightButton /> : <IconRightView />;

    return (
        <View
            style={[
                styles.formControl,
                {
                    ...styleFormControl,
                }
            ]}
        >
            {
                labelText && <Typography title={labelText} fs={11} cl={colors.white} mb={12} /> 
            }
            <View
                style={{position: 'relative'}}
            >
                <TextInput
                    style={[
                        styles.input,
                        {
                            borderColor: isError ? colors.primary : '#3F3F3F',
                            paddingRight: ElementIconRight != undefined ? 48 : 15,
                            ...styleTextInput,
                           
                        }
                    ]}
                    onChangeText={onChangeText}
                    {...textInputProps}
                    value={value}
                />
                {
                    ElementIconRight != undefined && ElementIconRight != null && <RenderIconRight />
                }
            </View>
            {
                isError && <Typography title={messageError} fs={11} cl={colors.primary} style={{marginTop: 10}} />
            }
        </View>
    );
};

export const styles = StyleSheet.create({
    formControl: {
        width: '100%',
        marginVertical: 10,
    },
    input: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 15,
        color: '#fff',
        fontSize: 12,
        borderRadius: 8,
        backgroundColor:'transparent',
        height: 48,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#3F3F3F'
    },
    iconOrButton: {
        height: '100%',
        width: 48,
        position: 'absolute',
        zIndex: 1024,      
        right: 0,
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 0,
        padding: 0
    } 
});


