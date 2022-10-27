import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import axiosRequest from '../api/axiosRequest';
import { CoverAlbunesData, CoverAlbun } from '../interfaces';

export const useCoverAlbums = (url: string, params: any = {}, isGet: boolean = true) => {
  const [ isLoadingCoverAlbums, setIsLoadingCoverAlbums] = useState(true);
  const [ isNextPageAlbums, setIsNextPageAlbums] = useState(false);
  const [coverAlbums, setCoverAlbums] = useState<CoverAlbun[]>([]);
  const nextPageUrl = useRef(url);

  const getAlbunes = async() => {
    try {
      const { data } = await axiosRequest.get<CoverAlbunesData>(nextPageUrl.current, params);
      let nextPage = false;
      if( data.data.length != 0 ){
          if( data.pagination.nextPage != null ){
            nextPageUrl.current = `${url}&page=${data.pagination.nextPage}`;
            nextPage = true;
          }
          
          const dataNew = renderDataId(data.data);
          setCoverAlbums([...coverAlbums, ...dataNew]);
      }

      setIsLoadingCoverAlbums(false);
      setIsNextPageAlbums(nextPage);
    } catch (error) {
      if ( axios.isAxiosError(error) ) {
        let data: any = [];
        data = error.response?.data;
      }   
      setIsLoadingCoverAlbums(false);    
    }
  }

  const getAlbun = async(id: string) => {
    try {
      const { data } = await axiosRequest.get<CoverAlbun>(`albums/${id}`);
      setCoverAlbums([...coverAlbums, data]);
      setIsLoadingCoverAlbums(false); 
    } catch (error) {
      if ( axios.isAxiosError(error) ) {
        let data: any = [];
        data = error.response?.data;
      }   
      setIsLoadingCoverAlbums(false);    
    }
  }

  const renderDataId = (data: CoverAlbun[]) => {
    let posicion = (coverAlbums.length - 1) + 1;
    for (let j = 0; j < data.length; j++) {
        data[j].position = `${posicion}`;
        
        posicion++;
    }
        
    return data;
}

  useEffect(() => {
    if( isGet ) getAlbunes();
  }, [])
  

  return {
    isLoadingCoverAlbums,
    coverAlbums,
    getAlbunes,
    getAlbun,
    isNextPageAlbums
  };
}
