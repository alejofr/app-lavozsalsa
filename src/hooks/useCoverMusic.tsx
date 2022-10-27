import { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import axiosRequest from '../api/axiosRequest';
import { CoverMusic, CoverMusicData } from '../interfaces';

export const useCoverMusic = (url: string, params: any = {}, all: boolean = true) => {
    const [ isLoadingCoverMusics, setIsLoadingCoverMusics] = useState(false);
    const [ isNextPageMusics, setIsNextPageMusics] = useState(false);
    const [coverMusicsList, setCoverMusicsList] = useState<CoverMusic[]>([]);
    const nextPageUrl = useRef(url);

    const loadMusicsCover = async() => {
        setIsLoadingCoverMusics(true);
        try {
            const { data } = await axiosRequest.get<CoverMusicData>(nextPageUrl.current, {params : params});
            let nextPage = false;
            if( data.data.length != 0 ){
                //console.log('data.pagination', data.pagination)
                if( data.pagination.nextPage != null ){
                    nextPageUrl.current = `${url}&page=${data.pagination.nextPage}`;
                    nextPage = true;
                }
                
                const dataNew = renderDataId(data.data);
                //console.log('datanew', dataNew)
                setCoverMusicsList([...coverMusicsList, ...dataNew]);
                //console.log('coverMusicsList', coverMusicsList)
            }

            setIsLoadingCoverMusics(false);
            setIsNextPageMusics(nextPage);
            //console.log(nextPageUrl.current, 'nextPageUrl.current');

        } catch (error) {
            if ( axios.isAxiosError(error) ) {
                let data: any = [];
                data = error.response?.data;

            }

            setIsLoadingCoverMusics(false);
        }
    }
    

    const renderDataId = (data: CoverMusic[]) => {
        let posicion = (coverMusicsList.length - 1) + 1;
        for (let j = 0; j < data.length; j++) {
            data[j].position = `${posicion}`;
            
            posicion++;
        }
            
        return data;
    }

    useEffect(() => {
        if( all === true ) { loadMusicsCover(); }
    }, []);

    return {
        loadMusicsCover,
        isLoadingCoverMusics,
        coverMusicsList,
        isNextPageMusics
    }
}
