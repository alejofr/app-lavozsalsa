import axios from 'axios';
import axiosRequest from './axiosRequest';
import { CoverMusic, CoverMusicData } from '../interfaces';


export const allMusicsCover = async() : Promise<{ok: Boolean, message?: string, coverMusic?: CoverMusic[]}>  => {
    try {
        const { data } = await axiosRequest.get<CoverMusicData>(`/musics`);
        return {
            ok: true,
            coverMusic: data.data,
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