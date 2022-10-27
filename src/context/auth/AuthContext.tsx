import React, { createContext, useReducer, useEffect } from 'react';
import { authReducer, AuthState } from './authReducer';
import { User } from '../../interfaces';
import axiosRequest from '../../api/axiosRequest';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContextProps = {
    isLoggedIn: Boolean;
    status: 'checking' | 'authenticated' | 'not-authenticated';
    user: User | null;
    signIn: (email: string, password: string) => Promise<{ok: Boolean;message?: string;}>;
    signUp: (username: string, email: string, password: string) => Promise<{ok: Boolean;message?: string;}>;
    onForgout: (email: string) => Promise<{ok: Boolean;message?: string;}>;
    updateDataUser: (user: User) => void;
    logout: () => void;
}

export const AuthContext = createContext({} as AuthContextProps);

const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    status: 'checking',
    user: null
}

type AuthProviderProp = {
    children: any
}

export const AuthProvider = ({children} : any) => {
    const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

    useEffect(() => {
     checkToken();
    }, [])
    

    const checkToken = async () => {
        const token = await AsyncStorage.getItem('token');
        if( token === undefined || token === null ) {  
            return dispatch({type: 'Logout'});
        } 

        try {   
            const { data } = await axiosRequest.get('/user_info');
            const { _id, userName, roles, email, perfilUrl } = data;
            dispatch({ type: 'Login', payload: { _id, email, userName, roles: roles[0], perfilUrl } });

        } catch (error) {
            await AsyncStorage.removeItem('token');
            dispatch({type: 'Logout'});   
        }
    }

    const signIn = async(email: string, password: string) : Promise<{ok: Boolean, message?: string}> => {

        try {
            const { data } = await axiosRequest.post('/login', { user: email,password})
            const { userName, _id, roles, token, perfilUrl} = data;
            await AsyncStorage.setItem('token', token );
            dispatch({ type: 'Login', payload: { _id, email, userName, roles: roles[0], perfilUrl } });
            return{
                ok: true,
                message: 'Tu cuenta fue creada con exito'
            }
        } catch (error) {
            if ( axios.isAxiosError(error) ) {
                let data: any = [];
                data = error.response?.data;
                return {
                    ok: false,
                    message: data[0].message
                }
            }

            return {
                ok: false,
                message: 'Ha ocurrido un error'
            }
        }
    };

    const signUp = async(username: string, email: string, password: string) : Promise<{ok: Boolean, message?: string}> => {
        try {
            const { data } = await axiosRequest.post('/registers_users', { userName: username, email,password})
            const { userName, _id, roles, token, perfilUrl} = data;
            console.log('uaer', data)
            await AsyncStorage.setItem('token', token );

            setTimeout(() => {
                dispatch({ type: 'Login', payload: { _id, email, userName, roles: roles[0], perfilUrl } });
            }, 3500);

            return{
                ok: true,
                message: 'Tu cuenta fue creada con exito'
            }

        } catch (error: any) {
            console.log(error)
            if ( axios.isAxiosError(error) ) {
                let data: any = [];
                data = error.response?.data;

                return {
                    ok: false,
                    message: data[0].message
                }
            }

            return {
                ok: false,
                message: 'Ha ocurrido un error'
            }
        }
    }

    const onForgout = async(email: string) : Promise<{ok: Boolean, message?: string}> => {
        try {
            const { data } = await axiosRequest.post('/recuperate', { user: email})

            return{
                ok: true,
                message: 'Tu cuenta fue creada con exito'
            }

        } catch (error: any) {
            console.log(error, 'error')
            if ( axios.isAxiosError(error) ) {
                let data: any = [];
                data = error.response?.data;

                return {
                    ok: false,
                    message: data[0].message
                }
            }

            return {
                ok: false,
                message: 'Ha ocurrido un error'
            }
        }
    } 

    const logout = () => {
        AsyncStorage.removeItem('token');
        dispatch({type: 'Logout'});
    }

    const updateDataUser = ( user : User) => {
        const { userName, _id, roles, email, perfilUrl} = user;
        dispatch({ type: 'updateStateUser', payload: { _id, email, userName, roles: roles[0], perfilUrl } });
    }

    return (
        <AuthContext.Provider
            value={{
                ...state,
                signIn,
                signUp,
                onForgout,
                updateDataUser,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}