import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import axiosRequest from '../api/axiosRequest';
import { CoverPlaylistsData, CoverPlaylist } from '../interfaces';

export const usePlayLists = (url: string, params: any = {}, isGet: boolean = true) => {
  const [ isLoadingCoverPlayLists, setIsLoadingCoverPlayLists] = useState(true);
  const [ isNextPagePlayLists, setIsNextPagePlayLists] = useState(false);
  const [coverPlayLists, setCoverPlayLists] = useState<CoverPlaylist[]>([]);
  const nextPageUrl = useRef(url);

  const getPlayLists = async() => {
    try {
      const { data } = await axiosRequest.get<CoverPlaylistsData>(nextPageUrl.current, params);
      let nextPage = false;
      if( data.data.length != 0 ){
          if( data.pagination.nextPage != null ){
            nextPageUrl.current = `${url}&page=${data.pagination.nextPage}`;
            nextPage = true;
          }
          
          const dataNew = renderDataId(data.data);
          setCoverPlayLists([...coverPlayLists, ...dataNew]);
      }

      setIsLoadingCoverPlayLists(false);
      setIsNextPagePlayLists(nextPage);
    } catch (error) {
      if ( axios.isAxiosError(error) ) {
        let data: any = [];
        data = error.response?.data;
      }       
    }
  }

  const getPlayList = async(id: string) => {
    try {
      const { data } = await axiosRequest.get<CoverPlaylist>(`playlists_app/${id}`);
      console.log('data PlayList', data)
      setCoverPlayLists([...coverPlayLists, data]);
      setIsLoadingCoverPlayLists(false);
    } catch (error) {
      if ( axios.isAxiosError(error) ) {
        let data: any = [];
        data = error.response?.data;
      }   
      console.log('sasa aqui')
      setIsLoadingCoverPlayLists(false);    
    }
  }

  const renderDataId = (data: CoverPlaylist[]) => {
    let posicion = (coverPlayLists.length - 1) + 1;
    for (let j = 0; j < data.length; j++) {
        data[j].position = `${posicion}`;
        
        posicion++;
    }
        
    return data;
  }

  useEffect(() => {
    if( isGet ) getPlayLists();
  }, [])
  

  return {
    isLoadingCoverPlayLists,
    coverPlayLists,
    getPlayLists,
    getPlayList,
    isNextPagePlayLists
  };
}