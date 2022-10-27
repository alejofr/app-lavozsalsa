import React from 'react';
import { View, KeyboardAvoidingView } from 'react-native';
import { Typography, AppLayout, Button, AlertModal, TypeAlertModa } from '../../components';
import { stylesGlobal, colors } from '../../theme/appTheme';

interface RspStruct extends TypeAlertModa {
    show: boolean; 
    message?: string;
}

type AuthLayoutProp = {
    children: JSX.Element | JSX.Element[];
    rsp: RspStruct;
    setRsp: (rsp : RspStruct) => void;
    navigator?: ( root?: string ) => void;
    root?: string;
    titleRoot?: string;
    title?: string;
}

export const AuthLayout = ( { children, rsp, setRsp, navigator, root, title = '', titleRoot = '' } : AuthLayoutProp) => {

    return (
        <AppLayout
        backgroundColor='#000'
    >
        <View style={[stylesGlobal.dFlex, stylesGlobal.row, stylesGlobal.justifyContenCenter, stylesGlobal.alignItemsCenter, stylesGlobal.mb8]}>
        <Typography title={title} fs={12} cl={colors.white} fontFamily='Poppins-Light' />
        <Button
            onPress={() => navigator ? navigator(root) : null}
            height='auto'
            width={'auto'}
            style={{marginLeft: 8}}
        >
            <Typography title={titleRoot} fs={12} cl={colors.primary} fontFamily='Poppins-Medium'  />
        </Button>
        </View>
        <KeyboardAvoidingView
        style={{flex: 1}}
        behavior='height'
        >
        <View style={[stylesGlobal.container, stylesGlobal.mt25, { paddingHorizontal: 0 }]}>
            { children }
        </View>
        </KeyboardAvoidingView>
        <AlertModal 
            type={rsp.type === 'success' ? 'success' : 'error'}
            isVisible={rsp.show}  
            stateChange={() => setRsp({show: false, type: 'error', message: '' })} 
            paragraph={rsp.message ? rsp.message : ''}
        />
    </AppLayout>
    )
}
