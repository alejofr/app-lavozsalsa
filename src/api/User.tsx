import axios from 'axios';
import axiosRequest from './axiosRequest';
import { UserInfo, EditUser, User } from '../interfaces';

export const showUser = async( _id : string) : Promise<{ok: Boolean, message?: string, user?: UserInfo}> => {
    try {
        const { data } = await axiosRequest.get<UserInfo>(`/user_info`);
        return {
            ok: true,
            user: data,
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
}

export const updateUser = async( id? : string, user? : EditUser) : Promise<{ok: Boolean, message?: string, user?: UserInfo}> => {
    try {
        const { data } = await axiosRequest.put(`/user/${id}`, { ...user });
        return {
            ok: true,
            user: data,
            message: 'Tu cuenta se actualizado con exito.'
        }
    } catch (error) {
        console.log('qsasda k')
        if ( axios.isAxiosError(error) ) {
            let data: any = [];
            data = error.response?.data;
            console.log('dassc', error.response)

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

export const deleteUser = async( id? : string ) : Promise<{ok: Boolean, message?: string}> => {
    try {
        const { data } = await axiosRequest.delete(`/user/${id}`);
        return {
            ok: true,
            message: 'Tu cuenta ha sido eliminada.'
        }
    } catch (error) {
        console.log('qsasda k')
        if ( axios.isAxiosError(error) ) {
            let data: any = [];
            data = error.response?.data;
            console.log('dassc', error.response)

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