import { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import axiosRequest from '../api/axiosRequest';
import { CoverSearchMusicArtist } from '../interfaces';

export const useMusicArtistSearch = () => {
    const [ isLoadingMusicArtistSearch, setIsLoadingMusicArtistSearch] = useState(false);
    const [musicArtistList, setMusicArtistList] = useState<CoverSearchMusicArtist[]>([]);

    const loadMusicArtist = async(search: string) => {
        setIsLoadingMusicArtistSearch(true);
        setMusicArtistList([]);
      
        try {
            const { data } = await axiosRequest.get<CoverSearchMusicArtist[]>(`/searchArtistAndMusic?search=${search}`);
           // console.log('data busqueda', data);
            const dataNew = renderDataId(data);
            setMusicArtistList(dataNew);
            setIsLoadingMusicArtistSearch(false);
        } catch (error) {
            if ( axios.isAxiosError(error) ) {
                let data: any = [];
                data = error.response?.data;

            }

            setIsLoadingMusicArtistSearch(false);
        }
    }


    const renderDataId = (data: CoverSearchMusicArtist[]) => {
        let posicion = (musicArtistList.length - 1) + 1;
        for (let j = 0; j < data.length; j++) {
            data[j].position = `${posicion}`;
            
            posicion++;
        }
            
        return data;
    }

    return {
        isLoadingMusicArtistSearch,
        musicArtistList,
        loadMusicArtist,
    }
}
